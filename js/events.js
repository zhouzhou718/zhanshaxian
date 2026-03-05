// 随机事件系统
const randomEvents = {
    // 随机事件配置
    // triggerYears: 触发年份（空表示随机）
    // probability: 触发概率（0-1）
    events: [
        {
            id: "finance_fraud",
            title: "理财暴雷",
            desc: "你购买的理财产品突然暴雷，血本无归。",
            effect: { wealth: -2 },
            probability: 0.1,
            triggerYears: []  // 随机
        },
        {
            id: "lottery_win",
            title: "彩票中奖",
            desc: "幸运女神眷顾了你！买彩票中了小奖！",
            effect: { wealth: 2 },
            probability: 0.05,
            triggerYears: []
        },
        {
            id: "unexpected_pregnancy",
            title: "意外怀孕",
            desc: "避孕措施失败，新生命意外降临。（仅限女性）",
            effect: { wealth: -1, emotion: 1 },
            femaleOnly: true,
            probability: 0.08,
            triggerYears: [26, 27, 28, 29, 30]
        },
        {
            id: "housing_collapse",
            title: "房价崩塌",
            desc: "你所在城市的房价大幅下跌，资产缩水。",
            effect: { wealth: -1 },
            probability: 0.1,
            triggerYears: [24, 25, 26]
        },
        {
            id: "health_issue",
            title: "身体检查出问题",
            desc: "年度体检发现了一些问题，需要注意身体了。",
            effect: { health: -1 },
            probability: 0.12,
            triggerYears: []
        },
        {
            id: "depression",
            title: "心理抑郁",
            desc: "长期压力导致情绪低落，可能患上了抑郁症。",
            effect: { health: -1 },
            probability: 0.08,
            triggerYears: [25, 26, 27, 28, 29, 30, 31, 32, 33]
        }
    ],

    // 检查是否可以触发随机事件
    checkTrigger: function(year, gender, hasMortgage) {
        // 某些事件有特定触发条件
        return true;
    },

    // 尝试触发随机事件
    tryTrigger: function(year, gender, hasMortgage) {
        // 排除已有房贷且触发房价崩塌的情况（房价已经买了）
        const availableEvents = this.events.filter(event => {
            // 女性专属事件
            if (event.femaleOnly && gender !== 'female') return false;
            
            // 指定年份的事件
            if (event.triggerYears && event.triggerYears.length > 0) {
                if (!event.triggerYears.includes(year)) return false;
            }
            
            // 房价崩塌：如果已经有房贷，不触发
            if (event.id === 'housing_collapse' && hasMortgage) return false;
            
            return true;
        });

        // 随机选择一个事件
        for (const event of availableEvents) {
            if (Math.random() < event.probability) {
                return event;
            }
        }

        return null;
    }
};
