// 14年剧情数据
const storyData = {
    22: {
        title: "十字路口",
        content: "史上最难就业季，你手头有几个不同的Offer。面对人生的第一道分水岭，你将如何选择？",
        yearNews: "2024年：史上最难就业季开启，应届生数量创历史新高",
        choices: [
            {
                text: "互联网大厂\"996\"",
                effect: { wealth: 1, career: 2, health: -1 },
                desc: "高起薪，工作强度大"
            },
            {
                text: "追随热爱加入初创公司",
                effect: { wealth: -1, career: 1, freedom: 2 },
                desc: "画大饼，风险极高"
            },
            {
                text: "回老家考公/国企",
                effect: { wealth: 0, health: 1, emotion: 1 },
                desc: "稳定，但发展缓慢"
            }
        ]
    },
    23: {
        title: "职场毒打",
        content: "工作一年了，你的直属领导开始给你甩锅，甚至强迫你参与无意义的无效加班和酒局。",
        yearNews: "2025年：职场PUA成为社会热点话题",
        choices: [
            {
                text: "忍气吞声，学做\"聪明人\"",
                effect: { career: 2, health: -1, freedom: -1 },
                desc: "变成自己讨厌的人"
            },
            {
                text: "刚正面，准点下班，整顿职场",
                effect: { freedom: 2, health: 1, career: -1 },
                desc: "可能被边缘化"
            }
        ]
    },
    // 24岁：上车焦虑（买房）
    // 如果22岁选C，回老家，23岁被跳过，直接24岁
    24: {
        title: "上车焦虑",
        content: "一线城市房价波动，父母表示可以掏空半生积蓄帮你凑个首付\"安家\"。",
        yearNews: "2026年：房地产调控持续深入，房价出现松动",
        choices: [
            {
                text: "咬牙买房，背上30年房贷",
                effect: { wealth: 2, career: 0, freedom: -2 },
                desc: "财富总值↑但现金流濒危，事业必须求稳",
                lockTag: "mortgage"
            },
            {
                text: "拒绝父母，选择租房",
                effect: { wealth: 1, freedom: 2, emotion: -1 },
                desc: "自由度↑，但面临相亲/户口压力"
            }
        ]
    },
    // 25岁：风口之变
    25: {
        title: "风口之变",
        content: "AI技术爆发，你所在的行业开始受到冲击，出现自动化替代趋势。",
        yearNews: "2027年：AI技术全面爆发，大量基础岗位被替代",
        choices: [
            {
                text: "逃离舒适区，降薪跨行去AI相关领域",
                effect: { wealth: -1, career: 2 },
                desc: "财富暂时↓，事业潜力↑↑"
            },
            {
                text: "留在原地，努力考证/提升不可替代性",
                effect: { career: 0, health: -1 },
                desc: "健康↓，事业维持现状"
            }
        ]
    },
    // 26岁：围城内外
    26: {
        title: "围城内外",
        content: "参加了同龄人的婚礼，逢年过节遭遇长辈的极限催婚。",
        yearNews: "2028年：单身经济兴起，催婚压力持续增大",
        choices: [
            {
                text: "妥协相亲，找个\"条件合适\"的人搭伙过日子",
                effect: { emotion: 1, wealth: 1, freedom: -1 },
                desc: "情感稳定，财富抗风险↑"
            },
            {
                text: "坚决单身，享受孤独",
                effect: { freedom: 2, emotion: -2 },
                desc: "自由度↑↑，逢年过节情感压力↓↓"
            },
            {
                text: "为了爱情与家庭条件差距极大的伴侣抗争",
                effect: { emotion: 2, wealth: -2 },
                desc: "情感↑↑，财富/精力严重损耗↓↓"
            }
        ]
    },
    // 27岁：凛冬将至
    // 24岁选A（买房）者，Gap Year选项灰色锁定
    27: {
        title: "凛冬将至",
        content: "经济周期下行，公司结构调整，你光荣地成为了\"向社会输送的人才\"。",
        yearNews: "2029年：全球经济衰退，大厂裁员潮来袭",
        choices: [
            {
                text: "拿赔偿金直接Gap Year，去大理/新疆放空",
                effect: { health: 2, freedom: 2, wealth: 0, career: 0 },
                desc: "健康自由度↑↑，财富事业停滞",
                requireNot: "mortgage"
            },
            {
                text: "极度焦虑，无缝衔接降薪去一家更卷的公司",
                effect: { health: -2, emotion: -2, wealth: 0, career: -1 },
                desc: "健康情感↓↓，财富维持，事业↓"
            }
        ]
    },
    // 28岁：生命重量
    // 女性额外扣健康和事业
    28: {
        title: "生命重量",
        content: "政策大力鼓励生育，但高昂的教育和居住成本让你犹豫。",
        yearNews: "2030年：鼓励生育新政出台，但年轻人生育意愿持续走低",
        choices: [
            {
                text: "顺应社会时钟，生孩子",
                effect: { emotion: 2, wealth: -2, career: -2 },
                femaleEffect: { health: -1 },
                desc: "情感↑↑，财富事业全面崩盘"
            },
            {
                text: "丁克到底，养只猫狗",
                effect: { wealth: 1, freedom: 1, emotion: -1 },
                desc: "财富自由度↑，面临父母断绝关系威胁"
            }
        ]
    },
    // 29岁：顶梁柱坍塌
    29: {
        title: "顶梁柱的坍塌",
        content: "父母突发重病，ICU每天都在烧钱，医保报销外还需大笔自费。",
        yearNews: "2031年：医疗费用持续上涨，因病致贫案例频发",
        choices: [
            {
                text: "掏空积蓄，甚至借网贷全力救治",
                effect: { wealth: -3, emotion: 1, career: -1 },
                desc: "财富濒临破产↓↓↓，情感↑，事业受牵连"
            },
            {
                text: "理性选择保守治疗，回到工作岗位",
                effect: { wealth: 0, emotion: -2 },
                desc: "财富保住，情感/良心长期受到折磨↓↓"
            }
        ]
    },
    // 30岁：逃离北上广
    30: {
        title: "三十而立",
        content: "\"三十而立\"的生日夜，看着出租屋或高昂的房贷，思考去留。",
        yearNews: "2032年：\"逃离北上广\"成趋势，新一线城市崛起",
        choices: [
            {
                text: "降维打击，回新一线/老家过安稳日子",
                effect: { health: 1, emotion: 1, career: -2 },
                desc: "健康情感↑，事业断崖式下跌"
            },
            {
                text: "留在北上广深继续死磕",
                effect: { career: 1, wealth: 1, health: -1, emotion: -1 },
                desc: "事业财富潜力保留，健康情感持续高压"
            }
        ]
    },
    // 31岁：副业刚需
    31: {
        title: "副业刚需",
        content: "主业收入见顶，身边人都在搞自媒体/副业。",
        yearNews: "2033年：全员自媒体时代来临，副业成标配",
        choices: [
            {
                text: "下班后爆肝做自媒体/兼职",
                effect: { wealth: 2, health: -2 },
                desc: "财富↑，健康↓↓，有猝死风险",
                warning: "健康"
            },
            {
                text: "拒绝内卷，下班后专注生活/锻炼",
                effect: { health: 1, emotion: 1, wealth: -1 },
                desc: "健康情感↑，财富焦虑增加"
            }
        ]
    },
    // 32岁：背水一战
    // 掷骰子判定
    32: {
        title: "背水一战",
        content: "前同事拉你合伙创业，可能是一次阶层跃迁的机会，也可能万劫不复。",
        yearNews: "2034年：创业潮再次兴起，但成功率依然很低",
        choices: [
            {
                text: "破釜沉舟，抵押资产创业",
                effect: { type: "dice", success: { career: 3, wealth: 3 }, fail: { career: -3, wealth: -3 } },
                desc: "50%成功：事业财富+3；50%失败：事业财富-3",
                isDice: true
            },
            {
                text: "拒绝诱惑，在公司里熬资历",
                effect: { wealth: 1, freedom: 0, career: 0 },
                desc: "财富平稳，自由度/成就感彻底归零"
            }
        ]
    },
    // 33岁：夹心饼干
    33: {
        title: "夹心饼干",
        content: "精力严重透支，必须在工作表现与家庭陪伴中做出取舍。",
        yearNews: "2035年：职场35岁现象引发广泛讨论",
        choices: [
            {
                text: "倾向工作，拿命换钱",
                effect: { wealth: 2, emotion: -2 },
                desc: "财富↑，家庭关系破裂/伴侣抑郁/孩子疏远↓↓"
            },
            {
                text: "倾向家庭，退居二线",
                effect: { emotion: 2, career: -2 },
                desc: "情感↑，彻底失去晋升可能，被更年轻的人取代↓"
            }
        ]
    },
    // 34岁：向内求索
    // 高难度判定
    34: {
        title: "向内求索",
        content: "距离35岁\"斩杀线\"只剩一年。体力明显跟不上20多岁的年轻人。",
        yearNews: "2036年：人生半坡，35岁焦虑蔓延整个职场",
        choices: [
            {
                text: "接受平凡，与自己和解",
                effect: { health: 1 },
                desc: "全属性趋于稳定，健康↑"
            },
            {
                text: "不甘平庸，尝试最后一次跳槽/搏杀",
                effect: { type: "hardDice", success: { career: 2, wealth: 2 }, fail: { career: -1, wealth: -1 } },
                desc: "50%成功：事业财富+2；50%失败：事业财富-1",
                isHardDice: true
            }
        ]
    },
    // 35岁：结局结算（无选项）
    35: {
        title: "终局判定",
        content: "恭喜你，成功跨越了22-35岁的人生赛道。",
        yearNews: "2037年：回顾这十四年，你经历了...",
        choices: []
    }
};

// 22岁选C（回老家）的分支：跳过23岁
// 这个逻辑在game.js中处理
