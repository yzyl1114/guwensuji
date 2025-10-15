import sqlite3
import os
from config import DATABASE
    
def init_db():
    """初始化数据库（加强版）"""
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    
    # 创建订单表（添加验证字段）
    c.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            out_trade_no TEXT UNIQUE NOT NULL,
            trade_no TEXT,
            total_amount REAL,
            trade_status TEXT DEFAULT 'WAIT_BUYER_PAY',
            user_id INTEGER DEFAULT 0,
            create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            payment_from TEXT DEFAULT 'test',
            article_id TEXT DEFAULT '1',
            device_type TEXT,
            callback_received BOOLEAN DEFAULT 0,  -- 新增：是否收到回调
            verified BOOLEAN DEFAULT 0,           -- 新增：是否已验证
            verification_count INTEGER DEFAULT 0  -- 新增：验证次数
        )
    ''')
    
    # 创建授权码表
    c.execute('''
        CREATE TABLE IF NOT EXISTS licenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER NOT NULL,
            license_key TEXT UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            expires_at TIMESTAMP,
            is_active BOOLEAN DEFAULT 1,
            user_id INTEGER DEFAULT 0,
            FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
        )
    ''')
    
    # 创建支付验证日志表（新增）
    c.execute('''
        CREATE TABLE IF NOT EXISTS payment_verification_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER NOT NULL,
            verification_type TEXT NOT NULL,  -- 'alipay_callback', 'success_page', 'manual_check'
            success BOOLEAN NOT NULL,
            ip_address TEXT,
            details TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (order_id) REFERENCES orders(id)
        )
    ''')
    
    # 添加索引
    c.execute('CREATE INDEX IF NOT EXISTS idx_orders_out_trade_no ON orders(out_trade_no)')
    c.execute('CREATE INDEX IF NOT EXISTS idx_orders_trade_status ON orders(trade_status)')
    c.execute('CREATE INDEX IF NOT EXISTS idx_licenses_order_id ON licenses(order_id)')
    c.execute('CREATE INDEX IF NOT EXISTS idx_verification_log_order_id ON payment_verification_log(order_id)')
    
    conn.commit()
    conn.close()

def get_db_connection():
    """获取数据库连接"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row  # 使返回结果像字典一样可访问
    return conn