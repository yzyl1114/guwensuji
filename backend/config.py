import os
from datetime import timedelta

# 基础路径
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# 数据库配置
DATABASE = os.path.join(BASE_DIR, 'database.db')

# 支付宝配置 - ！！！请替换为你的实际信息！！！
ALIPAY_CONFIG = {
    "appid": "2021005193671597",  # 你的APPID
    "app_notify_url": "https://guwensuji.com/api/payment/callback",  # 默认回调地址 - 添加了引号
    "app_private_key_string": open(os.path.join(BASE_DIR, "keys/app_private_key.pem")).read(),
    "alipay_public_key_string": open(os.path.join(BASE_DIR, "keys/alipay_public_key.pem")).read(),
    "sign_type": "RSA2",
    "debug": False  # 沙箱模式 True, 生产环境 False
}

# 根据调试模式选择网关
ALIPAY_GATEWAY = "https://openapi.alipaydev.com/gateway.do" if ALIPAY_CONFIG["debug"] else "https://openapi.alipay.com/gateway.do"

# 支付成功后的前端跳转地址（支付成功页）
ALIPAY_RETURN_URL = "https://guwensuji.com/payment_success.html"