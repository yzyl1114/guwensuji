document.addEventListener('DOMContentLoaded', function() {
    // 检查付费状态
    let isPaidUser = localStorage.getItem('isPaidUser') === 'true';
    const articleId = getQueryParam('id') || 1;
    
    // 配置参数
    const freeQuestionCount = 5;
    const paidQuestionCount = 10;
    let currentQuestionIndex = 0;
    let allQuestions = [];
    let usedQuestionIndices = new Set();
    
        // 添加自定义支付弹窗事件监听
    const customAlipayBtn = document.getElementById('customAlipayBtn');
    const customCloseBtn = document.getElementById('customClosePayment');
    const customModal = document.getElementById('customPaymentModal');
    
    if (customAlipayBtn) {
        customAlipayBtn.addEventListener('click', function() {
            processAlipayPayment();
        });
    }
    
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

    // 支付宝支付处理函数
    function processAlipayPayment() {
        // 显示支付中状态
        const alipayBtn = document.getElementById('customAlipayBtn');
        if (alipayBtn) {
            alipayBtn.innerHTML = '<span>支付处理中...</span>';
            alipayBtn.disabled = true;
        }
        
    // 保存当前文章ID到支付数据中
        const paymentData = {
            article_id: articleId // 添加文章ID到支付数据
        };

        // 原有的支付逻辑
        fetch('/api/create_order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = data.pay_url;
            } else {
                alert('创建订单失败: ' + (data.message || '未知错误'));
                // 恢复按钮状态
                resetPaymentButton();
            }
        })
        .catch(error => {
            console.error('支付请求错误:', error);
            alert('网络错误，请稍后重试');
            // 恢复按钮状态
            resetPaymentButton();
        });
    }

    // 恢复支付按钮状态
    function resetPaymentButton() {
        const alipayBtn = document.getElementById('customAlipayBtn');
        if (alipayBtn) {
            alipayBtn.innerHTML = '<span class="price">¥1.0</span><span class="btn-text">立即购买</span>';
            alipayBtn.disabled = false;
        }
    }

    // 初始化测试
    initQuiz();
    
    // 支付弹窗逻辑
    /*
    const startPaymentBtn = document.getElementById('startAlipayPayment');
    if (startPaymentBtn) {
        startPaymentBtn.addEventListener('click', showPaymentModal);
    }
    
    const closePaymentBtn = document.getElementById('closePayment');
    if (closePaymentBtn) {
        closePaymentBtn.addEventListener('click', function() {
            document.getElementById('paymentModal').style.display = 'none';
        });
    }
    */

    // 初始化测试
    function initQuiz() {
        console.log('初始化测试，文章ID:', articleId);
            // 检查是否刚从支付成功页面返回
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('from') === 'payment_success') {
            // 确保付费状态已更新
            localStorage.setItem('isPaidUser', 'true');
            // 移除URL参数，避免重复触发
            window.history.replaceState({}, '', window.location.pathname);
        }
    
        // 重新获取付费状态
        isPaidUser = localStorage.getItem('isPaidUser') === 'true';
        
        console.log('检查全局变量状态:');
        console.log(' - typeof articles:', typeof articles);
        console.log(' - articles内容:', articles);
        console.log(' - 付费状态:', isPaidUser);

        // 延迟执行以确保article.js完全加载
        setTimeout(() => {
            // 首先尝试获取文章内容
            const articleContent = getArticleContent(articleId);
            console.log('获取到的文章内容:', articleContent ? articleContent.substring(0, 100) + '...' : '空');
            
            // 所有文章都使用智能生成逻辑
            if (articleContent && articleContent.trim().length > 5) {
                console.log('使用智能生成题目');
                allQuestions = generateBasicQuestions(articleContent);
            } else {
                console.log('使用通用题目');
                allQuestions = generateUniversalQuestions();
            }
            
            console.log('生成的题目数量:', allQuestions.length);
            
            // 恢复进度
            const savedProgress = localStorage.getItem('quizProgress');
            if (savedProgress) {
                const progress = JSON.parse(savedProgress);
                if (progress.articleId == articleId) {
                    currentQuestionIndex = progress.currentIndex;
                    usedQuestionIndices = new Set(progress.usedIndices);
                } else {
                    currentQuestionIndex = 0;
                    usedQuestionIndices = new Set();
                }
            }
            
            // 根据付费状态确定题目数量
            let questionsToShow = allQuestions;
            if (!isPaidUser) {
                questionsToShow = allQuestions.slice(0, Math.min(freeQuestionCount, allQuestions.length));
            } else {
                questionsToShow = allQuestions.slice(0, Math.min(paidQuestionCount, allQuestions.length));
            }
            
            // 更新进度显示
            document.getElementById('total').textContent = questionsToShow.length;
            document.getElementById('current').textContent = currentQuestionIndex + 1;
            
            // 添加刷新按钮（仅付费用户）
            if (isPaidUser) {
                addRefreshButton();
            }
            
            // 显示当前题目
            if (questionsToShow.length > 0) {
                showQuestion(currentQuestionIndex);
            } else {
                showErrorState();
            }
        }, 100); // 延迟100ms确保article.js加载完成
    }
    
    // 显示错误状态
    function showErrorState() {
        const questionEl = document.getElementById('question');
        questionEl.innerHTML = '<p>无法生成测试题目，请检查文章内容。</p>';
        document.getElementById('options').innerHTML = '';
    }

    // 添加刷新按钮
    function addRefreshButton() {
        const progressEl = document.querySelector('.progress');
        if (!progressEl || progressEl.querySelector('.refresh-btn')) return;
        
        const refreshBtn = document.createElement('button');
        refreshBtn.textContent = '🔄 换题';
        refreshBtn.className = 'refresh-btn';
        refreshBtn.onclick = refreshCurrentQuestion;
        progressEl.appendChild(refreshBtn);
    }
    
    // 刷新当前题目（优化版）
    function refreshCurrentQuestion() {
        if (usedQuestionIndices.size >= allQuestions.length) {
            alert('所有题目都已尝试过，请开始新测试！');
            resetQuizProgress();
            return;
        }
        
        const currentQuestionBase = allQuestions[currentQuestionIndex];
        
        if (currentQuestionBase.isSmartGenerated) {
            const newVariant = generateQuestionVariant(currentQuestionBase, getArticleContent(articleId));
            showQuestionVariant(currentQuestionIndex, newVariant);
        } else {
            let newIndex;
            const availableIndices = [];
            
            for (let i = 0; i < allQuestions.length; i++) {
                if (!usedQuestionIndices.has(i) && 
                    allQuestions[i].type === currentQuestionBase.type) {
                    availableIndices.push(i);
                }
            }
            
            if (availableIndices.length > 0) {
                newIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
                showQuestion(newIndex);
            } else {
                do {
                    newIndex = Math.floor(Math.random() * allQuestions.length);
                } while (usedQuestionIndices.has(newIndex) && usedQuestionIndices.size < allQuestions.length);
                
                showQuestion(newIndex);
            }
        }
    }
    
    // 显示题目变体
    function showQuestionVariant(index, variant) {
        usedQuestionIndices.add(index);
        saveQuizProgress();
        
        const questionsToShow = isPaidUser ? 
            allQuestions.slice(0, paidQuestionCount) : 
            allQuestions.slice(0, freeQuestionCount);
            
        if (index >= questionsToShow.length) {
            if (!isPaidUser && questionsToShow.length === freeQuestionCount) {
                showPaymentModal();
            } else {
                alert('恭喜！您已完成所有测试！');
                setTimeout(() => {
                    resetQuizProgress();
                }, 2000);
            }
            return;
        }
        
        const question = variant;
        document.getElementById('current').textContent = index + 1;
        
        const questionEl = document.getElementById('question');
        questionEl.innerHTML = '';
        
        question.text.forEach(segment => {
            if (segment.type === 'text') {
                questionEl.innerHTML += segment.content;
            } else if (segment.type === 'blank') {
                questionEl.innerHTML += `
                    <span class="blank">
                        <input type="text" id="blank-${segment.id}" data-answer="${segment.answer}" readonly>
                    </span>
                `;
            }
        });
        
        const optionsEl = document.getElementById('options');
        optionsEl.innerHTML = '';
        
        question.options.forEach(option => {
            const optionEl = document.createElement('div');
            optionEl.className = 'option';
            optionEl.textContent = option;
            optionEl.addEventListener('click', function() {
                checkAnswer(this, option, question.answer);
            });
            optionsEl.appendChild(optionEl);
        });
    }
    
    // 重置测试进度
    function resetQuizProgress() {
        localStorage.removeItem('quizProgress');
        currentQuestionIndex = 0;
        usedQuestionIndices = new Set();
        initQuiz();
    }
    
    // 显示问题
    function showQuestion(index) {
        currentQuestionIndex = index;
        usedQuestionIndices.add(index);
        saveQuizProgress();
        
        const questionsToShow = isPaidUser ? 
            allQuestions.slice(0, paidQuestionCount) : 
            allQuestions.slice(0, freeQuestionCount);
            
        if (index >= questionsToShow.length) {
            if (!isPaidUser && questionsToShow.length === freeQuestionCount) {
                showPaymentModal();
            } else {
                alert('恭喜！您已完成所有测试！');
                setTimeout(() => {
                    resetQuizProgress();
                }, 2000);
            }
            return;
        }
        
        const question = questionsToShow[index];
        document.getElementById('current').textContent = index + 1;
        
        const questionEl = document.getElementById('question');
        questionEl.innerHTML = '';
        
        question.text.forEach(segment => {
            if (segment.type === 'text') {
                questionEl.innerHTML += segment.content;
            } else if (segment.type === 'blank') {
                questionEl.innerHTML += `
                    <span class="blank">
                        <input type="text" id="blank-${segment.id}" data-answer="${segment.answer}" readonly>
                    </span>
                `;
            }
        });
        
        const optionsEl = document.getElementById('options');
        optionsEl.innerHTML = '';
        
        question.options.forEach(option => {
            const optionEl = document.createElement('div');
            optionEl.className = 'option';
            optionEl.textContent = option;
            optionEl.addEventListener('click', function() {
                checkAnswer(this, option, question.answer);
            });
            optionsEl.appendChild(optionEl);
        });
    }
    
    // 保存测试进度
    function saveQuizProgress() {
        const progress = {
            articleId: articleId,
            currentIndex: currentQuestionIndex,
            usedIndices: Array.from(usedQuestionIndices)
        };
        localStorage.setItem('quizProgress', JSON.stringify(progress));
    }
    
    // 检查答案
    function checkAnswer(optionEl, selectedOption, correctAnswer) {
        const blankInput = document.getElementById(`blank-${currentQuestionIndex}`);
        blankInput.value = selectedOption;
        
        if (selectedOption === correctAnswer) {
            optionEl.classList.add('correct');
            blankInput.classList.add('correct');
            setTimeout(() => {
                showQuestion(currentQuestionIndex + 1);
            }, 1000);
        } else {
            optionEl.classList.add('incorrect');
            blankInput.classList.add('incorrect');
            const options = document.querySelectorAll('.option');
            options.forEach(opt => {
                if (opt.textContent === correctAnswer) {
                    opt.classList.add('correct');
                }
            });
            setTimeout(() => {
                showQuestion(currentQuestionIndex + 1);
            }, 3000);
        }
        
        document.querySelectorAll('.option').forEach(opt => {
            opt.style.pointerEvents = 'none';
        });
    }
    
    // 显示支付弹窗
    // 替换原来的 showPaymentModal 函数
    function showPaymentModal() {
        // 显示自定义弹窗
        const customModal = document.getElementById('customPaymentModal');
        if (customModal) {
            customModal.style.display = 'flex';
        }
    }

    // 智能生成错误选项
    function generateSmartOptions(correctAnswer, fullText) {
        const allSegments = fullText.split(/[，。；！？、]/).filter(segment => 
            segment.length > 0 && segment !== correctAnswer
        );
        
        const correctLength = correctAnswer.length;
        const lengthRangeSegments = allSegments.filter(segment => 
            Math.abs(segment.length - correctLength) <= 2
        );
        
        let candidatePool = lengthRangeSegments.length >= 2 ? lengthRangeSegments : allSegments;
        const shuffled = [...candidatePool].sort(() => 0.5 - Math.random());
        const wrongOptions = shuffled.slice(0, 2);
        const allOptions = [correctAnswer, ...wrongOptions];
        return allOptions.sort(() => 0.5 - Math.random());
    }
    
    // 获取文章内容（增强版）
    function getArticleContent(articleId) {
        console.log('尝试获取文章内容，ID:', articleId);
        
        // 方法1: 直接从全局articles变量获取（article.js中定义的）
        if (typeof articles !== 'undefined') {
            console.log('找到全局articles变量:', articles);
            
            // 尝试用数字ID获取
            if (articles[articleId]) {
                console.log('通过数字ID获取到文章:', articles[articleId]);
                return articles[articleId].content;
            }
            
            // 尝试用字符串ID获取
            const stringId = articleId.toString();
            if (articles[stringId]) {
                console.log('通过字符串ID获取到文章:', articles[stringId]);
                return articles[stringId].content;
            }
            
            // 如果没有对应ID，尝试获取第一个文章
            const firstKey = Object.keys(articles)[0];
            if (firstKey && articles[firstKey]) {
                console.log('使用第一篇文章作为备用:', articles[firstKey]);
                return articles[firstKey].content;
            }
        }
        
        // 方法2: 如果articles不存在，尝试动态加载article.js
        console.log('articles变量未定义，尝试动态加载article.js');
        
        // 由于安全限制，动态加载可能需要调整，这里先返回null
        console.warn('无法动态加载文章内容，请确保article.js已正确引入');
        return null;
    }
    
    // 智能题目生成（修复版）
    function generateBasicQuestions(content) {
        console.log('开始智能生成题目，内容长度:', content ? content.length : 0);
        
        // 放宽条件：只要内容存在且长度大于5个字符就尝试生成
        if (!content || content.trim().length < 5) {
            console.log('内容过短或为空，使用通用题目');
            return generateUniversalQuestions();
        }
        
        const sentences = splitIntoSentences(content);
        console.log('分割出的句子数量:', sentences.length);
        
        const candidateSentences = selectCandidateSentences(sentences);
        console.log('符合条件的句子数量:', candidateSentences.length);
        
        const questions = [];
        
        // 进一步放宽：即使句子不多也尝试生成
        for (let i = 0; i < Math.min(10, candidateSentences.length); i++) {
            const sentence = candidateSentences[i];
            const question = createQuestionFromSentence(sentence, content, i);
            if (question) {
                questions.push(question);
            }
        }
        
        console.log('成功生成的题目数量:', questions.length);
        
        // 即使只生成1个题目也使用
        if (questions.length > 0) {
            return questions;
        } else {
            console.log('智能生成失败，使用通用题目');
            return generateUniversalQuestions();
        }
    }
    
    // 按标点分割句子（修复版）
    function splitIntoSentences(content) {
        if (!content) return [];
        
        // 更灵活的分割规则
        const sentences = content.split(/(?<=[。！？；.!?;])/g)
            .filter(s => s && s.trim().length > 0)
            .map(s => s.trim());
            
        return sentences;
    }
    
    // 选择适合挖空的句子（放宽条件）
    function selectCandidateSentences(sentences) {
        return sentences.filter(sentence => {
            const trimmed = sentence.trim();
            // 进一步放宽条件：长度1-50字符，包含中文即可
            return trimmed.length >= 1 && 
                trimmed.length <= 50 &&
                /[\u4e00-\u9fa5]/.test(trimmed);
        });
    }
    
    // 从句子创建题目（增强容错）
    function createQuestionFromSentence(sentence, fullText, questionId) {
        try {
            const trimmed = sentence.trim();
            if (trimmed.length < 2) return null;
            
            const blankPosition = findBestBlankPosition(trimmed);
            if (blankPosition.start >= blankPosition.end) {
                return null;
            }
            
            const blankText = trimmed.substring(blankPosition.start, blankPosition.end).trim();
            if (!blankText || blankText.length === 0) {
                return null;
            }
            
            const before = trimmed.substring(0, blankPosition.start);
            const after = trimmed.substring(blankPosition.end);
            const options = generateSmartOptions(blankText, fullText);
            
            if (options.length < 2) {
                return null; // 选项不足
            }
            
            return {
                text: [
                    {type: 'text', content: before},
                    {type: 'blank', id: questionId, answer: blankText},
                    {type: 'text', content: after}
                ],
                options: options,
                answer: blankText,
                isSmartGenerated: true
            };
        } catch (error) {
            console.error('创建题目时出错:', error);
            return null;
        }
    }
    
    // 找到最佳的挖空位置（简化逻辑）
    function findBestBlankPosition(sentence) {
        const words = sentence.split('');
        let bestStart = -1;
        let bestLength = 0;
        
        // 寻找连续的2-4个字符
        for (let i = 0; i < words.length - 1; i++) {
            const length = Math.min(2 + (i % 3), 4); // 2-4个字符
            if (i + length <= words.length) {
                const segment = words.slice(i, i + length).join('');
                if (isSuitableBlank(segment)) {
                    bestStart = i;
                    bestLength = length;
                    break;
                }
            }
        }
        
        // 如果没找到合适的，使用默认位置
        if (bestStart === -1) {
            bestStart = Math.floor(sentence.length * 0.3);
            bestLength = Math.min(2, sentence.length - bestStart);
        }
        
        return { start: bestStart, end: bestStart + bestLength };
    }
    
    // 判断是否适合作为挖空内容（放宽条件）
    function isSuitableBlank(text) {
        if (!text || text.length < 1) return false;
        
        const unsuitablePatterns = [
            /^[，。；！？、\s]$/, // 单个标点或空格
            /^\s+$/ // 纯空格
        ];
        
        return !unsuitablePatterns.some(pattern => pattern.test(text)) && 
               /[\u4e00-\u9fa5]/.test(text); // 至少包含一个中文
    }
    
    // 通用题目生成（符合填空测试逻辑）- 这是需要修正的关键部分
    function generateUniversalQuestions() {
        console.log('生成通用填空题目');
        return [
            {
                text: [
                    {type: 'text', content: '读书破万卷，'},
                    {type: 'blank', id: 0, answer: '下笔如有神'},
                    {type: 'text', content: '。'}
                ],
                options: ['下笔如有神', '下笔如无神', '下笔似有神'],
                answer: '下笔如有神',
                isSmartGenerated: false
            },
            {
                text: [
                    {type: 'text', content: '海内存知己，'},
                    {type: 'blank', id: 1, answer: '天涯若比邻'},
                    {type: 'text', content: '。'}
                ],
                options: ['天涯若比邻', '天涯如比邻', '天涯似比邻'],
                answer: '天涯若比邻',
                isSmartGenerated: false
            },
            {
                text: [
                    {type: 'text', content: '欲穷千里目，'},
                    {type: 'blank', id: 2, answer: '更上一层楼'},
                    {type: 'text', content: '。'}
                ],
                options: ['更上一层楼', '更上二层楼', '更上高楼'],
                answer: '更上一层楼',
                isSmartGenerated: false
            },
            {
                text: [
                    {type: 'text', content: '春风又绿江南岸，'},
                    {type: 'blank', id: 3, answer: '明月何时照我还'},
                    {type: 'text', content: '。'}
                ],
                options: ['明月何时照我还', '明月何日照我还', '明月几时照我还'],
                answer: '明月何时照我还',
                isSmartGenerated: false
            },
            {
                text: [
                    {type: 'text', content: '人生自古谁无死，'},
                    {type: 'blank', id: 4, answer: '留取丹心照汗青'},
                    {type: 'text', content: '。'}
                ],
                options: ['留取丹心照汗青', '留取忠心照汗青', '留取赤心照汗青'],
                answer: '留取丹心照汗青',
                isSmartGenerated: false
            }
        ];
    }
    
    // 生成题目变体
    function generateQuestionVariant(baseQuestion, fullText) {
        return {
            ...baseQuestion,
            options: generateSmartOptions(baseQuestion.answer, fullText)
        };
    }
    
    // 生成滕王阁序测试题目（优化版）- 需要保留！
    /*滕王阁序测试题下线
    function generateTengwanggeQuestions() {
        const fullText = getArticleContent(1);
        
        if (!fullText) {
            return generateBasicQuestions("");
        }
        
        const questionStructures = [
            { before: '豫章', after: '，洪都新府。', answer: '故郡' },
            { before: '星分翼轸，', after: '。', answer: '地接衡庐' },
            { before: '襟三江而带五湖，', after: '。', answer: '控蛮荆而引瓯越' },
            { before: '物华天宝，', after: '；人杰地灵，徐孺下陈蕃之榻。', answer: '龙光射牛斗之墟' },
            { before: '雄州雾列，', after: '。', answer: '俊采星驰' }
        ];
        
        return questionStructures.map((structure, index) => ({
            text: [
                {type: 'text', content: structure.before},
                {type: 'blank', id: index, answer: structure.answer},
                {type: 'text', content: structure.after}
            ],
            options: generateSmartOptions(structure.answer, fullText),
            answer: structure.answer,
            isSmartGenerated: false
        }));
    }
    */
    // 获取URL参数
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }
});