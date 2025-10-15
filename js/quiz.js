// 添加防复制事件
document.addEventListener('DOMContentLoaded', function() {
    // 防止右键菜单
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // 防止键盘复制
    document.addEventListener('keydown', function(e) {
        // 阻止Ctrl+C, Ctrl+A, Ctrl+U, F12等
        if (e.ctrlKey && (e.key === 'c' || e.key === 'a' || e.key === 'u')) {
            e.preventDefault();
            return false;
        }
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }
    });
    
    // 防止拖拽
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // 检查付费状态
    let isPaidUser = localStorage.getItem('isPaidUser') === 'true';
    const articleId = getQueryParam('id') || 1;
    
    // 配置参数
    const freeQuestionCount = 3;
    const paidQuestionCount = 10;
    let currentQuestionIndex = 0;
    let allQuestions = [];
    let usedQuestionIndices = new Set();
    
    // 添加自定义支付弹窗事件监听
    const customAlipayBtn = document.getElementById('customAlipayBtn');
    const customCloseBtn = document.getElementById('customClosePayment');
    const customModal = document.getElementById('customPaymentModal');
    const alipaySelector = document.getElementById('alipaySelector');
    // 添加协议逻辑
    const showAgreementLink = document.getElementById('showAgreement');
    const agreementModal = document.getElementById('agreementModal');
    const agreeBtn = document.getElementById('agreeBtn');

    // 协议链接点击事件
    if (showAgreementLink) {
        showAgreementLink.addEventListener('click', function(e) {
            e.preventDefault();
            agreementModal.style.display = 'block';
        });
    }
    // 同意按钮点击事件
    if (agreeBtn) {
        agreeBtn.addEventListener('click', function() {
            agreementModal.style.display = 'none';
        });
    }
    // 协议模态框关闭事件
    if (agreementModal) {
        agreementModal.addEventListener('click', function(e) {
            if (e.target === agreementModal || e.target.classList.contains('close')) {
                agreementModal.style.display = 'none';
            }
        });
    }

    // 支付方式选择逻辑
    if (alipaySelector) {
        alipaySelector.addEventListener('click', function() {
            const isSelected = alipaySelector.classList.contains('selected');
            
            if (isSelected) {
                alipaySelector.classList.remove('selected');
                customAlipayBtn.disabled = true;
            } else {
                alipaySelector.classList.add('selected');
                customAlipayBtn.disabled = false;
            }
        });
    }

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
        // 如果按钮被禁用，则不处理
        if (customAlipayBtn.disabled) {
            return;
        }    
        
        // 显示支付中状态
        const alipayBtn = document.getElementById('customAlipayBtn');
        if (alipayBtn) {
            alipayBtn.innerHTML = '<span>支付处理中...</span>';
            alipayBtn.disabled = true;
        }
        
        // 检测是否为移动设备
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // 支付数据
        const paymentData = {
            article_id: articleId,
            from: 'test', // 标识从测试页发起支付
            is_mobile: isMobile  // 告诉后端设备类型
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
                console.log('支付创建成功，设备类型:', data.is_mobile ? '移动端' : 'PC端');
                
                // 移动端特殊处理
                if (data.is_mobile) {
                    // 方法1: 直接跳转（推荐）
                    window.location.href = data.pay_url;
                    
                    // 方法2: 备用方案 - 在新窗口打开
                    setTimeout(() => {
                        window.open(data.pay_url, '_blank');
                    }, 500);
                } else {
                    // PC端直接跳转
                    window.location.href = data.pay_url;
                }
            } else {
                alert('创建订单失败: ' + (data.message || '未知错误'));
                resetPaymentButton();
            }
        })
        .catch(error => {
            console.error('支付请求错误:', error);
            alert('网络错误，请稍后重试');
            resetPaymentButton();
        });
    }


    // 恢复支付按钮状态
    function resetPaymentButton() {
        const alipayBtn = document.getElementById('customAlipayBtn');
        const alipaySelector = document.getElementById('alipaySelector');
        if (alipayBtn) {
            alipayBtn.innerHTML = '<span class="price">¥1.0</span><span class="btn-text">立即购买</span>';
            // 根据支付方式选择器的状态来设置按钮的禁用状态
            alipayBtn.disabled = !alipaySelector.classList.contains('selected');
        }
    }

    // 初始化测试
    initQuiz();

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
        // 如果是付费用户，重新生成所有题目
        if (isPaidUser) {
            const articleContent = getArticleContent(articleId);
            if (articleContent && articleContent.trim().length > 10) {
                // 重新生成题目
                allQuestions = generateBasicQuestions(articleContent);
                usedQuestionIndices = new Set();
                currentQuestionIndex = 0;
                
                // 更新进度显示
                const questionsToShow = allQuestions.slice(0, paidQuestionCount);
                document.getElementById('total').textContent = questionsToShow.length;
                document.getElementById('current').textContent = 1;
                
                alert('已为您生成全新的测试题目！');
                showQuestion(0);
                return;
            } else {
                alert('无法生成新题目，请检查文章内容！');
                return;
            }
        }
        
        // 免费用户的简化换题逻辑
        if (usedQuestionIndices.size >= allQuestions.length) {
            alert('所有题目都已尝试过，请开始新测试！');
            resetQuizProgress();
            return;
        }
        
        // 免费用户：随机选择下一道未做过的题目
        let newIndex;
        const availableIndices = [];
        
        const questionsLimit = Math.min(freeQuestionCount, allQuestions.length);
        for (let i = 0; i < questionsLimit; i++) {
            if (!usedQuestionIndices.has(i)) {
                availableIndices.push(i);
            }
        }
        
        if (availableIndices.length > 0) {
            newIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
            showQuestion(newIndex);
        } else {
            // 如果没有未做过的题目，重置测试
            alert('所有题目都已尝试过，请开始新测试！');
            resetQuizProgress();
        }
    }
    
    // 重置测试进度
    function resetQuizProgress() {
        // 如果是付费用户，重新生成题目
        if (isPaidUser) {
            const articleContent = getArticleContent(articleId);
            if (articleContent && articleContent.trim().length > 10) {
                allQuestions = generateBasicQuestions(articleContent);
                usedQuestionIndices = new Set();
                currentQuestionIndex = 0;
                
                // 更新进度显示
                const questionsToShow = allQuestions.slice(0, paidQuestionCount);
                document.getElementById('total').textContent = questionsToShow.length;
                document.getElementById('current').textContent = 1;
                
                alert('已为您生成全新的测试题目！');
                showQuestion(0);
                saveQuizProgress();
                return;
            }
        }
        
        // 免费用户或生成失败时使用原有逻辑
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
        const blankInput = document.querySelector(`input[data-answer="${correctAnswer}"]`);
        
        if (!blankInput) {
            console.error('找不到空白输入框，正确答案:', correctAnswer);
            return;
        }
        
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
        
        if (!content || content.trim().length < 10) {
            console.log('内容过短或为空，使用通用题目');
            return generateUniversalQuestions();
        }
        // 先按完整句子分割（以句号、问号、感叹号等结尾）
        const fullSentences = splitIntoFullSentences(content);
        console.log('分割出的完整句子数量:', fullSentences.length);
        
        const questions = [];
        
        // 对每个完整句子，生成可能的题目
        for (let i = 0; i < Math.min(10, fullSentences.length); i++) {
            const sentence = fullSentences[i];
            const sentenceQuestions = createQuestionsFromSentence(sentence, i, content);
            questions.push(...sentenceQuestions);
            
            // 如果已经达到10个题目，提前结束
            if (questions.length >= 10) break;
        }
        
        console.log('成功生成的题目数量:', questions.length);
        
        if (questions.length > 0) {
            return questions.slice(0, 10); // 最多返回10个题目
        } else {
            console.log('智能生成失败，使用通用题目');
            return generateUniversalQuestions();
        }
    }

    // 按完整句子分割（以句号、问号、感叹号等结尾）
    function splitIntoFullSentences(content) {
        if (!content) return [];
        
        // 按中文句子结束标点分割
        const sentences = content.split(/(?<=[。！？])/g)
            .filter(s => s && s.trim().length > 0)
            .map(s => s.trim());
            
        return sentences;
    }

    // 从一个完整句子创建题目
    function createQuestionsFromSentence(sentence, baseId, fullText) {
        const questions = [];
        
        // 将句子按逗号、分号等分割成半句
        const halfSentences = sentence.split(/[，；]/g)
            .filter(hs => hs && hs.trim().length >= 2)
            .map(hs => hs.trim());
        
        console.log(`句子"${sentence}"分割出的半句:`, halfSentences);
        
        if (halfSentences.length < 2) {
            // 如果句子只有一个半句，无法挖空，跳过
            return questions;
        }
        
        // 随机选择1-2个半句进行挖空（避免题目太多）
        const numBlanks = Math.min(2, halfSentences.length - 1);
        const selectedIndices = new Set();
        
        while (selectedIndices.size < numBlanks && selectedIndices.size < halfSentences.length) {
            const randomIndex = Math.floor(Math.random() * halfSentences.length);
            if (!selectedIndices.has(randomIndex)) {
                selectedIndices.add(randomIndex);
                
                const halfSentence = halfSentences[randomIndex];
                const question = createQuestionFromHalfSentence(sentence, halfSentence, baseId * 10 + randomIndex, fullText);
                if (question) {
                    questions.push(question);
                }
            }
        }
        
        return questions;
    }

    // 从完整句子和半句创建题目
    function createQuestionFromHalfSentence(fullSentence, halfSentence, questionId, fullText) {
        try {
            if (!halfSentence || halfSentence.length < 2) return null;
            // 去除标点符号（只保留中文和数字）
            const cleanHalfSentence = halfSentence.replace(/[，。！？；：、\s]/g, '');
            if (cleanHalfSentence.length < 2) return null;
            
            // 查找清理后的半句在完整句子中的位置
            const cleanSentence = fullSentence.replace(/[，。！？；：、\s]/g, '');
            const halfSentenceIndex = cleanSentence.indexOf(cleanHalfSentence);
            if (halfSentenceIndex === -1) return null;
            
            // 获取上下文（在完整句子内）
            // 需要找到原句中的对应位置，而不是清理后的位置
            const originalIndex = findOriginalPosition(fullSentence, cleanHalfSentence);
            if (originalIndex === -1) return null;
            
            const before = fullSentence.substring(0, originalIndex);
            const after = fullSentence.substring(originalIndex + cleanHalfSentence.length);
                
            /*未处理标点符号前的逻辑
            // 查找半句在完整句子中的位置
            const halfSentenceIndex = fullSentence.indexOf(halfSentence);
            if (halfSentenceIndex === -1) return null;

            // 获取上下文（在完整句子内）
            const before = fullSentence.substring(0, halfSentenceIndex);
            const after = fullSentence.substring(halfSentenceIndex + halfSentence.length);
            */

            // 使用新的选项生成逻辑，从全文选取干扰项
            const options = generateOptionsFromFullText(cleanHalfSentence, fullText, fullSentence);
            
            // 确保选项有效
            if (options.length < 3) {
                console.warn('选项数量不足，跳过此题');
                return null;
            }
            
            return {
                text: [
                    {type: 'text', content: before},
                    {type: 'blank', id: questionId, answer: cleanHalfSentence},
                    {type: 'text', content: after}
                ],
                options: options,
                answer: cleanHalfSentence,
                isSmartGenerated: true
            };
        } catch (error) {
            console.error('创建题目时出错:', error);
            return null;
        }
    }
 
        // 新增辅助函数：在原句中查找清理后文本的位置
    function findOriginalPosition(originalText, cleanText) {
        // 简单的查找逻辑
        return originalText.indexOf(cleanText);
    }
    
    // 从全文生成选项（避免使用当前句子的其他半句）
    function generateOptionsFromFullText(correctAnswer, fullText, currentSentence) {
        try {
            // 从全文分割所有半句，并清理标点符号
            const allHalfSentences = fullText.split(/[，。！？；：]/g)
                .filter(hs => hs && hs.trim().length >= 2)
                .map(hs => hs.replace(/[，。！？；：、\s]/g, '').trim())
                .filter(hs => hs.length >= 2);
            
            // 移除正确答案和当前句子中的所有半句
            const currentSentenceHalfSentences = currentSentence.split(/[，；]/g)
                .filter(hs => hs && hs.trim().length >= 2)
                .map(hs => hs.replace(/[，。！？；：、\s]/g, '').trim())
                .filter(hs => hs.length >= 2);
            
            // 排除当前句子中的所有半句
            const candidatePool = allHalfSentences.filter(hs => 
                hs !== correctAnswer && 
                !currentSentenceHalfSentences.includes(hs)
            );
            
            console.log(`正确答案: "${correctAnswer}", 候选池大小: ${candidatePool.length}`);
            
            
            // 如果候选池太小，添加一些通用选项
            let finalCandidatePool = candidatePool;
            if (candidatePool.length < 2) {
                const genericOptions = [
                    '天地玄黄', '宇宙洪荒', '日月盈昃', '辰宿列张',
                    '寒来暑往', '秋收冬藏', '云腾致雨', '露结为霜',
                    '金生丽水', '玉出昆冈', '剑号巨阙', '珠称夜光',
                    '推位让国', '有虞陶唐', '吊民伐罪', '周发殷汤',
                    '坐朝问道', '垂拱平章', '爱育黎首', '臣伏戎羌',
                    '果珍李柰', '菜重芥姜', '海咸河淡', '鳞潜羽翔'
                ].filter(opt => opt !== correctAnswer && !currentSentenceHalfSentences.includes(opt));
                
                finalCandidatePool = candidatePool.concat(genericOptions);
            }
            
            // 优先选择长度相近的半句
            const correctLength = correctAnswer.length;
            const lengthMatched = finalCandidatePool.filter(hs => 
                Math.abs(hs.length - correctLength) <= 2
            );
            
            // 如果长度匹配的选项足够，使用它们
            const sourcePool = lengthMatched.length >= 2 ? lengthMatched : finalCandidatePool;
            
            // 随机选择2个干扰项
            const shuffled = [...sourcePool].sort(() => 0.5 - Math.random());
            const wrongOptions = shuffled.slice(0, 2);
            
            // 合并选项并随机排序
            const allOptions = [correctAnswer, ...wrongOptions];
            return allOptions.sort(() => 0.5 - Math.random());
            
        } catch (error) {
            console.error('生成选项时出错:', error);
            // 出错时返回基本选项
            return [correctAnswer, '选项一', '选项二'].sort(() => 0.5 - Math.random());
        }
    }

    // 通用题目生成（符合填空测试逻辑）
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

    // 获取URL参数
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }
});

//添加环境检查和代码混淆保护
(function() {
    'use strict';
    
    // 检查是否在正确域名下运行
    const allowedDomains = [
        'guwensuji.com', 'www.guwensuji.com','guwensuji.com:8443','yzyl1114.github.io'
    ];
    const currentDomain = window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    
    if (!allowedDomains.includes(currentDomain)) {
        console.error('非法域名访问:', currentDomain);
        window.location.href = 'https://guwensuji.com';
        return;
    }

       // 代码完整性检查
    const originalFunctions = {
        generateBasicQuestions: generateBasicQuestions.toString(),
        checkAnswer: checkAnswer.toString()
    };
    
    // 定期检查关键函数是否被修改
    setInterval(function() {
        if (generateBasicQuestions.toString() !== originalFunctions.generateBasicQuestions ||
            checkAnswer.toString() !== originalFunctions.checkAnswer) {
            console.error('检测到代码篡改');
            window.location.reload();
        }
    }, 5000);
    
})();