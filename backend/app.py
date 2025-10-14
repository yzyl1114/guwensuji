import sys
import os
# 添加当前目录到 Python 路径，确保可以导入本地模块
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

import sqlite3
from flask import Flask, request, jsonify, render_template, url_for, send_from_directory, redirect  # 添加redirect
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

# 导入配置
from config import ALIPAY_CONFIG, ALIPAY_GATEWAY, ALIPAY_RETURN_URL, current_config
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

# 应用配置
app.config.from_object(current_config)

# ============ 在这里添加防盗功能 ============
def require_domain(f):
    """域名检查装饰器"""
    from functools import wraps
    @wraps(f)
    def decorated_function(*args, **kwargs):
        allowed_domains = ['guwensuji.com', 'www.guwensuji.com', 'yzyl1114.github.io', 'guwensuji.com:8443', 'localhost', '127.0.0.1']
        host = request.host.split(':')[0]
        
        if host not in allowed_domains:
            print(f"非法域名访问: {host} from {request.remote_addr}")
            return redirect('https://guwensuji.com' + request.path, code=301)
        
        return f(*args, **kwargs)
    return decorated_function

# API频率限制存储
api_request_log = {}

@app.before_request
def security_middleware():
    """统一的安全中间件"""
    
    # 1. 域名检查
    allowed_domains = ['guwensuji.com', 'www.guwensuji.com', 'yzyl1114.github.io', 'guwensuji.com:8443', 'localhost', '127.0.0.1']
    host = request.host.split(':')[0]
    
    if host not in allowed_domains:
        print(f"非法域名访问: {host} from {request.remote_addr}")
        return redirect('https://guwensuji.com' + request.path, code=301)
    
    # 2. API保护（只对API路由生效）
    if request.path.startswith('/api/'):
        # 对于支付回调相关的API，放宽限制
        payment_paths = ['/api/payment/callback', '/api/payment/success']
        
        if request.path in payment_paths:
            # 支付宝回调可能没有Referer，允许通过
            print(f"支付回调请求: {request.path} from {request.remote_addr}")
            # 不进行Referer检查
            pass
        else:
            # 其他API请求保持原有保护
            referer = request.headers.get('Referer', '')
            api_allowed_domains = ['guwensuji.com', 'www.guwensuji.com']
            
            if referer and not any(domain in referer for domain in api_allowed_domains):
                print(f"API非法访问: {request.path} from {referer}")
                return jsonify({'success': False, 'message': 'Access denied'}), 403
        
        # 频率限制（对支付回调也适用，但可以放宽）
        client_ip = request.remote_addr
        current_time = time.time()
        
        # 清理过期的请求记录
        if client_ip in api_request_log:
            api_request_log[client_ip] = [
                req_time for req_time in api_request_log[client_ip] 
                if current_time - req_time < 60
            ]
        
        # 检查请求频率（支付回调可以放宽限制）
        request_times = api_request_log.get(client_ip, [])
        if len(request_times) >= 100:  # 支付回调频率限制放宽
            print(f"API频率限制: {client_ip} 在60秒内请求{len(request_times)}次")
            return jsonify({
                'success': False, 
                'message': '请求过于频繁，请稍后再试'
            }), 429
        
        # 记录本次请求
        if client_ip not in api_request_log:
            api_request_log[client_ip] = []
        api_request_log[client_ip].append(current_time)
        
        # User-Agent检查
        user_agent = request.headers.get('User-Agent', '')
        if not user_agent or len(user_agent) < 10:
            return jsonify({'success': False, 'message': 'Invalid request'}), 400

@app.route('/robots.txt')
def robots_txt():
    """阻止爬虫访问敏感目录"""
    return """User-agent: *
Disallow: /api/
Disallow: /admin/
Disallow: /private/
Disallow: /database/
Allow: /$
"""

@app.route('/security/check')
def security_check():
    """安全状态检查端点"""
    return jsonify({
        'status': 'secure',
        'domain': request.host,
        'timestamp': time.time(),
        'allowed': True
    })
# ============ 防盗功能结束 ============


# 手动设置静态文件路由
@app.route('/css/<path:filename>')
def css_files(filename):
    return send_from_directory(os.path.join(root_dir, 'css'), filename)

@app.route('/js/<path:filename>')
def js_files(filename):
    return send_from_directory(os.path.join(root_dir, 'js'), filename)

# ============ 在这里添加图片防盗链 ============
@app.route('/images/<path:filename>')
def images_files(filename):
    """图片资源路由，添加防盗链"""
    referer = request.headers.get('Referer', '')
    allowed_domains = [
        'guwensuji.com', 
        'www.guwensuji.com',
        'guwensuji.com:8443',
        'yzyl1114.github.io'
    ]
    
    # 检查Referer，如果不是来自允许的域名，返回错误图片
    if referer and not any(domain in referer for domain in allowed_domains):
        print(f"图片盗链尝试: {filename} from {referer}")
        # 返回一个错误图片或空白图片
        return send_from_directory(os.path.join(root_dir, 'images'), 'blocked.png')
    
    return send_from_directory(os.path.join(root_dir, 'images'), filename)
# ============ 图片防盗链结束 ============

# 初始化数据库
init_db()

# 初始化支付宝SDK
def create_alipay_client():
    """创建支付宝客户端"""
    try:
        return AliPay(
            appid=ALIPAY_CONFIG['appid'],
            app_notify_url=ALIPAY_CONFIG['app_notify_url'],
            app_private_key_string=ALIPAY_CONFIG['app_private_key_string'],
            alipay_public_key_string=ALIPAY_CONFIG['alipay_public_key_string'],
            sign_type=ALIPAY_CONFIG['sign_type'],
            debug=ALIPAY_CONFIG['debug'],
            config=AliPayConfig(timeout=15)  # 超时时间
        )
    except Exception as e:
        print(f"初始化支付宝客户端失败: {str(e)}")
        # 返回一个None或者基本的客户端，根据实际情况处理
        return None

alipay = create_alipay_client()

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

@app.route('/api/payment/success')
def api_payment_success():
    # 从URL参数中获取支付宝返回的数据
    out_trade_no = request.args.get('out_trade_no')
    trade_no = request.args.get('trade_no')
    total_amount = request.args.get('total_amount')
    payment_from = request.args.get('from', 'nav')  # 获取支付来源
    
    print(f"支付成功回调参数: out_trade_no={out_trade_no}, trade_no={trade_no}, total_amount={total_amount}, from={payment_from}")
    
    # 检查签名确保回调的合法性（可选但推荐）
    # 这里可以添加签名验证逻辑
    
    license_key = None
    expires_at = None
    
    # 更新数据库订单状态为支付成功并获取授权码
    if out_trade_no:
        try:
            conn = get_db_connection()
            conn.row_factory = sqlite3.Row
            
            # 更新订单状态
            conn.execute(
                'UPDATE orders SET trade_status = ?, trade_no = ? WHERE out_trade_no = ?',
                ('TRADE_SUCCESS', trade_no, out_trade_no)
            )
            
            # 获取订单ID
            order = conn.execute(
                'SELECT id FROM orders WHERE out_trade_no = ?', (out_trade_no,)
            ).fetchone()
            
            if order:
                # 检查或生成授权码
                license_data = conn.execute(
                    'SELECT * FROM licenses WHERE order_id = ?', (order['id'],)
                ).fetchone()
                
                if license_data:
                    license_key = license_data['license_key']
                    expires_at = license_data['expires_at']
                else:
                    # 生成新的授权码
                    import random
                    import string
                    from datetime import datetime, timedelta
                    
                    chars = string.ascii_uppercase + string.digits
                    license_key = '-'.join(
                        [''.join(random.choice(chars) for _ in range(4)) for _ in range(3)]
                    )
                    
                    # 设置过期时间（一年后）
                    expires_at = (datetime.now() + timedelta(days=365)).strftime('%Y-%m-%d %H:%M:%S')
                    
                    # 保存授权码
                    conn.execute(
                        'INSERT INTO licenses (license_key, order_id, expires_at) VALUES (?, ?, ?)',
                        (license_key, order['id'], expires_at)
                    )
                
                conn.commit()
                print(f"订单 {out_trade_no} 处理完成，授权码: {license_key}")
            else:
                print(f"订单不存在: {out_trade_no}")
            
            conn.close()
            
        except Exception as e:
            print(f"处理支付成功回调失败: {str(e)}")
            import traceback
            traceback.print_exc()
    
    # 将参数传递给模板，以便显示
    return render_template('payment_success.html', 
                           out_trade_no=out_trade_no,
                           trade_no=trade_no,
                           total_amount=total_amount,
                           license_key=license_key,
                           expires_at=expires_at,
                           payment_from=payment_from)

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
            print(f"license_data 类型: {type(license_data)}")
            print(f"license_data 内容: {dict(license_data)}")
            print(f"expires_at 值: {license_data['expires_at']}")
            
            # 如果已有授权码，直接返回
            print(f"找到现有授权码: {license_data['license_key']}")
            conn.close()
            
            # 修复这里：直接访问属性而不是使用 .get() 方法
            expires_at = license_data['expires_at'] if license_data['expires_at'] else ''
            
            return jsonify({
                'success': True, 
                'license_key': license_data['license_key'],
                'expires_at': expires_at
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
    """验证授权码有效性"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'success': False, 'message': '无效的请求数据'})
        
        license_key = data.get('license_key')
        
        print(f"验证授权码请求: license_key={license_key}")
        
        if not license_key:
            return jsonify({'success': False, 'message': '请输入授权码'})
        
        conn = get_db_connection()
        conn.row_factory = sqlite3.Row
        
        # 查询授权码
        license_data = conn.execute(
            'SELECT * FROM licenses WHERE license_key = ? AND is_active = 1',
            (license_key,)
        ).fetchone()
        
        conn.close()
        
        if not license_data:
            return jsonify({'success': False, 'message': '授权码无效或已禁用'})
        
        print(f"授权码验证成功: {license_key}")
        return jsonify({'success': True, 'message': '授权码验证成功'})
        
    except Exception as e:
        print(f"验证授权码时发生错误: {str(e)}")
        return jsonify({'success': False, 'message': '系统错误，请稍后重试'})
    
    conn.commit()
    conn.close()
    
    return jsonify({'success': True})

@app.route('/api/create_order', methods=['POST'])
def create_order():
    """创建支付宝订单"""
    try:
        print("收到创建订单请求")
        
        # 检查支付宝客户端是否初始化成功
        if alipay is None:
            return jsonify({'success': False, 'message': '支付系统初始化失败，请联系管理员'})
        
        # 获取请求数据
        request_data = request.get_json()
        payment_from = request_data.get('from', 'test')  # 默认为test（测试页）
        article_id = request_data.get('article_id', '1')  # 保留原有的article_id
        
        print(f"支付来源: {payment_from}, 文章ID: {article_id}")
        
        # 生成商户订单号，确保唯一性
        out_trade_no = f"ORDER{datetime.now().strftime('%Y%m%d%H%M%S')}{uuid.uuid4().hex[:6]}"
        print(f"生成的订单号: {out_trade_no}")

        # 获取用户代理信息，判断设备类型
        user_agent = request.headers.get('User-Agent', '').lower()
        is_mobile = any(device in user_agent for device in ['mobile', 'android', 'iphone'])
        
        # 构建支付成功返回URL，添加来源参数
        return_url_with_params = f"{ALIPAY_RETURN_URL}?from={payment_from}"
        if payment_from == 'test':
            # 如果是测试页支付，还要传递文章ID
            return_url_with_params += f"&article_id={article_id}"
        
        print(f"支付成功返回URL: {return_url_with_params}")
        
        # 根据设备类型优化支付参数
        if is_mobile:
            # 手机网站支付 - 优化移动端体验
            order_string = alipay.api_alipay_trade_wap_pay(
                out_trade_no=out_trade_no,
                total_amount="1.00",
                subject="古文速记 - 永久会员", 
                return_url=return_url_with_params,  # 使用带参数的返回URL
                notify_url=ALIPAY_CONFIG['app_notify_url'],
                quit_url=return_url_with_params,  # 用户中途退出返回地址，同样带参数
                product_code="QUICK_WAP_WAY"  # 手机网站支付产品码
            )
            print("使用手机网站支付接口")
        else:
            # PC网站支付
            order_string = alipay.api_alipay_trade_page_pay(
                out_trade_no=out_trade_no,
                total_amount="1.00",
                subject="古文速记 - 永久会员",
                return_url=return_url_with_params,  # 使用带参数的返回URL
                notify_url=ALIPAY_CONFIG['app_notify_url']
            )
            print("使用PC网站支付接口")
        
        print(f"生成的订单字符串: {order_string}")

        # 将订单信息存入数据库（包括支付来源）
        conn = get_db_connection()
        conn.execute(
            'INSERT INTO orders (out_trade_no, total_amount, trade_status, device_type, payment_from, article_id) VALUES (?, ?, ?, ?, ?, ?)',
            (out_trade_no, "1.00", "WAIT_BUYER_PAY", "mobile" if is_mobile else "pc", payment_from, article_id)
        )
        conn.commit()
        conn.close()
        
        # 返回支付页面的URL
        pay_url = ALIPAY_GATEWAY + "?" + order_string
        print(f"完整的支付URL: {pay_url}")
        
        return jsonify({
            'success': True, 
            'pay_url': pay_url,
            'is_mobile': is_mobile,  # 返回设备类型给前端
            'payment_from': payment_from  # 返回支付来源给前端（可选）
        })
        
    except Exception as e:
        print(f"创建订单异常: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'success': False, 'message': str(e)})

@app.route('/api/payment/callback', methods=['POST'])
def api_payment_callback():
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

@app.route('/health')
def health_check():
    """健康检查端点"""
    return jsonify({'status': 'healthy', 'environment': current_config.ENV})

@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('500.html'), 500

if __name__ == '__main__':
    # 直接使用环境变量判断
    env = os.environ.get('FLASK_ENV', 'development')
    
    if env == 'production':
        # 生产环境使用更安全的配置
        app.run(debug=False, host='0.0.0.0', port=5000)
    else:
        # 开发环境
        app.run(debug=True, host='0.0.0.0', port=5001)