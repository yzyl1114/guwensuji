// 文章数据 - 岳阳楼记示例（段落级拼音展示）
const articles = {
    1: {
        title: "滕王阁序",
        author: "唐 · 王勃",
        location: "南昌滕王阁背诵免票",
        image: "images/tengwangge.jpg",
        content: [
            "豫章故郡，洪都新府。星分翼轸，地接衡庐。襟三江而带五湖，控蛮荆而引瓯越。",
            "物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃之榻。",
            // 可以继续添加全文...
        ],
        pinyin: [
            "Yùzhāng gù jùn, hóngdū xīn fǔ. Xīng fēn yìzhěn, dì jiē hénglú. Jīn sānjiāng ér dài wǔhú, kòng mánjīng ér yǐn ōuyuè.",
            "Wùhuá tiānbǎo, lóng guāng shè niúdòu zhī xū; rénjié dìlíng, Xú Rú xià Chén Fān zhī tà.",
            // 对应的拼音...
        ]
    },
    2: {
        title: "岳阳楼记",
        author: "宋 · 范仲淹", 
        location: "岳阳楼背诵免票",
        image: "images/yueyanglou.jpg",
        content: [
            "庆历四年春，滕子京谪守巴陵郡。越明年，政通人和，百废具兴。乃重修岳阳楼，增其旧制，刻唐贤今人诗赋于其上。属予作文以记之。",
            "予观夫巴陵胜状，在洞庭一湖。衔远山，吞长江，浩浩汤汤，横无际涯；朝晖夕阴，气象万千。此则岳阳楼之大观也，前人之述备矣。",
            "然则北通巫峡，南极潇湘，迁客骚人，多会于此，览物之情，得无异乎？",
            "若夫淫雨霏霏，连月不开，阴风怒号，浊浪排空；日星隐曜，山岳潜形；商旅不行，樯倾楫摧；薄暮冥冥，虎啸猿啼。登斯楼也，则有去国怀乡，忧谗畏讥，满目萧然，感极而悲者矣。",
            "至若春和景明，波澜不惊，上下天光，一碧万顷；沙鸥翔集，锦鳞游泳；岸芷汀兰，郁郁青青。而或长烟一空，皓月千里，浮光跃金，静影沉璧，渔歌互答，此乐何极！登斯楼也，则有心旷神怡，宠辱偕忘，把酒临风，其喜洋洋者矣。",
            "嗟夫！予尝求古仁人之心，或异二者之为，何哉？不以物喜，不以己悲；居庙堂之高则忧其民；处江湖之远则忧其君。是进亦忧，退亦忧。然则何时而乐耶？其必曰\"先天下之忧而忧，后天下之乐而乐\"乎。噫！微斯人，吾谁与归？",
            "时六年九月十五日。"
        ],
        pinyin: [
            "Qìnglì sì nián chūn, téng zǐjīng zhé shǒu bālíng jùn. Yuè míngnián, zhèngtōng rénhé, bǎifèi jù xīng. Nǎi chóngxiū yuèyáng lóu, zēng qí jiùzhì, kè táng xián jīnrén shīfù yú qí shàng. Shǔ yǔ zuòwén yǐ jì zhī.",
            "Yǔ guān fū bālíng shèngzhuàng, zài dòngtíng yī hú. Xián yuǎn shān, tūn chángjiāng, hàohào shāngshāng, héng wú jìyá; zhāo huī xī yīn, qìxiàng wànqiān. Cǐ zé yuèyáng lóu zhī dàguān yě, qiánrén zhī shù bèi yǐ.",
            "Ránzé běi tōng wūxiá, nán jí xiāoxiāng, qiānkè sāorén, duō huì yú cǐ, lǎn wù zhī qíng, dé wú yì hū?",
            "Ruòfú yínyǔ fēifēi, lián yuè bù kāi, yīnfēng nùháo, zhuólàng páikōng; rìxīng yǐn yào, shānyuè qián xíng; shānglǚ bùxíng, qiáng qīng jí cuī; bómù míngmíng, hǔ xiào yuán tí. Dēng sī lóu yě, zé yǒu qù guó huáixiāng, yōu chán wèi jī, mǎnmù xiāorán, gǎn jí ér bēi zhě yǐ.",
            "Zhì ruò chūn hé jǐng míng, bōlán bù jīng, shàngxià tiānguāng, yī bì wànqǐng; shā ōu xiáng jí, jǐn lín yóuyǒng; àn zhǐ tīng lán, yùyù qīngqīng. Ér huò cháng yān yī kōng, hàoyuè qiānlǐ, fúguāng yuè jīn, jìng yǐng chén bì, yúgē hù dá, cǐ lè hé jí! Dēng sī lóu yě, zé yǒu xīnkuàng shényí, chǒngrǔ xié wàng, bǎjiǔ línfēng, qí xǐ yángyáng zhě yǐ.",
            "Jiēfū! Yǔ cháng qiú gǔ rénrén zhī xīn, huò yì èr zhě zhī wéi, hé zāi? Bù yǐ wù xǐ, bù yǐ jǐ bēi; jū miàotáng zhī gāo zé yōu qí mín; chǔ jiānghú zhī yuǎn zé yōu qí jūn. Shì jìn yì yōu, tuì yì yōu. Ránzé hé shí ér lè yé? Qí bì yuē \"xiān tiānxià zhī yōu ér yōu, hòu tiānxià zhī lè ér lè\" hū. Yī! Wēi sī rén, wú shuí yǔ guī?",
            "Shí liù nián jiǔ yuè shíwǔ rì."
        ]
    }
    // 可以继续添加其他文章，id依次递增...
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
    
    // 初始化模态框（从main.js中复制过来确保功能正常）
    setupModal('licenseModal', 'restoreLicenseLink', '.close');
});

// 渲染文章内容
function renderArticle(article) {
    const container = document.getElementById('article-content');
    
    container.innerHTML = `
        <article class="article-detail">
            <div class="article-header">
                <img src="${article.image}" alt="${article.title}" class="article-cover">
                <div class="article-info">
                    <h1>${article.title}</h1>
                    <p class="article-meta">${article.author} | ${article.location}</p>
                </div>
            </div>
            
            <div class="content-controls">
                <button class="control-btn active" data-mode="original">只看原文</button>
                <button class="control-btn" data-mode="pinyin">只看拼音</button>
                <button class="control-btn" data-mode="both">原文+拼音</button>
            </div>
            
            <div class="article-body">
                ${generateContent(article, 'both')}
            </div>
        </article>
    `;
    
    // 设置内容切换功能
    setupContentControls();
}

// 生成内容HTML
function generateContent(article, mode) {
    let contentHTML = '';
    
    for (let i = 0; i < article.content.length; i++) {
        const paragraph = article.content[i];
        const pinyin = article.pinyin[i];
        
        switch(mode) {
            case 'original':
                contentHTML += `<p class="content-paragraph original">${paragraph}</p>`;
                break;
            case 'pinyin':
                contentHTML += `<p class="content-paragraph pinyin">${pinyin}</p>`;
                break;
            case 'both':
            default:
                contentHTML += `
                    <div class="paragraph-container">
                        <p class="content-paragraph original">${paragraph}</p>
                        <p class="content-paragraph pinyin">${pinyin}</p>
                    </div>
                `;
                break;
        }
    }
    
    return contentHTML;
}

// 设置内容控制功能
function setupContentControls() {
    const controlBtns = document.querySelectorAll('.control-btn');
    const articleBody = document.querySelector('.article-body');
    
    controlBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const mode = this.getAttribute('data-mode');
            const articleId = new URLSearchParams(window.location.search).get('id') || '1';
            const article = articles[articleId];
            
            // 更新按钮状态
            controlBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 更新内容显示
            articleBody.innerHTML = generateContent(article, mode);
        });
    });
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
                // 这里可以替换为显示支付弹窗的逻辑
            }
        });
    }
}

// 模态框通用逻辑（从main.js复制，确保独立运行）
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