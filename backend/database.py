def init_db():
    """初始化数据库"""
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    
    # 创建订单表（确保包含所有必要字段）
    c.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            out_trade_no TEXT UNIQUE NOT NULL,
            trade_no TEXT,
            total_amount REAL,
            trade_status TEXT DEFAULT 'WAIT_BUYER_PAY',
            user_id INTEGER DEFAULT 0,
            create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # 创建授权码表（确保order_id字段存在）
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
    
    # 创建设备绑定表（为权限恢复功能做准备）
    c.execute('''
        CREATE TABLE IF NOT EXISTS device_bindings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            license_id INTEGER NOT NULL,
            device_fingerprint TEXT NOT NULL,
            bind_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (license_id) REFERENCES licenses(id)
        )
    ''')
    
    # 添加索引
    c.execute('CREATE INDEX IF NOT EXISTS idx_orders_out_trade_no ON orders(out_trade_no)')
    c.execute('CREATE INDEX IF NOT EXISTS idx_licenses_order_id ON licenses(order_id)')
    c.execute('CREATE INDEX IF NOT EXISTS idx_licenses_key ON licenses(license_key)')
    c.execute('CREATE INDEX IF NOT EXISTS idx_bindings_license ON device_bindings(license_id)')
    
    conn.commit()
    conn.close()