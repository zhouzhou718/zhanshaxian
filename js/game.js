// 游戏主逻辑
const game = {
    // 游戏状态
    state: {
        gender: null,           // 'male' 或 'female'
        currentAge: 22,         // 当前年龄
        skip23: false,          // 22岁选C是否跳过23岁
        hasMortgage: false,     // 是否有房贷
        isMarried: false,       // 是否结婚
        isFired: false,         // 是否失业
        stats: {
            wealth: 0,          // 财富
            career: 0,          // 事业
            emotion: 0,         // 情感
            health: 10,         // 健康（初始10）
            freedom: 0           // 自由度
        }
    },

    // 初始化游戏
    init: function() {
        this.bindEvents();
        this.showScreen('start-screen');
    },

    // 绑定事件
    bindEvents: function() {
        // 性别选择
        document.querySelectorAll('.gender-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('selected'));
                e.target.classList.add('selected');
                this.state.gender = e.target.dataset.gender;
                document.getElementById('start-btn').classList.add('active');
                document.getElementById('start-btn').disabled = false;
            });
        });

        // 开始游戏
        document.getElementById('start-btn').addEventListener('click', () => {
            this.startGame();
        });

        // 重新开始
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restart();
        });
        
        document.getElementById('ending-restart').addEventListener('click', () => {
            this.restart();
        });

        // 随机事件确认
        document.getElementById('event-confirm').addEventListener('click', () => {
            this.closeEventModal();
        });
    },

    // 开始游戏
    startGame: function() {
        // 重置状态
        this.state.currentAge = 22;
        this.state.skip23 = false;
        this.state.hasMortgage = false;
        this.state.isMarried = false;
        this.state.isFired = false;
        this.state.stats = {
            wealth: 0,
            career: 0,
            emotion: 0,
            health: 10,
            freedom: 0
        };

        // 显示游戏界面
        this.showScreen('game-screen');
        
        // 更新属性显示
        this.updateStatsDisplay();
        
        // 开始22岁
        this.playAge(22);
    },

    // 显示屏幕
    showScreen: function(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    },

    // 播放指定年龄的场景
    playAge: function(age) {
        // 检查是否触发属性崩溃
        if (this.checkAttrCollapse()) {
            return;
        }

        // 22岁选C跳过23岁
        if (age === 23 && this.state.skip23) {
            this.playAge(24);
            return;
        }

        // 35岁结算
        if (age === 35) {
            this.showEnding();
            return;
        }

        const scene = storyData[age];
        if (!scene) {
            console.error('Scene not found for age:', age);
            return;
        }

        this.state.currentAge = age;

        // 更新界面
        document.getElementById('age').textContent = age;
        document.getElementById('scene-title').textContent = scene.title;
        document.getElementById('scene-content').textContent = scene.content;
        document.getElementById('news-content').textContent = scene.yearNews;

        // 渲染选项
        this.renderChoices(scene.choices, age);
    },

    // 渲染选项
    renderChoices: function(choices, age) {
        const container = document.getElementById('choices-container');
        container.innerHTML = '';

        choices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            
            // 检查是否需要锁定
            let isLocked = false;
            let lockReason = '';
            
            if (choice.requireNot === 'mortgage' && this.state.hasMortgage) {
                isLocked = true;
                lockReason = '房贷压力让你不敢冒险';
            }

            btn.disabled = isLocked;
            btn.innerHTML = `
                <span class="choice-text">${String.fromCharCode(65 + index)}、${choice.text}</span>
                <span class="choice-effect">${choice.desc}</span>
            `;
            
            if (isLocked) {
                btn.dataset.lockReason = lockReason;
            }

            btn.addEventListener('click', () => {
                this.makeChoice(choice, age);
            });

            container.appendChild(btn);
        });
    },

    // 执行选择
    makeChoice: function(choice, age) {
        const effects = choice.effect;
        
        // 处理特殊效果类型（掷骰子）
        if (effects.type === 'dice') {
            const success = Math.random() < 0.5;
            const result = success ? effects.success : effects.fail;
            this.applyEffects(result);
            
            // 显示结果
            alert(success ? '🎉 创业成功！事业腾飞！' : '💔 创业失败，血本无归！');
        } 
        // 高难度掷骰子（年龄惩罚）
        else if (effects.type === 'hardDice') {
            const success = Math.random() < 0.5;
            const result = success ? effects.success : effects.fail;
            this.applyEffects(result);
            
            alert(success ? '🎉 跳槽成功！' : '💔 跳槽失败...');
        }
        // 普通效果
        else {
            // 应用基本效果
            let finalEffects = { ...effects };
            
            // 28岁女性额外效果
            if (age === 28 && this.state.gender === 'female' && choice.femaleEffect) {
                finalEffects = { ...finalEffects, ...choice.femaleEffect };
            }
            
            // 年龄惩罚：30岁后事业提升需要额外代价
            if (age >= 30 && finalEffects.career > 0) {
                finalEffects.health = (finalEffects.health || 0) - 1;
            }
            
            this.applyEffects(finalEffects);
        }

        // 处理特殊状态变化
        if (age === 22 && choice.text.includes('老家')) {
            this.state.skip23 = true;
        }
        
        if (age === 24 && choice.text.includes('买房')) {
            this.state.hasMortgage = true;
        }
        
        if (age === 26 && choice.text.includes('妥协相亲')) {
            this.state.isMarried = true;
        }

        // 更新显示
        this.updateStatsDisplay();

        // 随机事件检查（在年龄变化前）
        setTimeout(() => {
            this.checkRandomEvent(age);
        }, 500);
    },

    // 应用效果
    applyEffects: function(effects) {
        for (const key in effects) {
            if (this.state.stats.hasOwnProperty(key)) {
                this.state.stats[key] += effects[key];
                
                // 限制属性范围
                if (key !== 'wealth' && this.state.stats[key] > 10) {
                    this.state.stats[key] = 10;
                }
                if (this.state.stats[key] < -5) {
                    this.state.stats[key] = -5;
                }
            }
        }
    },

    // 更新属性显示
    updateStatsDisplay: function() {
        document.getElementById('stat-wealth').textContent = this.state.stats.wealth;
        document.getElementById('stat-career').textContent = this.state.stats.career;
        document.getElementById('stat-emotion').textContent = this.state.stats.emotion;
        document.getElementById('stat-health').textContent = this.state.stats.health;
        document.getElementById('stat-freedom').textContent = this.state.stats.freedom;
    },

    // 检查属性崩溃
    checkAttrCollapse: function() {
        // 健康<30%（即<3）触发重病
        if (this.state.stats.health < 3) {
            this.showGameOver('💀 身体垮掉', '长期的高压工作和不健康的生活方式让你的身体彻底垮掉了。你住进了医院，需要长时间的治疗和休养。\n\n这可能是最贵的教训：健康才是真正的财富。');
            return true;
        }

        // 情感<20（即<2）触发离婚/分手
        if (this.state.stats.emotion < 2 && this.state.isMarried) {
            this.showGameOver('💔 婚姻破裂', '长期的忙碌和忽视让伴侣忍无可忍，坚决要求离婚。你失去了家庭，也失去了精神支柱。\n\n在追求事业的道路上，你弄丢了最珍贵的东西。');
            return true;
        }

        return false;
    },

    // 检查随机事件
    checkRandomEvent: function(age) {
        const event = randomEvents.tryTrigger(age, this.state.gender, this.state.hasMortgage);
        
        if (event) {
            this.showEventModal(event);
        } else {
            // 进入下一年
            this.playAge(age + 1);
        }
    },

    // 显示随机事件弹窗
    showEventModal: function(event) {
        document.getElementById('event-title').textContent = event.title;
        document.getElementById('event-desc').textContent = event.desc;
        document.getElementById('event-modal').classList.add('active');
        
        // 应用事件效果
        this.applyEffects(event.effect);
        this.updateStatsDisplay();
    },

    // 关闭随机事件弹窗
    closeEventModal: function() {
        document.getElementById('event-modal').classList.remove('active');
        
        // 再次检查属性崩溃（事件可能引发）
        if (!this.checkAttrCollapse()) {
            // 进入下一年
            this.playAge(this.state.currentAge + 1);
        }
    },

    // 显示游戏结束
    showGameOver: function(title, desc) {
        document.getElementById('game-over-title').textContent = title;
        document.getElementById('game-over-desc').textContent = desc;
        document.getElementById('game-over-modal').classList.add('active');
    },

    // 显示结局
    showEnding: function() {
        const ending = endingsData.getEnding(this.state.stats);
        
        document.getElementById('ending-title').textContent = ending.title;
        document.getElementById('ending-title').className = 'ending-title ' + ending.className;
        
        // 显示最终属性
        const statsHtml = `
            <div class="stat"><span class="stat-icon">💰</span> 财富: ${this.state.stats.wealth}</div>
            <div class="stat"><span class="stat-icon">📈</span> 事业: ${this.state.stats.career}</div>
            <div class="stat"><span class="stat-icon">❤️</span> 情感: ${this.state.stats.emotion}</div>
            <div class="stat"><span class="stat-icon">🏃</span> 健康: ${this.state.stats.health}</div>
            <div class="stat"><span class="stat-icon">🦅</span> 自由: ${this.state.stats.freedom}</div>
        `;
        document.getElementById('final-stats').innerHTML = statsHtml;
        
        document.getElementById('ending-description').textContent = ending.description;
        
        this.showScreen('ending-screen');
    },

    // 重新开始
    restart: function() {
        document.getElementById('game-over-modal').classList.remove('active');
        this.showScreen('start-screen');
        
        // 重置性别选择
        document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('selected'));
        document.getElementById('start-btn').classList.remove('active');
        document.getElementById('start-btn').disabled = true;
        this.state.gender = null;
    }
};

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    game.init();
});
