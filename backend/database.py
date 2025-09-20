def init_db():
    """初始化数据库"""
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    
    # 创建订单表（添加 user_id 和 updated_at 字段）
    c.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            out_trade_no TEXT UNIQUE,
            trade_no TEXT,
            total_amount REAL,
            trade_status TEXT DEFAULT 'WAIT_BUYER_PAY',
            user_id INTEGER DEFAULT 0,  -- 添加用户ID字段，默认为0表示未登录用户
            create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- 添加更新时间字段
        )
    ''')
    
    # 创建授权码表（移除对不存在的users表的外键引用）
    c.execute('''
        CREATE TABLE IF NOT EXISTS licenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER NOT NULL,
            license_key TEXT UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            expires_at TIMESTAMP,
            is_active BOOLEAN DEFAULT 1,
            user_id INTEGER DEFAULT 0,  -- 保留用户ID字段但不设置外键约束
            FOREIGN KEY (order_id) REFERENCES orders(id)
        )
    ''')
    
    # 添加索引以提高查询性能
    c.execute('CREATE INDEX IF NOT EXISTS idx_orders_out_trade_no ON orders(out_trade_no)')
    c.execute('CREATE INDEX IF NOT EXISTS idx_orders_trade_status ON orders(trade_status)')
    c.execute('CREATE INDEX IF NOT EXISTS idx_licenses_order_id ON licenses(order_id)')
    c.execute('CREATE INDEX IF NOT EXISTS idx_licenses_license_key ON licenses(license_key)')
    
    conn.commit()
    conn.close()