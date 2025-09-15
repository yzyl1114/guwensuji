document.addEventListener('DOMContentLoaded', function() {
    // 检查付费状态
    const isPaidUser = localStorage.getItem('isPaidUser') === 'true';
    const articleId = getQueryParam('id') || 1; // 获取文章ID，默认为1（滕王阁序）
    
    // 免费试做题目数量
    const freeQuestionCount = 5;
    let currentQuestionIndex = 0;
    let questions = [];
    
    // 初始化测试
    initQuiz();
    
    // 支付弹窗逻辑
    const paymentModal = document.getElementById('paymentModal');
    const closePaymentBtn = document.getElementById('closePayment');
    
    closePaymentBtn.addEventListener('click', function() {
        paymentModal.style.display = 'none';
    });
    
    // 初始化测试
    function initQuiz() {
        // 根据文章ID加载对应的问题
        if (articleId == 1) {
            questions = generateTengwanggeQuestions();
        }
        // 可以添加更多文章的问题生成函数
        
        // 如果不是付费用户，只取前5题
        if (!isPaidUser) {
            questions = questions.slice(0, freeQuestionCount);
        }
        
        // 更新进度显示
        document.getElementById('total').textContent = questions.length;
        
        // 显示第一题
        showQuestion(0);
    }
    
    // 显示问题
    function showQuestion(index) {
        if (index >= questions.length) {
            // 所有题目已完成
            if (!isPaidUser && questions.length === freeQuestionCount) {
                // 免费用户做完5题后显示支付弹窗
                showPaymentModal();
            } else {
                // 付费用户完成所有题目
                alert('恭喜！您已完成所有测试！');
            }
            return;
        }
        
        currentQuestionIndex = index;
        const question = questions[index];
        
        // 更新进度
        document.getElementById('current').textContent = index + 1;
        
        // 生成题目HTML
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
        
        // 生成选项HTML
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
    
    // 检查答案
    function checkAnswer(optionEl, selectedOption, correctAnswer) {
        const blankInput = document.getElementById(`blank-${currentQuestionIndex}`);
        
        // 填入答案
        blankInput.value = selectedOption;
        
        // 判断对错
        if (selectedOption === correctAnswer) {
            optionEl.classList.add('correct');
            blankInput.classList.add('correct');
            
            // 1秒后自动下一题
            setTimeout(() => {
                showQuestion(currentQuestionIndex + 1);
            }, 1000);
        } else {
            optionEl.classList.add('incorrect');
            blankInput.classList.add('incorrect');
            
            // 高亮正确答案
            const options = document.querySelectorAll('.option');
            options.forEach(opt => {
                if (opt.textContent === correctAnswer) {
                    opt.classList.add('correct');
                }
            });
            
            // 3秒后自动下一题
            setTimeout(() => {
                showQuestion(currentQuestionIndex + 1);
            }, 3000);
        }
        
        // 禁用所有选项
        document.querySelectorAll('.option').forEach(opt => {
            opt.style.pointerEvents = 'none';
        });
    }
    
    // 显示支付弹窗
    function showPaymentModal() {
        // 在实际应用中，这里应该请求后端生成支付订单并显示二维码
        // 此处为模拟实现
        document.getElementById('paymentModal').style.display = 'flex';
        
        // 模拟支付成功（实际应用中应由支付宝回调）
        setTimeout(() => {
            // 标记为付费用户
            localStorage.setItem('isPaidUser', 'true');
            alert('支付成功！已解锁全部功能！');
            document.getElementById('paymentModal').style.display = 'none';
            
            // 重新加载所有题目
            initQuiz();
        }, 5000); // 5秒后模拟支付成功
    }
    
    // 生成滕王阁序测试题目
    function generateTengwanggeQuestions() {
        return [
            {
                text: [
                    {type: 'text', content: '豫章'},
                    {type: 'blank', id: 0, answer: '故郡'},
                    {type: 'text', content: '，洪都新府。'}
                ],
                options: ['故郡', '古城', '旧地'],
                answer: '故郡'
            },
            {
                text: [
                    {type: 'text', content: '星分翼轸，'},
                    {type: 'blank', id: 1, answer: '地接衡庐'},
                    {type: 'text', content: '。'}
                ],
                options: ['地接衡庐', '地处江西', '地方广阔'],
                answer: '地接衡庐'
            },
            {
                text: [
                    {type: 'text', content: '襟三江而带五湖，'},
                    {type: 'blank', id: 2, answer: '控蛮荆而引瓯越'},
                    {type: 'text', content: '。'}
                ],
                options: ['控蛮荆而引瓯越', '控南方而引北方', '控江河而引湖泊'],
                answer: '控蛮荆而引瓯越'
            },
            {
                text: [
                    {type: 'text', content: '物华天宝，'},
                    {type: 'blank', id: 3, answer: '龙光射牛斗之墟'},
                    {type: 'text', content: '；人杰地灵，徐孺下陈蕃之榻。'}
                ],
                options: ['龙光射牛斗之墟', '龙光照耀大地', '龙光闪耀天空'],
                answer: '龙光射牛斗之墟'
            },
            {
                text: [
                    {type: 'text', content: '雄州雾列，'},
                    {type: 'blank', id: 4, answer: '俊采星驰'},
                    {type: 'text', content: '。'}
                ],
                options: ['俊采星驰', '英才辈出', '人才济济'],
                answer: '俊采星驰'
            },
            // 可以继续添加更多题目...
        ];
    }
    
    // 获取URL参数
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }
});