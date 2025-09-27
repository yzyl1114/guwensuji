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
    
    // 检查并更新付费状态
    checkAccessStatus();
    
    // 如果是支付成功页面，尝试从URL获取授权码
    if (window.location.pathname.includes('payment/success')) {
        saveLicenseKeyFromURL();
    }
});