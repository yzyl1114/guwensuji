import os
from flask import Flask, request, jsonify, render_template, url_for, send_from_directory
from database import init_db, get_db_connection
import json
import time
import hashlib
import uuid
from datetime import datetime
from Crypto.PublicKey import RSA
from Crypto.Signature import PKCS1_v1_5
from Crypto.Hash import SHA256
from base64 import b64encode, b64decode
from config import ALIPAY_CONFIG, ALIPAY_GATEWAY, ALIPAY_RETURN_URL
from alipay import AliPay
from alipay.utils import AliPayConfig

# 获取当前文件的绝对路径
current_dir = os.path.dirname(os.path.abspath(__file__))
# 获取项目根目录的绝对路径（backend 的父目录）
root_dir = os.path.dirname(current_dir)

app = Flask(__name__, 
           template_folder=root_dir,    # 模板文件夹指向根目录
           static_folder=root_dir,      # 静态文件夹也指向根目录
           static_url_path='')          # 设置静态文件的URL路径为空

# 手动设置静态文件路由
@app.route('/css/<path:filename>')
def css_files(filename):
    return send_from_directory(os.path.join(root_dir, 'css'), filename)

@app.route('/js/<path:filename>')
def js_files(filename):
    return send_from_directory(os.path.join(root_dir, 'js'), filename)

@app.route('/images/<path:filename>')
def images_files(filename):
    return send_from_directory(os.path.join(root_dir, 'images'), filename)

# 初始化数据库
init_db()

# 初始化支付宝SDK
alipay = AliPay(
    appid=ALIPAY_CONFIG['appid'],
    app_notify_url=ALIPAY_CONFIG['app_notify_url'],
    app_private_key_string=ALIPAY_CONFIG['app_private_key_string'],
    alipay_public_key_string=ALIPAY_CONFIG['alipay_public_key_string'],
    sign_type=ALIPAY_CONFIG['sign_type'],
    debug=ALIPAY_CONFIG['debug'],
    config=AliPayConfig(timeout=15)  # 超时时间
)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/article')
def article():
    article_id = request.args.get('id', '1')
    return render_template('article.html', article_id=article_id)

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route('/payment/success')
def payment_success():
    # 从URL参数中获取支付宝返回的数据
    out_trade_no = request.args.get('out_trade_no')
    trade_no = request.args.get('trade_no')
    total_amount = request.args.get('total_amount')
    
    print(f"支付成功回调参数: out_trade_no={out_trade_no}, trade_no={trade_no}, total_amount={total_amount}")
    
    # 检查签名确保回调的合法性（可选但推荐）
    # 这里可以添加签名验证逻辑
    
    # 更新数据库订单状态为支付成功
    if out_trade_no:
        try:
            conn = get_db_connection()
            conn.execute(
                'UPDATE orders SET trade_status = ?, trade_no = ? WHERE out_trade_no = ?',
                ('TRADE_SUCCESS', trade_no, out_trade_no)
            )
            conn.commit()
            conn.close()
            print(f"订单 {out_trade_no} 状态已更新为成功")
        except Exception as e:
            print(f"更新订单状态失败: {str(e)}")
    
    # 将参数传递给模板，以便显示
    return render_template('payment_success.html', 
                           out_trade_no=out_trade_no,
                           trade_no=trade_no,
                           total_amount=total_amount)

@app.route('/api/generate_license', methods=['POST'])
def generate_license():
    """生成授权码"""
    import random
    import string
    
    # 生成7位随机授权码（数字+大小写字母）
    chars = string.digits + string.ascii_letters
    license_key = ''.join(random.choice(chars) for _ in range(7))
    
    # 保存到数据库
    conn = get_db_connection()
    conn.execute('INSERT OR IGNORE INTO licenses (license_key) VALUES (?)', (license_key,))
    conn.commit()
    conn.close()
    
    return jsonify({'license_key': license_key})

@app.route('/api/get_license')
def get_license():
    """根据订单号获取授权码"""
    out_trade_no = request.args.get('out_trade_no')
    
    print(f"获取授权码请求，订单号: {out_trade_no}")

    if not out_trade_no:
        return jsonify({'success': False, 'message': '缺少订单号参数'}), 400
    
    try:
        conn = get_db_connection()
        conn.row_factory = sqlite3.Row
        
        # 检查订单是否存在且已支付
        order = conn.execute(
            'SELECT * FROM orders WHERE out_trade_no = ? AND trade_status = ?',
            (out_trade_no, 'TRADE_SUCCESS')
        ).fetchone()
        
        if not order:
            print(f"错误: 订单不存在或未支付 - {out_trade_no}")
            conn.close()
            return jsonify({'success': False, 'message': '订单不存在或未支付'}), 404
        
        print(f"找到订单: {order['id']}")

        # 检查是否已有授权码
        license_data = conn.execute(
            'SELECT * FROM licenses WHERE order_id = ?',
            (order['id'],)
        ).fetchone()
        
        if license_data:
            # 如果已有授权码，直接返回
            print(f"找到现有授权码: {license_data['license_key']}")
            conn.close()
            return jsonify({
                'success': True, 
                'license_key': license_data['license_key'],
                'expires_at': license_data.get('expires_at', '')
            })
        
        # 生成新的授权码
        import random
        import string
        from datetime import datetime, timedelta
        
        chars = string.ascii_uppercase + string.digits
        license_key = '-'.join(
            [''.join(random.choice(chars) for _ in range(4)) for _ in range(3)]
        )
        
        # 设置过期时间（例如一年后）
        expires_at = (datetime.now() + timedelta(days=365)).strftime('%Y-%m-%d %H:%M:%S')
        
        print(f"生成新授权码: {license_key}, 过期时间: {expires_at}")

        # 保存授权码到数据库，关联订单
        conn.execute(
            'INSERT INTO licenses (license_key, order_id, expires_at) VALUES (?, ?, ?)',
            (license_key, order['id'], expires_at)
        )
        
        conn.commit()
        conn.close()
        
        return jsonify({
            'success': True, 
            'license_key': license_key,
            'expires_at': expires_at
        })
    
    except sqlite3.OperationalError as e:
        print(f"数据库操作错误: {str(e)}")
        if "no such column: order_id" in str(e):
            # 如果order_id列不存在，需要更新数据库结构
            return jsonify({
                'success': False, 
                'message': '系统维护中，请稍后再试',
                'error_code': 'DB_SCHEMA_ERROR'
            }), 500
        else:
            return jsonify({
                'success': False, 
                'message': '数据库错误',
                'error_code': 'DB_ERROR'
            }), 500
    
    except Exception as e:
        print(f"获取授权码时发生未知错误: {str(e)}")
        return jsonify({
            'success': False, 
            'message': '系统错误，请稍后再试',
            'error_code': 'UNKNOWN_ERROR'
        }), 500

@app.route('/api/verify_license', methods=['POST'])
def verify_license():
    """验证授权码"""
    data = request.json
    license_key = data.get('license_key')
    device_fp = data.get('device_fp')
    
    if not license_key or not device_fp:
        return jsonify({'success': False, 'message': '参数错误'})
    
    conn = get_db_connection()
    license_data = conn.execute(
        'SELECT * FROM licenses WHERE license_key = ?', (license_key,)
    ).fetchone()
    
    if not license_data:
        return jsonify({'success': False, 'message': '授权码无效'})
    
    # 检查设备是否已绑定
    devices = [license_data['device_fp_1'], license_data['device_fp_2']]
    if device_fp in devices:
        return jsonify({'success': True})
    
    # 设备未绑定，检查是否有空位
    if not license_data['device_fp_1']:
        conn.execute(
            'UPDATE licenses SET device_fp_1 = ? WHERE license_key = ?',
            (device_fp, license_key)
        )
    elif not license_data['device_fp_2']:
        conn.execute(
            'UPDATE licenses SET device_fp_2 = ? WHERE license_key = ?',
            (device_fp, license_key)
        )
    else:
        # 两个设备位都已满，覆盖较早的设备
        conn.execute(
            'UPDATE licenses SET device_fp_1 = ?, bound_time = CURRENT_TIMESTAMP WHERE license_key = ?',
            (device_fp, license_key)
        )
    
    conn.commit()
    conn.close()
    
    return jsonify({'success': True})

@app.route('/api/create_order', methods=['POST'])
def create_order():
    """创建支付宝订单"""
    try:
        print("收到创建订单请求")
        
        # 生成商户订单号，确保唯一性
        out_trade_no = f"ORDER{datetime.now().strftime('%Y%m%d%H%M%S')}{uuid.uuid4().hex[:6]}"
        print(f"生成的订单号: {out_trade_no}")

        # 创建支付订单
        order_string = alipay.api_alipay_trade_wap_pay(
            out_trade_no=out_trade_no,          # 商户订单号
            total_amount="1.00",                # 支付金额（单位：元）
            subject="古文速记 - 永久会员",       # 订单标题
            return_url=ALIPAY_RETURN_URL,       # 前端跳转地址
            notify_url=ALIPAY_CONFIG['app_notify_url']  # 异步通知地址
        )
        
        print(f"生成的订单字符串: {order_string}")

        # 将订单信息存入数据库
        conn = get_db_connection()
        conn.execute(
            'INSERT INTO orders (out_trade_no, total_amount, trade_status) VALUES (?, ?, ?)',
            (out_trade_no, "1.00", "WAIT_BUYER_PAY")
        )
        conn.commit()
        conn.close()
        
        # 返回支付页面的URL
        pay_url = ALIPAY_GATEWAY + "?" + order_string
        print(f"完整的支付URL: {pay_url}")
        
        return jsonify({'success': True, 'pay_url': pay_url})
        
    except Exception as e:
        print(f"创建订单异常: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'success': False, 'message': str(e)})

@app.route('/payment/callback', methods=['POST'])
def payment_callback():
    """支付宝异步通知回调（重要！）"""
    try:
        # 记录回调请求
        print(f"支付回调参数: {dict(request.form)}")
        
        # 验证签名
        data = request.form.to_dict()
        signature = data.pop("sign", None)
        success = alipay.verify(data, signature)
        
        if not success:
            print("支付回调签名验证失败")
            return 'failure', 400  # 签名验证失败
            
        # 处理业务逻辑
        out_trade_no = data.get('out_trade_no')
        trade_status = data.get('trade_status')
        trade_no = data.get('trade_no')
        
        if trade_status != 'TRADE_SUCCESS':
            print(f"交易未成功，状态: {trade_status}")
            return 'success'  # 非成功状态也返回success，避免支付宝重复通知
        
        # 获取数据库连接
        conn = get_db_connection()
        conn.row_factory = sqlite3.Row
        
        try:
            # 检查订单是否已处理过
            existing_order = conn.execute(
                'SELECT id, trade_status FROM orders WHERE out_trade_no = ?',
                (out_trade_no,)
            ).fetchone()
            
            if not existing_order:
                print(f"订单不存在: {out_trade_no}")
                conn.close()
                return 'success'  # 订单不存在也返回success
            
            # 如果订单已经成功处理，直接返回成功
            if existing_order['trade_status'] == 'TRADE_SUCCESS':
                print(f"订单已处理过: {out_trade_no}")
                conn.close()
                return 'success'
            
            # 更新订单状态
            conn.execute(
                'UPDATE orders SET trade_status = ?, trade_no = ? WHERE out_trade_no = ?',
                ('TRADE_SUCCESS', trade_no, out_trade_no)
            )
            
            print(f"订单 {out_trade_no} 状态已更新为成功")
            
            # 检查是否已存在授权码
            existing_license = conn.execute(
                'SELECT id FROM licenses WHERE order_id = ?',
                (existing_order['id'],)
            ).fetchone()
            
            if existing_license:
                print(f"订单已有授权码，跳过生成: {out_trade_no}")
                conn.commit()
                conn.close()
                return 'success'
            
            # 生成授权码并关联到订单
            import random
            import string
            from datetime import datetime, timedelta
            
            # 生成更规范的授权码格式
            chars = string.ascii_uppercase + string.digits
            license_key = '-'.join(
                [''.join(random.choice(chars) for _ in range(4)) for _ in range(3)]
            )
            
            # 设置过期时间（一年后）
            expires_at = (datetime.now() + timedelta(days=365)).strftime('%Y-%m-%d %H:%M:%S')
            
            # 保存授权码到数据库，并关联订单ID
            conn.execute(
                'INSERT INTO licenses (license_key, order_id, expires_at) VALUES (?, ?, ?)',
                (license_key, existing_order['id'], expires_at)
            )
            
            print(f"为订单 {out_trade_no} 生成新授权码: {license_key}")
            
            conn.commit()
            conn.close()
            
            # 这里可以添加更多业务逻辑，如发送邮件、短信通知等
            print(f"支付回调处理完成: {out_trade_no}")
            
            return 'success'  # 必须返回success，否则支付宝会重复通知
            
        except sqlite3.Error as e:
            conn.rollback()
            conn.close()
            print(f"数据库操作失败: {str(e)}")
            # 即使数据库操作失败，也返回success，避免支付宝重复通知
            return 'success'
            
    except Exception as e:
        print(f"处理支付回调异常: {str(e)}")
        # 即使出现异常，也返回success，避免支付宝重复通知
        return 'success'

# 添加一个查询订单状态的接口（可选，用于前端轮询）
@app.route('/api/check_order/<out_trade_no>', methods=['GET'])
def check_order(out_trade_no):
    """查询订单状态"""
    conn = get_db_connection()
    order = conn.execute(
        'SELECT * FROM orders WHERE out_trade_no = ?', (out_trade_no,)
    ).fetchone()
    conn.close()
    
    if order:
        return jsonify({
            'success': True,
            'out_trade_no': order['out_trade_no'],
            'trade_status': order['trade_status'],
            'create_time': order['create_time']
        })
    else:
        return jsonify({'success': False, 'message': '订单不存在'})

@app.route('/api/gateway', methods=['POST'])
def app_gateway():
    # 处理支付宝开放平台的各种通知
    # 现阶段可以简单返回success
    return 'success'

@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('500.html'), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)