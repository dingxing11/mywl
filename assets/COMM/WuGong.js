// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
module.exports = [
    {
        name:'左右互搏',
        decribe:'30%的概率攻击攻击两次',
        wugongtype:'被动',
        Type:'武功',
        pingzhi:'甲',
        gongneng:'触发类',
        power:0,
        jl:100,
        ackNum:2,
        CD:0
    },
    {
        name:'六脉神剑',
        Type:'武功',
        pingzhi:'乙',
        decribe:'出自大理段氏,强力的攻击招式',
        wugongtype:'主动',
        gongneng:'攻击类',
        power:1.4,
        MAXCD: 3,
        CD: 2,
        action:function(node){
            
        }
    }
]
