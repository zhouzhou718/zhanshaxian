// 结局判定系统
const endingsData = {
    // 好结局
    good: {
        title: "🏆 人生赢家",
        className: "good",
        check: function(stats) {
            // 财富≥8 且 事业≥8
            return stats.wealth >= 8 && stats.career >= 8;
        },
        description: "你成功跨越了35岁的\"斩杀线\"，成为了职场精英。\n\n你有房有车有存款，职场上呼风唤雨。但当你停下脚步回顾过去，你发现牺牲了太多——健康亮起红灯，错过了孩子的成长，和家人的关系也变得疏离。\n\n这真的是你想要的人生吗？"
    },

    // 中等结局
    normal: {
        title: "⚖️ 平凡人生",
        className: "normal",
        check: function(stats) {
            // 情感≥7 且 健康≥7
            return stats.emotion >= 7 && stats.health >= 7;
        },
        description: "你没有成为所谓的\"人生赢家\"，但你拥有了最珍贵的东西——一个温馨的家庭和健康的身体。\n\n周末陪孩子在公园玩耍，晚上和爱人一起做饭，周末回老家看父母。虽然不算大富大贵，但你的生活充实而幸福。\n\n平凡也是一种成功。"
    },

    // 坏结局 - 被斩杀
    bad: {
        title: "💀 被斩杀的螺丝钉",
        className: "bad",
        check: function(stats) {
            // 事业<4 且（健康<4 或 失业状态）
            return stats.career < 4 && (stats.health < 4);
        },
        description: "35岁那天，你被裁员了。\n\n背着高额的房贷和养娃压力，你投出的简历因为\"年龄>35\"被系统自动过滤。你GAP过、降薪过、托关系找过工作，但最终只能接受现实。\n\n看着银行账单和孩子的学费，你第一次感受到了绝望。这可能是最现实、最痛的结局。"
    },

    // 备选结局：风中的自由鸟
    freedom: {
        title: "🦅 风中的自由鸟",
        className: "normal",
        check: function(stats) {
            // 自由度≥8
            return stats.freedom >= 8;
        },
        description: "你选择了与众不同的人生道路。\n\n你可能在GAP Year期间找到了新的人生方向，可能成为了一名数字游民，也可能是丁克一族。\n\n你没有按照社会的剧本生活，穷但快乐着。虽然偶尔也会为未来担忧，但你依然坚持做自己。\n\n自由是需要代价的，但你愿意承担。"
    },

    // 备选结局：财富自由
    wealthy: {
        title: "💰 财务自由",
        className: "good",
        check: function(stats) {
            // 财富≥10
            return stats.wealth >= 10;
        },
        description: "你实现了财务自由！\n\n你可能创业成功，可能抓住了某个风口，也可能继承了家里的拆迁房。总之，你不再为钱发愁。\n\n你可以买任何想买的东西，去任何想去的地方。但当你躺在私人医院的顶级病房里，看着窗外的阳光，你突然想念起那些年和同事一起吃盒饭的日子。\n\n钱能买到很多东西，但买不到健康和时光。"
    },

    // 备选结局：孤独终老
    lonely: {
        title: "💔 孤独终老",
        className: "bad",
        check: function(stats) {
            // 情感<3
            return stats.emotion < 3;
        },
        description: "你事业有成，但你发现身边空无一人。\n\n年轻时候忙于工作，忽略了家人和朋友。当你功成名就想要分享时，却发现找不到一个可以倾诉的人。\n\n逢年过节，你只能一个人对着电视发呆。你开始后悔，但为时已晚。\n\n成功有很多种，但不该以牺牲情感为代价。"
    },

    // 备选结局：健康第一
    healthy: {
        title: "💪 健康第一",
        className: "normal",
        check: function(stats) {
            // 健康≥9
            return stats.health >= 9;
        },
        description: "你选择了健康的生活方式。\n\n虽然不是大富大贵，但你有一个好身体。你每天早睡早起，坚持锻炼，吃健康的食物。\n\n50岁的你看起来比同龄人年轻10岁。你感谢自己当年的选择——没有什么比健康更重要。\n\n身体是革命的本钱，这句话一点没错。"
    },

    // 默认结局（兜底）
    default: {
        title: "📊 35岁现状",
        className: "normal",
        check: function(stats) {
            return true;
        },
        description: function(stats) {
            let desc = "你的人生走到了35岁的路口。\n\n";
            
            // 根据属性给出个性化描述
            if (stats.wealth >= 7) {
                desc += "你有一定的经济基础，生活质量不错。\n";
            } else if (stats.wealth <= 3) {
                desc += "经济压力依然很大，需要继续努力。\n";
            }
            
            if (stats.career >= 7) {
                desc += "职场发展顺利，已经成为公司骨干。\n";
            } else if (stats.career <= 3) {
                desc += "职业发展遇到瓶颈，需要重新规划。\n";
            }
            
            if (stats.emotion >= 7) {
                desc += "家庭和睦，这是你最宝贵的财富。\n";
            } else if (stats.emotion <= 3) {
                desc += "情感生活不太顺利，需要更多关注。\n";
            }
            
            if (stats.health >= 7) {
                desc += "身体状态良好，这是最大的资本。\n";
            } else if (stats.health <= 3) {
                desc += "健康已经亮起红灯，必须重视了。\n";
            }
            
            if (stats.freedom >= 7) {
                desc += "你活出了自我，不受世俗约束。\n";
            }
            
            desc += "\n无论现在处于什么状态，35岁不是终点，而是新的起点。";
            
            return desc;
        }
    },

    // 获取结局
    getEnding: function(stats) {
        // 按优先级检查
        const checks = [
            this.good,
            this.normal,
            this.bad,
            this.freedom,
            this.wealthy,
            this.lonely,
            this.healthy
        ];
        
        for (const ending of checks) {
            if (ending.check(stats)) {
                return ending;
            }
        }
        
        // 返回默认结局
        const defaultEnding = this.default;
        return {
            title: defaultEnding.title,
            className: defaultEnding.className,
            description: typeof defaultEnding.description === 'function' 
                ? defaultEnding.description(stats) 
                : defaultEnding.description
        };
    }
};
