#!/bin/bash
echo "启动古文速记后端服务..."

cd /data/wwwroot/guwensuji/backend

# 停止现有服务
echo "停止现有服务..."
pkill -f "python.*app.py"
sleep 2

# 设置生产环境
export FLASK_ENV=production

# 启动服务
echo "启动服务..."
nohup python app.py > flask.log 2>&1 &
echo "服务启动中..."

# 等待启动完成
sleep 5

# 验证启动状态
if netstat -tlnp | grep -q ":5000"; then
    echo "✅ 后端服务启动成功，监听端口:5000"
    
    # 测试健康检查
    if curl -s http://127.0.0.1:5000/health > /dev/null; then
        echo "✅ 健康检查通过"
        echo "✅ 可以开始测试支付功能了！"
    else
        echo "❌ 健康检查失败，请查看日志"
        tail -20 flask.log
    fi
else
    echo "❌ 服务启动失败"
    echo "查看详细日志:"
    tail -30 flask.log
fi

echo "日志文件: /data/wwwroot/guwensuji/backend/flask.log"