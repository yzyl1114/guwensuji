localStorage.setItem('isPaidUser', 'true');
/*
// 设备指纹生成（简易版）
function generateFingerprint() {
    const str = navigator.userAgent + navigator.language + screen.width + screen.height;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
}
*/

// 模态框通用逻辑
function setupModal(modalId, triggerBtnSel, closeBtnSel) {
  const modal   = document.getElementById(modalId);
  const openBtn = document.getElementById(triggerBtnSel);
  const closeBtn= modal.querySelector(closeBtnSel);

  /* 点击右上角：仅加 .show */
  openBtn.addEventListener('click', () => modal.classList.add('show'));

  /* 关闭：点 × 或蒙层 */
  closeBtn.addEventListener('click', () => modal.classList.remove('show'));
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.classList.remove('show');
  });
}

// 验证授权码函数
async function verifyLicense(licenseKey) {
    try {
        const response = await fetch('/api/verify_license', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                license_key: licenseKey
            })
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('验证授权码失败:', error);
        return { success: false, message: '网络错误，请稍后重试' };
    }
}

// 恢复权限逻辑
function setupLicenseRestoration() {
    const restoreBtn = document.getElementById('restoreLicenseBtn');
    if (restoreBtn) {
        restoreBtn.addEventListener('click', async function() {
            const licenseKey = document.getElementById('licenseKeyInput').value;
            
            if (!licenseKey) {
                alert('请输入授权码');
                return;
            }
            
            // 显示加载状态
            const originalText = restoreBtn.textContent;
            restoreBtn.textContent = '验证中...';
            restoreBtn.disabled = true;
            
            // 发送验证请求到后端
            const data = await verifyLicense(licenseKey);
            
            // 恢复按钮状态
            restoreBtn.textContent = originalText;
            restoreBtn.disabled = false;
            
            if (data.success) {
                alert('权限恢复成功！');
                // 保存授权状态到本地存储
                localStorage.setItem('license_key', licenseKey);
                localStorage.setItem('isPaidUser', 'true');
                // 关闭模态框
                document.getElementById('licenseModal').style.display = 'none';
                // 更新页面显示
                updatePaidStatusDisplay();
            } else {
                alert('权限恢复失败：' + data.message);
            }
        });
    }
}

// 检查权限状态
function checkAccessStatus() {
    const licenseKey = localStorage.getItem('license_key');
    const isPaidUser = localStorage.getItem('isPaidUser') === 'true';
    
    // 如果有授权码但未验证，自动验证
    if (licenseKey && !isPaidUser) {
        verifyLicense(licenseKey).then(data => {
            if (data.success) {
                localStorage.setItem('isPaidUser', 'true');
                updatePaidStatusDisplay();
            }
        });
    } else if (isPaidUser) {
        updatePaidStatusDisplay();
    }
}

// 更新付费状态显示
function updatePaidStatusDisplay() {
    const isPaidUser = localStorage.getItem('isPaidUser') === 'true';
    
    // 更新内容页的按钮文字
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(btn => {
        if (isPaidUser && btn.textContent.includes('免费试测')) {
            btn.textContent = '开始全文测试';
        }
    });
    
    // 更新导航栏的恢复权限链接文字
    const restoreLink = document.getElementById('restoreLicenseLink');
    if (restoreLink) {
        if (isPaidUser) {
            restoreLink.textContent = '已付费';
            restoreLink.style.display = 'none'; // 已付费用户隐藏恢复链接
        } else {
            restoreLink.textContent = '恢复权限';
            restoreLink.style.display = 'block'; // 未付费用户显示恢复链接
        }
    }
    
    // 显示或隐藏付费内容
    const premiumElements = document.querySelectorAll('.premium-only');
    premiumElements.forEach(el => {
        el.style.display = isPaidUser ? 'block' : 'none';
    });
    
    // 显示或隐藏免费内容
    const freeElements = document.querySelectorAll('.free-only');
    freeElements.forEach(el => {
        el.style.display = isPaidUser ? 'none' : 'block';
    });
}

// 在支付成功页面保存授权码
function saveLicenseKeyFromURL() {
    // 检查URL参数中是否有授权码
    const urlParams = new URLSearchParams(window.location.search);
    const licenseKey = urlParams.get('license_key');
    
    if (licenseKey) {
        localStorage.setItem('license_key', licenseKey);
        localStorage.setItem('isPaidUser', 'true');
        updatePaidStatusDisplay();
    }
}

// 在DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 设置恢复权限模态框
    if (document.getElementById('restoreLicenseLink')) {
        setupModal('licenseModal', 'restoreLicenseLink', '.close');
    }
    
    // 设置权限恢复功能
    setupLicenseRestoration();

    // 设置会员购买功能
    setupMemberPurchase();
    
    // 检查并更新付费状态
    checkAccessStatus();
    
    // 如果是支付成功页面，尝试从URL获取授权码
    if (window.location.pathname.includes('payment/success')) {
        saveLicenseKeyFromURL();
    }
});


// 新增：设置会员购买功能
function setupMemberPurchase() {
    return;
    console.log('设置会员购买功能');
    const purchaseLink = document.getElementById('purchaseMemberLink');
    console.log('购买链接元素:', purchaseLink);
    const customModal = document.getElementById('customPaymentModal');
    const customCloseBtn = document.getElementById('customClosePayment');
    const alipaySelector = document.getElementById('alipaySelector');
    const customAlipayBtn = document.getElementById('customAlipayBtn');

    // 支付方式选择逻辑
    if (alipaySelector) {
        alipaySelector.addEventListener('click', function() {
            const isSelected = alipaySelector.classList.contains('selected');
            
            if (isSelected) {
                alipaySelector.classList.remove('selected');
                if (customAlipayBtn) customAlipayBtn.disabled = true;
            } else {
                alipaySelector.classList.add('selected');
                if (customAlipayBtn) customAlipayBtn.disabled = false;
            }
        });
    }

    // 支付宝支付按钮点击事件
    if (customAlipayBtn) {
        customAlipayBtn.addEventListener('click', function() {
            processAlipayPaymentFromNav();
        });
    }
    
    // 关闭按钮事件
    if (customCloseBtn) {
        customCloseBtn.addEventListener('click', function() {
            if (customModal) {
                customModal.style.display = 'none';
            }
        });
    }
    
    // 点击弹窗外部关闭
    if (customModal) {
        customModal.addEventListener('click', function(event) {
            if (event.target === customModal) {
                customModal.style.display = 'none';
            }
        });
    }

    // 购买链接点击事件
    if (purchaseLink) {
        purchaseLink.addEventListener('click', function() {
            if (customModal) {
                customModal.style.display = 'flex';
            }
        });
    }
}

// 新增：从导航栏发起的支付宝支付处理
function processAlipayPaymentFromNav() {
    const customAlipayBtn = document.getElementById('customAlipayBtn');
    
    // 如果按钮被禁用，则不处理
    if (customAlipayBtn && customAlipayBtn.disabled) {
        return;
    }    
    
    // 显示支付中状态
    if (customAlipayBtn) {
        customAlipayBtn.innerHTML = '<span>支付处理中...</span>';
        customAlipayBtn.disabled = true;
    }
    
    // 检测是否为移动设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // 支付数据 - 添加来源标识
    const paymentData = {
        from: 'nav', // 标识从导航栏购买入口发起
        is_mobile: isMobile
    };

    // 发送支付请求
    fetch('/api/create_order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('支付创建成功，来源: 导航栏, 设备类型:', data.is_mobile ? '移动端' : 'PC端');
            
            // 移动端特殊处理
            if (data.is_mobile) {
                window.location.href = data.pay_url;
                setTimeout(() => {
                    window.open(data.pay_url, '_blank');
                }, 500);
            } else {
                // PC端直接跳转
                window.location.href = data.pay_url;
            }
        } else {
            alert('创建订单失败: ' + (data.message || '未知错误'));
            resetPaymentButtonInNav();
        }
    })
    .catch(error => {
        console.error('支付请求错误:', error);
        alert('网络错误，请稍后重试');
        resetPaymentButtonInNav();
    });
}

// 新增：恢复导航栏支付按钮状态
function resetPaymentButtonInNav() {
    const alipayBtn = document.getElementById('customAlipayBtn');
    const alipaySelector = document.getElementById('alipaySelector');
    if (alipayBtn) {
        alipayBtn.innerHTML = '<span class="price">¥1.0</span><span class="btn-text">立即购买</span>';
        alipayBtn.disabled = !alipaySelector.classList.contains('selected');
    }
}