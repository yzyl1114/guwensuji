import sqlite3
import os
from config import DATABASE

def init_db():
    """初始化数据库"""
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    
    # 创建订单表 - 添加 payment_from 和 article_id 字段
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
            payment_from TEXT DEFAULT 'test',  -- 新增：支付来源 (test/nav)
            article_id TEXT DEFAULT '1',       -- 新增：文章ID
            device_type TEXT                   -- 新增：设备类型 (pc/mobile)
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
            FOREIGN KEY (order_id) REFERENCES orders(id)
        )
    ''')
    
    # 添加索引（只保留必要的索引）
    c.execute('CREATE INDEX IF NOT EXISTS idx_orders_out_trade_no ON orders(out_trade_no)')
    c.execute('CREATE INDEX IF NOT EXISTS idx_licenses_order_id ON licenses(order_id)')
    c.execute('CREATE INDEX IF NOT EXISTS idx_licenses_key ON licenses(license_key)')
    
    conn.commit()
    conn.close()

def get_db_connection():
    """获取数据库连接"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row  # 使返回结果像字典一样可访问
    return conn