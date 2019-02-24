// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
module.exports = {
    Name:'路人甲',
    ack:5,
    def:3,
    HP:120,
    MAXHP:120,
    MP:120,
    MAXMP:120,
    EXP:20,
    BeiBao:[{
        name:'左右互搏',
        decribe:'30%的概率攻击攻击两次',
        wugongtype:'被动',
        Type:'武功',
        gongneng:'增益类',
        power:0,
        num:1,
        drop:100
    },
    {
        name:'打神石',
        decribe:'一颗会说话的石头',
        wugongtype:'被动',
        Type:'物品',
        gongneng:'增益类',
        power:0,
        num:1,
        drop:30
    },
    {
        name:'六脉神剑',
        Type:'武功',
        decribe:'出自大理段氏,强力的攻击招式',
        wugongtype:'主动',
        gongneng:'攻击类',
        power:1.4,
        num:1,
        drop:40
    }]
}