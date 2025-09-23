document.addEventListener('DOMContentLoaded', function() {
    // 检查付费状态
    const isPaidUser = localStorage.getItem('isPaidUser') === 'true';
    const articleId = getQueryParam('id') || 1;
    
    // 配置参数
    const freeQuestionCount = 5;
    const paidQuestionCount = 10;
    let currentQuestionIndex = 0;
    let allQuestions = [];
    let usedQuestionIndices = new Set();
    
    // 初始化测试
    initQuiz();
    
    // 支付弹窗逻辑
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

    // 初始化测试
    function initQuiz() {
        // 根据文章ID加载对应的问题
        if (articleId == 1) {
            allQuestions = generateTengwanggeQuestions();
        } else if (articleId == 2) {
            allQuestions = generateBasicQuestions(getArticleContent(articleId));
        } else {
            allQuestions = generateBasicQuestions(getArticleContent(articleId));
        }
        
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
            questionsToShow = allQuestions.slice(0, freeQuestionCount);
        } else {
            questionsToShow = allQuestions.slice(0, paidQuestionCount);
        }
        
        // 更新进度显示
        document.getElementById('total').textContent = questionsToShow.length;
        document.getElementById('current').textContent = currentQuestionIndex + 1;
        
        // 添加刷新按钮（仅付费用户）
        if (isPaidUser) {
            addRefreshButton();
        }
        
        // 显示当前题目
        showQuestion(currentQuestionIndex);
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
    function showPaymentModal() {
        alert("正在准备支付，请稍候...");
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
            }
        })
        .catch(error => {
            console.error('支付请求错误:', error);
            alert('网络错误，请稍后重试');
        });
    }
    
    // 支付成功处理
    function onPaymentSuccess() {
        localStorage.setItem('isPaidUser', 'true');
        alert('支付成功！已解锁全部功能！');
        document.getElementById('paymentModal').style.display = 'none';
        currentQuestionIndex = freeQuestionCount;
        isPaidUser = true;
        addRefreshButton();
        document.getElementById('total').textContent = paidQuestionCount;
        showQuestion(currentQuestionIndex);
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
    
    // 获取文章内容
    function getArticleContent(articleId) {
        if (typeof articles !== 'undefined' && articles[articleId]) {
            return articles[articleId].content;
        }
        console.warn(`未找到文章ID ${articleId} 的内容`);
        return '';
    }
    
    // 智能题目生成（优化版）
    function generateBasicQuestions(content) {
        if (!content || content.trim().length < 10) {
            return generateFallbackQuestions();
        }
        
        const sentences = splitIntoSentences(content);
        const questions = [];
        const candidateSentences = selectCandidateSentences(sentences);
        
        for (let i = 0; i < Math.min(10, candidateSentences.length); i++) {
            const sentence = candidateSentences[i];
            const question = createQuestionFromSentence(sentence, content, i);
            if (question) {
                questions.push(question);
            }
        }
        
        return questions.length > 0 ? questions : generateFallbackQuestions();
    }
    
    // 按标点分割句子
    function splitIntoSentences(content) {
        return content.split(/(?<=[。！？；])(?![^"」』】]*["」』】])/g)
            .filter(s => s.trim().length > 0);
    }
    
    // 选择适合挖空的句子
    function selectCandidateSentences(sentences) {
        return sentences.filter(sentence => {
            const trimmed = sentence.trim();
            return trimmed.length >= 4 && 
                   trimmed.length <= 20 &&
                   hasSubstantialWords(trimmed);
        });
    }
    
    // 判断句子是否包含实词
    function hasSubstantialWords(sentence) {
        const substantialPatterns = [
            /[一二三四五六七八九十百千万]/,
            /[天地人山水日月星]/,
            /[之乎者也而何乃]/,
            /[春夏秋冬年月日]/
        ];
        return substantialPatterns.some(pattern => pattern.test(sentence));
    }
    
    // 从句子创建题目
    function createQuestionFromSentence(sentence, fullText, questionId) {
        const trimmed = sentence.trim();
        const blankPosition = findBestBlankPosition(trimmed);
        if (blankPosition === -1) return null;
        
        const blankText = trimmed.substring(blankPosition.start, blankPosition.end);
        const before = trimmed.substring(0, blankPosition.start);
        const after = trimmed.substring(blankPosition.end);
        const options = generateSmartOptions(blankText, fullText);
        
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
    }
    
    // 找到最佳的挖空位置
    function findBestBlankPosition(sentence) {
        const sentenceLength = sentence.length;
        const idealLength = Math.min(4, Math.max(2, Math.floor(sentenceLength / 3)));
        
        const candidates = [
            { start: Math.floor(sentenceLength * 0.3), length: idealLength },
            { start: Math.floor(sentenceLength * 0.4), length: idealLength },
            { start: Math.floor(sentenceLength * 0.5), length: idealLength }
        ];
        
        for (const candidate of candidates) {
            const end = candidate.start + candidate.length;
            if (end <= sentenceLength) {
                const segment = sentence.substring(candidate.start, end);
                if (isSuitableBlank(segment)) {
                    return { start: candidate.start, end: end };
                }
            }
        }
        
        const defaultStart = Math.max(1, Math.floor(sentenceLength * 0.4));
        const defaultEnd = Math.min(sentenceLength, defaultStart + idealLength);
        return { start: defaultStart, end: defaultEnd };
    }
    
    // 判断是否适合作为挖空内容
    function isSuitableBlank(text) {
        const unsuitablePatterns = [
            /^[，。；！？、]$/,
            /^(之|乎|者|也|而|何|乃|矣)$/,
            /^\s+$/
        ];
        return !unsuitablePatterns.some(pattern => pattern.test(text));
    }
    
    // 备用题目
    function generateFallbackQuestions() {
        return [{
            text: [
                {type: 'text', content: '此文章'},
                {type: 'blank', id: 0, answer: '内容独特'},
                {type: 'text', content: '，需要定制题目。'}
            ],
            options: ['内容独特', '篇幅较短', '文体特殊'],
            answer: '内容独特',
            isSmartGenerated: true
        }];
    }
    
    // 生成题目变体
    function generateQuestionVariant(baseQuestion, fullText) {
        return {
            ...baseQuestion,
            options: generateSmartOptions(baseQuestion.answer, fullText)
        };
    }
    
    // 生成滕王阁序测试题目（优化版）
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
    
    // 获取URL参数
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }
});