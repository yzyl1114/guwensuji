document.addEventListener('DOMContentLoaded', function() {
    // 拼音显示/切换功能
    const toggleBtn = document.getElementById('togglePinyin');
    const articleBody = document.querySelector('.article-body');

    if (toggleBtn && articleBody) {
        toggleBtn.addEventListener('click', function() {
            articleBody.classList.toggle('hide-pinyin');
            toggleBtn.textContent = articleBody.classList.contains('hide-pinyin') ? '显示拼音' : '隐藏拼音';
        });
    }

    // Phase 2: 这里将来会检查本地存储中的付费状态，并更改底部按钮的文字和链接
    // if (localStorage.getItem('isPaidUser') === 'true') {
    //     const ctaButton = document.querySelector('.cta-button');
    //     ctaButton.textContent = '开始全文测试';
    //     ctaButton.href = 'quiz.html?id=1&full=true'; // 假设的完整测试链接
    // }
});