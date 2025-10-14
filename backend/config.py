import os
from datetime import timedelta

# 基础路径
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# 环境配置：通过环境变量控制，默认开发环境
ENV = os.environ.get('FLASK_ENV', 'development')

# 数据库配置
DATABASE = os.path.join(BASE_DIR, 'database.db')

# 支付宝配置 - 支持环境切换
class Config:
    """基础配置类"""
    # 数据库配置
    DATABASE_URI = os.environ.get('DATABASE_URL', f'sqlite:///{DATABASE}')
    
    # 应用配置
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
    DEBUG = False
    TESTING = False

class DevelopmentConfig(Config):
    """开发环境配置"""
    DEBUG = True
    TESTING = False
    
    # 支付宝开发环境配置
    ALIPAY_APPID = os.environ.get('ALIPAY_APPID', '9021000154626455')
    ALIPAY_DEBUG = True
    ALIPAY_GATEWAY = "https://openapi-sandbox.dl.alipaydev.com/gateway.do"
    
    # 开发环境域名（ngrok或本地）
    DOMAIN = os.environ.get('DOMAIN', 'https://60e55ad2ef46.ngrok-free.app')
    
    # 支付宝回调地址
    ALIPAY_NOTIFY_URL = f"{DOMAIN}/payment/callback"
    ALIPAY_RETURN_URL = f"{DOMAIN}/payment/success"
    
    # 密钥文件路径
    ALIPAY_PRIVATE_KEY_PATH = os.path.join(BASE_DIR, "keys/app_private_key.pem")
    ALIPAY_PUBLIC_KEY_PATH = os.path.join(BASE_DIR, "keys/alipay_public_key.pem")

class ProductionConfig(Config):
    """生产环境配置"""
    DEBUG = False
    TESTING = False
    
    # 支付宝生产环境配置（从环境变量读取）
    ALIPAY_APPID = os.environ.get('ALIPAY_APPID', '2021005193671597')  # 生产环境APPID
    ALIPAY_DEBUG = False
    ALIPAY_GATEWAY = "https://openapi.alipay.com/gateway.do"
    
    # 允许通过IP访问（测试期间）
    DOMAIN = os.environ.get('DOMAIN', 'http://39.106.40.60:5000')  # 临时使用IP

    # 生产环境域名（您的正式域名）
    DOMAIN = os.environ.get('DOMAIN', 'https://guwensuji.com')
    
    # 支付宝回调地址
    ALIPAY_NOTIFY_URL = f"{DOMAIN}/api/payment/callback"
    ALIPAY_RETURN_URL = f"{DOMAIN}/api/payment/success"
    
    # 生产环境密钥（从环境变量读取或文件）
    ALIPAY_PRIVATE_KEY_PATH = os.environ.get('ALIPAY_PRIVATE_KEY_PATH', 
                                           os.path.join(BASE_DIR, "keys/prod_private_key.pem"))
    ALIPAY_PUBLIC_KEY_PATH = os.environ.get('ALIPAY_PUBLIC_KEY_PATH',
                                          os.path.join(BASE_DIR, "keys/prod_public_key.pem"))

# 根据环境选择配置
if ENV == 'production':
    config = ProductionConfig()
else:
    config = DevelopmentConfig()

# 读取支付宝密钥文件
def read_key_file(file_path):
    """安全读取密钥文件"""
    try:
        if os.path.exists(file_path):
            with open(file_path, 'r') as f:
                return f.read()
        else:
            # 如果文件不存在，尝试从环境变量读取
            env_var_name = os.path.basename(file_path).replace('.pem', '').upper() + '_KEY'
            return os.environ.get(env_var_name, '')
    except Exception as e:
        print(f"读取密钥文件失败 {file_path}: {str(e)}")
        return ''

# 支付宝配置字典（保持与原有代码兼容）
ALIPAY_CONFIG = {
    "appid": config.ALIPAY_APPID,
    "app_notify_url": config.ALIPAY_NOTIFY_URL,
    "app_private_key_string": read_key_file(config.ALIPAY_PRIVATE_KEY_PATH),
    "alipay_public_key_string": read_key_file(config.ALIPAY_PUBLIC_KEY_PATH),
    "sign_type": "RSA2",
    "debug": config.ALIPAY_DEBUG
}

# 保持原有变量名兼容
ALIPAY_GATEWAY = config.ALIPAY_GATEWAY
ALIPAY_RETURN_URL = config.ALIPAY_RETURN_URL

# 导出当前配置
current_config = config