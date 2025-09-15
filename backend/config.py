import os

# 基础路径
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# 数据库配置
DATABASE = os.path.join(BASE_DIR, 'database.db')

# 支付宝沙箱配置（测试环境）
ALIPAY_APP_ID = '你的沙箱APP_ID'  # 需要到支付宝开放平台申请
ALIPAY_PRIVATE_KEY = '你的应用私钥'
ALIPAY_PUBLIC_KEY = '支付宝公钥'
ALIPAY_GATEWAY = 'https://openapi.alipaydev.com/gateway.do'  # 沙箱环境网关
ALIPAY_NOTIFY_URL = 'http://你的域名或IP:5000/payment/callback'  # 支付回调地址
ALIPAY_RETURN_URL = 'http://你的域名或IP:5000/payment/success'   # 支付成功跳转地址