from flask import Flask, request, jsonify, render_template, url_for
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

app = Flask(__name__, template_folder='../frontend', static_folder='../frontend')

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
    return render_template('article.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route('/payment/success')
def payment_success():
    return render_template('payment_success.html')

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
        # 生成商户订单号，确保唯一性
        out_trade_no = f"ORDER{datetime.now().strftime('%Y%m%d%H%M%S')}{uuid.uuid4().hex[:6]}"
        
        # 创建支付订单
        order_string = alipay.api_alipay_trade_wap_pay(
            out_trade_no=out_trade_no,          # 商户订单号
            total_amount="1.00",                # 支付金额（单位：元）
            subject="古文速记 - 永久会员",       # 订单标题
            return_url=ALIPAY_RETURN_URL,       # 前端跳转地址
            notify_url=url_for('payment_callback', _external=True)  # 异步通知地址
        )
        
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
        return jsonify({'success': True, 'pay_url': pay_url})
        
    except Exception as e:
        print(f"创建订单失败: {str(e)}")
        return jsonify({'success': False, 'message': '创建订单失败'})

@app.route('/payment/callback', methods=['POST'])
def payment_callback():
    """支付宝异步通知回调（重要！）"""
    try:
        # 验证签名
        data = request.form.to_dict()
        signature = data.pop("sign", None)
        success = alipay.verify(data, signature)
        
        if not success:
            return 'failure', 400  # 签名验证失败
            
        # 处理业务逻辑
        out_trade_no = data.get('out_trade_no')
        trade_status = data.get('trade_status')
        
        if trade_status == 'TRADE_SUCCESS':
            # 更新订单状态
            conn = get_db_connection()
            conn.execute(
                'UPDATE orders SET trade_status = ?, trade_no = ? WHERE out_trade_no = ?',
                ('TRADE_SUCCESS', data.get('trade_no'), out_trade_no)
            )
            
            # 生成授权码并关联到订单
            import random
            import string
            chars = string.digits + string.ascii_letters
            license_key = ''.join(random.choice(chars) for _ in range(7))
            
            # 保存授权码到数据库
            conn.execute('INSERT OR IGNORE INTO licenses (license_key) VALUES (?)', (license_key,))
            
            # 可以将授权码与订单关联（如果需要）
            # conn.execute('UPDATE orders SET license_key = ? WHERE out_trade_no = ?', (license_key, out_trade_no))
            
            conn.commit()
            conn.close()
            
            # 这里可以添加更多业务逻辑，如发送邮件、短信通知等
            
        return 'success'  # 必须返回success，否则支付宝会重复通知
        
    except Exception as e:
        print(f"处理支付回调失败: {str(e)}")
        return 'failure', 500

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

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)