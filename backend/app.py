from flask import Flask, request, jsonify, render_template
from database import init_db, get_db_connection
import json
import time
import hashlib
from Crypto.PublicKey import RSA
from Crypto.Signature import PKCS1_v1_5
from Crypto.Hash import SHA256
from base64 import b64encode, b64decode
import config

app = Flask(__name__, template_folder='../frontend', static_folder='../frontend')

# 初始化数据库
init_db()

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

# 支付宝支付相关接口（简化版）
@app.route('/api/create_order', methods=['POST'])
def create_order():
    """创建支付宝订单"""
    # 这里需要实现支付宝订单创建逻辑
    # 由于支付宝集成较为复杂，这里先返回模拟数据
    return jsonify({
        'success': True,
        'out_trade_no': f'ORDER{int(time.time())}',
        'qr_code': 'https://example.com/qrcode'  # 模拟二维码地址
    })

@app.route('/payment/callback', methods=['POST'])
def payment_callback():
    """支付宝支付回调接口"""
    # 这里需要验证支付宝回调签名并更新订单状态
    # 简化版：直接返回成功
    return 'success'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)