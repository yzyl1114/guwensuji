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

    openBtn.onclick = function() {
        modal.style.display = "block";
    }

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// 在DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 设置恢复权限模态框
    if (document.getElementById('restoreLicenseLink')) {
        setupModal('licenseModal', 'restoreLicenseLink', '.close');
    }
});