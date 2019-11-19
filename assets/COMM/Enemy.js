// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
var wugong = require('WuGong')
module.exports = [{
    Name: '狼人',
    ack: 20,
    def: 3,
    HP: 120,
    MAXHP: 120,
    MP: 120,
    MAXMP: 120,
    EXP: 20,
    ackNum: [],
    BeiBao: [wugong[0],
        {
            name: '打神石',
            decribe: '一颗会说话的石头',
            pingzhi: '丁',
            wugongtype: '被动',
            Type: '物品',
            gongneng: '增益类',
            power: 0,
            num: 1,
            drop: 30
        },
        wugong[1]
    ]
},{
    Name: '浪人王',
    ack: 20,
    def: 3,
    HP: 120,
    MAXHP: 120,
    MP: 120,
    MAXMP: 120,
    EXP: 20,
    ackNum: [],
    BeiBao: [wugong[0],
        {
            name: '打神石',
            decribe: '一颗会说话的石头',
            pingzhi: '丁',
            wugongtype: '被动',
            Type: '物品',
            gongneng: '增益类',
            power: 0,
            num: 1,
            drop: 30
        },
        wugong[1]
    ]
},{
    Name: '浪人',
    ack: 20,
    def: 3,
    HP: 120,
    MAXHP: 120,
    MP: 120,
    MAXMP: 120,
    EXP: 20,
    ackNum: [],
    BeiBao: [wugong[0],
        {
            name: '打神石',
            decribe: '一颗会说话的石头',
            pingzhi: '丁',
            wugongtype: '被动',
            Type: '物品',
            gongneng: '增益类',
            power: 0,
            num: 1,
            drop: 30
        },
        wugong[1]
    ]
}]