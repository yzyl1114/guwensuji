document.addEventListener('DOMContentLoaded', function() {
    // 检查付费状态
    const isPaidUser = localStorage.getItem('isPaidUser') === 'true';
    const articleId = getQueryParam('id') || 1; // 获取文章ID，默认为1（滕王阁序）
    
    // 配置参数
    const freeQuestionCount = 5;
    const paidQuestionCount = 10;
    let currentQuestionIndex = 0;
    let allQuestions = []; // 存储所有题目
    let usedQuestionIndices = new Set(); // 记录已使用的题目索引
    
    // 初始化测试
    initQuiz();
    
    // 支付弹窗逻辑
    // 绑定支付按钮事件
    const startPaymentBtn = document.getElementById('startAlipayPayment');
    if (startPaymentBtn) {
        startPaymentBtn.addEventListener('click', showPaymentModal);
    }
    
    // 绑定关闭按钮事件
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
            // 岳阳楼记使用基础智能生成（后续实现完整版）
            allQuestions = generateBasicQuestions(getArticleContent(articleId));
        } else {
            // 其他文章使用基础智能生成
            allQuestions = generateBasicQuestions(getArticleContent(articleId));
        }
        
        // 恢复进度（如果有）
        const savedProgress = localStorage.getItem('quizProgress');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            // 只有当文章ID相同时才恢复进度
            if (progress.articleId == articleId) {
                currentQuestionIndex = progress.currentIndex;
                usedQuestionIndices = new Set(progress.usedIndices);
            } else {
                // 文章不同，重置进度
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
    
    // 刷新当前题目（修改版）
    function refreshCurrentQuestion() {
        if (usedQuestionIndices.size >= allQuestions.length) {
            alert('所有题目都已尝试过，请开始新测试！');
            resetQuizProgress();
            return;
        }
        
        // 不改变题号，只重新生成当前题目的内容
        const currentQuestionBase = allQuestions[currentQuestionIndex];
        
        // 如果是智能生成的题目，重新生成变体
        if (currentQuestionBase.isSmartGenerated) {
            const newVariant = generateQuestionVariant(currentQuestionBase, getArticleContent(articleId));
            showQuestionVariant(currentQuestionIndex, newVariant);
        } else {
            // 对于预定义题目，找一道同类型但不同的题目
            let newIndex;
            const availableIndices = [];
            
            // 找到所有同类型且未使用的题目
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
                // 如果没有同类型题目，找任何未使用的题目
                do {
                    newIndex = Math.floor(Math.random() * allQuestions.length);
                } while (usedQuestionIndices.has(newIndex) && usedQuestionIndices.size < allQuestions.length);
                
                showQuestion(newIndex);
            }
        }
    }
    
    // 显示题目变体（不改变题号）
    function showQuestionVariant(index, variant) {
        // 保存当前进度（题号不变）
        usedQuestionIndices.add(index);
        saveQuizProgress();
        
        const questionsToShow = isPaidUser ? 
            allQuestions.slice(0, paidQuestionCount) : 
            allQuestions.slice(0, freeQuestionCount);
            
        if (index >= questionsToShow.length) {
            // 题目完成逻辑（保持不变）
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
        
        // 使用变体题目内容
        const question = variant;
        
        // 更新进度显示（题号不变）
        document.getElementById('current').textContent = index + 1;
        
        // 生成题目HTML（使用变体内容）
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
        
        // 生成选项HTML（使用变体选项）
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
        // 保存当前进度
        currentQuestionIndex = index;
        usedQuestionIndices.add(index);
        saveQuizProgress();
        
        const questionsToShow = isPaidUser ? 
            allQuestions.slice(0, paidQuestionCount) : 
            allQuestions.slice(0, freeQuestionCount);
            
        if (index >= questionsToShow.length) {
            // 所有题目已完成
            if (!isPaidUser && questionsToShow.length === freeQuestionCount) {
                // 免费用户做完5题后显示支付弹窗
                showPaymentModal();
            } else {
                // 付费用户完成所有题目
                alert('恭喜！您已完成所有测试！');
                // 重置进度，以便重新开始
                setTimeout(() => {
                    resetQuizProgress();
                }, 2000);
            }
            return;
        }
        
        const question = questionsToShow[index];
        
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
    
    // 保存测试进度（修改版，包含文章ID）
    function saveQuizProgress() {
        const progress = {
            articleId: articleId, // 保存当前文章ID
            currentIndex: currentQuestionIndex,
            usedIndices: Array.from(usedQuestionIndices)
        };
        localStorage.setItem('quizProgress', JSON.stringify(progress));
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
        // 显示加载提示
        alert("正在准备支付，请稍候...");
        
        // 向后端请求创建订单
        fetch('/api/create_order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // 重要：直接跳转到支付宝支付页面
                console.log("跳转到支付页面:", data.pay_url);
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
        // 标记为付费用户
        localStorage.setItem('isPaidUser', 'true');
        alert('支付成功！已解锁全部功能！');
        document.getElementById('paymentModal').style.display = 'none';
        
        // 无缝继续测试（从第6题开始）
        currentQuestionIndex = freeQuestionCount; // 从第6题开始
        isPaidUser = true; // 更新状态
        
        // 添加刷新按钮
        addRefreshButton();
        
        // 更新总题数显示
        document.getElementById('total').textContent = paidQuestionCount;
        
        // 显示下一题
        showQuestion(currentQuestionIndex);
    }
    
    // 智能生成错误选项
    function generateSmartOptions(correctAnswer, fullText) {
        // 将全文按标点分割成半句数组
        const allSegments = fullText.split(/[，。；！？、]/).filter(segment => 
            segment.length > 0 && segment !== correctAnswer
        );
        
        // 筛选出与正确答案字数相近的半句（±2个字）
        const correctLength = correctAnswer.length;
        const lengthRangeSegments = allSegments.filter(segment => 
            Math.abs(segment.length - correctLength) <= 2
        );
        
        // 如果符合条件的半句不足，放宽条件
        let candidatePool = lengthRangeSegments.length >= 2 ? lengthRangeSegments : allSegments;
        
        // 随机选择2个干扰项
        const shuffled = [...candidatePool].sort(() => 0.5 - Math.random());
        const wrongOptions = shuffled.slice(0, 2);
        
        // 组合选项并随机排序
        const allOptions = [correctAnswer, ...wrongOptions];
        return allOptions.sort(() => 0.5 - Math.random());
    }
    
    // 基础智能题目生成（临时方案）
    function generateBasicQuestions(content) {
        if (!content) {
            // 如果没有文章内容，返回默认题目
            return [{
                text: [
                    {type: 'text', content: '此文章暂无测试题目，'},
                    {type: 'blank', id: 0, answer: '敬请期待'},
                    {type: 'text', content: '！'}
                ],
                options: ['敬请期待', '即将上线', '开发中'],
                answer: '敬请期待',
                isSmartGenerated: true
            }];
        }
        
        // 简单的按标点分割生成题目
        const sentences = content.split(/[，。；！？]/).filter(s => s.length > 2);
        const questions = [];
        
        for (let i = 0; i < Math.min(10, sentences.length); i++) {
            const sentence = sentences[i].trim();
            if (sentence.length < 3) continue;
            
            // 简单的挖空：取句子中间部分
            const blankStart = Math.floor(sentence.length / 3);
            const blankLength = Math.floor(sentence.length / 3);
            const blankText = sentence.substring(blankStart, blankStart + blankLength);
            
            const before = sentence.substring(0, blankStart);
            const after = sentence.substring(blankStart + blankLength);
            
            // 生成干扰项：从其他句子中找长度相近的
            const wrongOptions = [];
            for (let j = 0; j < sentences.length && wrongOptions.length < 2; j++) {
                if (j !== i) {
                    const otherSentence = sentences[j].trim();
                    if (Math.abs(otherSentence.length - blankText.length) <= 2) {
                        wrongOptions.push(otherSentence.substring(0, Math.min(blankText.length, otherSentence.length)));
                    }
                }
            }
            
            // 如果干扰项不足，用默认项补全
            while (wrongOptions.length < 2) {
                wrongOptions.push('默认选项' + wrongOptions.length);
            }
            
            const allOptions = [blankText, ...wrongOptions].sort(() => 0.5 - Math.random());
            
            questions.push({
                text: [
                    {type: 'text', content: before},
                    {type: 'blank', id: i, answer: blankText},
                    {type: 'text', content: after}
                ],
                options: allOptions,
                answer: blankText,
                isSmartGenerated: true
            });
        }
        
        return questions.length > 0 ? questions : [{
            text: [
                {type: 'text', content: '此文章内容较短，'},
                {type: 'blank', id: 0, answer: '暂不支持测试'},
                {type: 'text', content: '。'}
            ],
            options: ['暂不支持测试', '内容过短', '无法生成'],
            answer: '暂不支持测试',
            isSmartGenerated: true
        }];
    }
    
    // 生成题目变体（用于刷新功能）
    function generateQuestionVariant(baseQuestion, fullText) {
        // 这里可以实现更复杂的变体生成逻辑
        // 目前简单返回原题目，后续可以改进
        return {
            ...baseQuestion,
            options: generateSmartOptions(baseQuestion.answer, fullText)
        };
    }
    
    // 获取文章内容（需要与article.js中的文章数据对接）
    function getArticleContent(articleId) {
        // 这里需要与您的文章数据对接
        // 暂时返回空，后续需要根据articleId从文章数据中获取内容
        // 例如：return articles[articleId]?.content || '';
        return '';
    }
    
    // 生成滕王阁序测试题目
    function generateTengwanggeQuestions() {
        // 滕王阁序全文（示例，请替换为你的完整版本）
        const fullText = "豫章故郡，洪都新府。星分翼轸，地接衡庐。襟三江而带五湖，控蛮荆而引瓯越。物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃之榻。雄州雾列，俊采星驰。台隍枕夷夏之交，宾主尽东南之美。都督阎公之雅望，棨戟遥临；宇文新州之懿范，襜帷暂驻。十旬休假，胜友如云；千里逢迎，高朋满座。腾蛟起凤，孟学士之词宗；紫电青霜，王将军之武库。家君作宰，路出名区；童子何知，躬逢胜饯。时维九月，序属三秋。潦水尽而寒潭清，烟光凝而暮山紫。俨骖騑于上路，访风景于崇阿；临帝子之长洲，得天人之旧馆。层峦耸翠，上出重霄；飞阁流丹，下临无地。鹤汀凫渚，穷岛屿之萦回；桂殿兰宫，即冈峦之体势。披绣闼，俯雕甍，山原旷其盈视，川泽纡其骇瞩。闾阎扑地，钟鸣鼎食之家；舸舰弥津，青雀黄龙之舳。云销雨霁，彩彻区明。落霞与孤鹜齐飞，秋水共长天一色。渔舟唱晚，响穷彭蠡之滨；雁阵惊寒，声断衡阳之浦。遥襟甫畅，逸兴遄飞。爽籁发而清风生，纤歌凝而白云遏。睢园绿竹，气凌彭泽之樽；邺水朱华，光照临川之笔。四美具，二难并。穷睇眄于中天，极娱游于暇日。天高地迥，觉宇宙之无穷；兴尽悲来，识盈虚之有数。望长安于日下，目吴会于云间。地势极而南溟深，天柱高而北辰远。关山难越，谁悲失路之人？萍水相逢，尽是他乡之客。怀帝阍而不见，奉宣室以何年？嗟乎！时运不齐，命途多舛。冯唐易老，李广难封。屈贾谊于长沙，非无圣主；窜梁鸿于海曲，岂乏明时？所赖君子见机，达人知命。老当益壮，宁移白首之心？穷且益坚，不坠青云之志。酌贪泉而觉爽，处涸辙以犹欢。北海虽赊，扶摇可接；东隅已逝，桑榆非晚。孟尝高洁，空余报国之情；阮籍猖狂，岂效穷途之哭！勃，三尺微命，一介书生。无路请缨，等终军之弱冠；有怀投笔，慕宗悫之长风。舍簪笏于百龄，奉晨昏于万里。非谢家之宝树，接孟氏之芳邻。他日趋庭，叨陪鲤对；今兹捧袂，喜托龙门。杨意不逢，抚凌云而自惜；钟期既遇，奏流水以何惭？呜乎！胜地不常，盛筵难再；兰亭已矣，梓泽丘墟。临别赠言，幸承恩于伟饯；登高作赋，是所望于群公。敢竭鄙怀，恭疏短引；一言均赋，四韵俱成。请洒潘江，各倾陆海云尔：滕王高阁临江渚，佩玉鸣鸾罢歌舞。画栋朝飞南浦云，珠帘暮卷西山雨。闲云潭影日悠悠，物换星移几度秋。阁中帝子今何在？槛外长江空自流。";
        
        return [
            {
                text: [
                    {type: 'text', content: '豫章'},
                    {type: 'blank', id: 0, answer: '故郡'},
                    {type: 'text', content: '，洪都新府。'}
                ],
                options: generateSmartOptions('故郡', fullText),
                answer: '故郡'
            },
            {
                text: [
                    {type: 'text', content: '星分翼轸，'},
                    {type: 'blank', id: 1, answer: '地接衡庐'},
                    {type: 'text', content: '。'}
                ],
                options: generateSmartOptions('地接衡庐', fullText),
                answer: '地接衡庐'
            },
            {
                text: [
                    {type: 'text', content: '襟三江而带五湖，'},
                    {type: 'blank', id: 2, answer: '控蛮荆而引瓯越'},
                    {type: 'text', content: '。'}
                ],
                options: generateSmartOptions('控蛮荆而引瓯越', fullText),
                answer: '控蛮荆而引瓯越'
            },
            {
                text: [
                    {type: 'text', content: '物华天宝，'},
                    {type: 'blank', id: 3, answer: '龙光射牛斗之墟'},
                    {type: 'text', content: '；人杰地灵，徐孺下陈蕃之榻。'}
                ],
                options: generateSmartOptions('龙光射牛斗之墟', fullText),
                answer: '龙光射牛斗之墟'
            },
            {
                text: [
                    {type: 'text', content: '雄州雾列，'},
                    {type: 'blank', id: 4, answer: '俊采星驰'},
                    {type: 'text', content: '。'}
                ],
                options: generateSmartOptions('俊采星驰', fullText),
                answer: '俊采星驰'
            },
            {
                text: [
                    {type: 'text', content: '台隍枕夷夏之交，'},
                    {type: 'blank', id: 5, answer: '宾主尽东南之美'},
                    {type: 'text', content: '。'}
                ],
                options: generateSmartOptions('宾主尽东南之美', fullText),
                answer: '宾主尽东南之美'
            },
            {
                text: [
                    {type: 'text', content: '都督阎公之雅望，'},
                    {type: 'blank', id: 6, answer: '棨戟遥临'},
                    {type: 'text', content: '；宇文新州之懿范，襜帷暂驻。'}
                ],
                options: generateSmartOptions('棨戟遥临', fullText),
                answer: '棨戟遥临'
            },
            {
                text: [
                    {type: 'text', content: '十旬休假，'},
                    {type: 'blank', id: 7, answer: '胜友如云'},
                    {type: 'text', content: '；千里逢迎，高朋满座。'}
                ],
                options: generateSmartOptions('胜友如云', fullText),
                answer: '胜友如云'
            },
            {
                text: [
                    {type: 'text', content: '腾蛟起凤，'},
                    {type: 'blank', id: 8, answer: '孟学士之词宗'},
                    {type: 'text', content: '；紫电青霜，王将军之武库。'}
                ],
                options: generateSmartOptions('孟学士之词宗', fullText),
                answer: '孟学士之词宗'
            },
            {
                text: [
                    {type: 'text', content: '家君作宰，路出名区；'},
                    {type: 'blank', id: 9, answer: '童子何知'},
                    {type: 'text', content: '，躬逢胜饯。'}
                ],
                options: generateSmartOptions('童子何知', fullText),
                answer: '童子何知'
            }
        ];
    }
    
    // 获取URL参数
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }
});