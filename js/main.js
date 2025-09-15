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
function setupModal(modalId, openBtnId, closeBtnClass) {
    const modal = document.getElementById(modalId);
    const openBtn = document.getElementById(openBtnId);
    const closeBtn = modal.querySelector(closeBtnClass);

    if (openBtn) {
        openBtn.onclick = function() {
            modal.style.display = "block";
        }
    }

    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = "none";
        }
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// 恢复权限逻辑
function setupLicenseRestoration() {
    const restoreBtn = document.getElementById('restoreLicenseBtn');
    if (restoreBtn) {
        restoreBtn.addEventListener('click', function() {
            const licenseKey = document.getElementById('licenseKeyInput').value;
            const deviceFp = generateFingerprint();
            
            // 发送验证请求到后端
            fetch('/api/verify_license', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    license_key: licenseKey,
                    device_fp: deviceFp
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('权限恢复成功！');
                    localStorage.setItem('isPaidUser', 'true');
                    document.getElementById('licenseModal').style.display = 'none';
                    window.location.reload();
                } else {
                    alert('权限恢复失败：' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('网络错误，请稍后重试');
            });
        });
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
    
    // 更新页面上的付费状态显示
    updatePaidStatusDisplay();
});

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
    if (restoreLink && isPaidUser) {
        restoreLink.textContent = '已付费';
    }
}