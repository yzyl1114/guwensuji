// 文章数据 - 岳阳楼记示例（逐字拼音）
const articles = {
    1: {
        title: "滕王阁序",
        author: "唐 · 王勃",
        location: "南昌滕王阁背诵免票",
        content: `豫章故郡，洪都新府。星分翼轸，地接衡庐。襟三江而带五湖，控蛮荆而引瓯越。物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃之榻。`,
        pinyin: `yù zhāng gù jùn ， hóng dū xīn fǔ 。 xīng fēn yì zhěn ， dì jiē héng lú 。 jīn sān jiāng ér dài wǔ hú ， kòng mán jīng ér yǐn ōu yuè 。 wù huá tiān bǎo ， lóng guāng shè niú dòu zhī xū ； rén jié dì líng ， xú rú xià chén fān zhī tà 。`
    },
    2: {
        title: "岳阳楼记",
        author: "宋 · 范仲淹", 
        location: "岳阳楼背诵免票",
        content: `庆历四年春，滕子京谪守巴陵郡。越明年，政通人和，百废具兴。乃重修岳阳楼，增其旧制，刻唐贤今人诗赋于其上。属予作文以记之。`,
        pinyin: `qìng lì sì nián chūn ， téng zǐ jīng zhé shǒu bā líng jùn 。 yuè míng nián ， zhèng tōng rén hé ， bǎi fèi jù xìng 。 nǎi chóng xiū yuè yáng lóu ， zēng qí jiù zhì ， kè táng xián jīn rén shī fù yú qí shàng 。 shǔ yǔ zuò wén yǐ jì zhī 。`
    }
    // 可以继续添加其他文章...
};

// 文章页面逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 获取文章ID
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id') || '1';
    
    // 获取文章数据
    const article = articles[articleId];
    
    if (article) {
        // 更新页面标题和meta描述（SEO优化）
        document.title = `${article.title} - 带拼音全文 | ${article.location} - 古文速记`;
        
        // 创建meta描述标签（如果不存在）
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
        }
        metaDescription.content = `${article.title}带拼音全文，${article.location}。提供完整的带拼音古文和填空测试工具，帮助您快速背诵通过景区免票活动。`;
        
        // 渲染文章内容
        renderArticle(article);
        
        // 设置测试按钮
        setupQuizButton(articleId);
    } else {
        // 文章不存在，显示404
        document.getElementById('article-content').innerHTML = `
            <div class="error-page">
                <h1>文章不存在</h1>
                <p>抱歉，您要查找的文章不存在。</p>
                <a href="index.html" class="back-home">返回首页</a>
            </div>
        `;
    }
    
    // 初始化模态框
    setupModal('licenseModal', 'restoreLicenseLink', '.close');
});

// 渲染文章内容
function renderArticle(article) {
    const container = document.getElementById('article-content');
    
    container.innerHTML = `
        <article class="article-detail">
            <div class="article-header">
                <h1>${article.title}</h1>
                <p class="article-meta">${article.author} | ${article.location}</p>
            </div>
            
            <div class="pinyin-controls">
                <button id="togglePinyin" class="pinyin-toggle-btn">隐藏拼音</button>
            </div>
            
            <div class="article-body with-pinyin">
                ${generatePinyinContent(article.content, article.pinyin)}
            </div>
        </article>
    `;
    
    // 设置拼音切换功能
    setupPinyinToggle();
}

// 生成逐字拼音内容
function generatePinyinContent(content, pinyin) {
    // 将内容和拼音转换为字符数组
    const contentChars = content.split('');
    const pinyinChars = pinyin.split('');
    
    let result = '';
    let pinyinIndex = 0;
    
    for (let i = 0; i < contentChars.length; i++) {
        const char = contentChars[i];
        
        // 跳过空格和标点符号的拼音
        if (char === ' ' || char === '，' || char === '。' || char === '；' || char === '！' || char === '？') {
            result += `<span class="char-container"><span class="chinese-char">${char}</span></span>`;
            continue;
        }
        
        // 获取当前字符的拼音
        let currentPinyin = '';
        while (pinyinIndex < pinyinChars.length && pinyinChars[pinyinIndex] !== ' ') {
            currentPinyin += pinyinChars[pinyinIndex];
            pinyinIndex++;
        }
        
        // 跳过空格
        if (pinyinChars[pinyinIndex] === ' ') {
            pinyinIndex++;
        }
        
        result += `
            <span class="char-container">
                <span class="pinyin-char">${currentPinyin}</span>
                <span class="chinese-char">${char}</span>
            </span>
        `;
    }
    
    return `<div class="pinyin-content">${result}</div>`;
}

// 设置拼音切换功能
function setupPinyinToggle() {
    const toggleBtn = document.getElementById('togglePinyin');
    const articleBody = document.querySelector('.article-body');
    
    if (toggleBtn && articleBody) {
        toggleBtn.addEventListener('click', function() {
            articleBody.classList.toggle('hide-pinyin');
            toggleBtn.textContent = articleBody.classList.contains('hide-pinyin') ? 
                '显示拼音' : '隐藏拼音';
        });
    }
}

// 设置测试按钮
function setupQuizButton(articleId) {
    const quizBtn = document.getElementById('startQuiz');
    
    if (quizBtn) {
        quizBtn.addEventListener('click', function() {
            // 检查付费状态
            const isPaidUser = localStorage.getItem('isPaidUser') === 'true';
            
            if (isPaidUser) {
                window.location.href = `quiz.html?id=${articleId}`;
            } else {
                // 显示支付提示
                alert('请先购买会员权限以解锁完整测试功能');
            }
        });
    }
}

// 模态框通用逻辑
function setupModal(modalId, openBtnId, closeBtnClass) {
    const modal = document.getElementById(modalId);
    const openBtn = document.getElementById(openBtnId);
    const closeBtn = modal ? modal.querySelector(closeBtnClass) : null;

    if (openBtn && modal) {
        openBtn.onclick = function() {
            modal.style.display = "block";
        }
    }

    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = "none";
        }
    }

    if (modal) {
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
}