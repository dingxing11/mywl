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
module.exports = {
    // 人物基础属性
    ID:1,
    Name:'丁新',
    money:20000,
    ack:20,
    def:3,
    HP:100,
    MAXHP:100,
    MP:100,
    MAXMP:100,
    JN:[],
    WUGONG:[],
    WUQI:null,
    HUSHOU:null,
    YAODAI:null,
    XIEZI:null,
    EXP:10,
    MAXEXP:100,
    LEVEL:1,
    BeiBao:[],

    //人物在地图中用
    isMap:false,
    xPosition:0,
    yPosition:0,
    // 队伍
    duiwu:[null,null,null,null],
    duiwu_pos:[cc.v2(-171,81),cc.v2(-203,0),cc.v2(-331,80),cc.v2(-371,0)],
    //伙伴
    huoban:[
        {
            ID:2,
            Name:'李逍遥',
            ack:20,
            def:3,
            tmp_ack:0,
            tmp_def:0,
            tmp_HP:0,
            tmp_MP:0,
            HP:100,
            MAXHP:100,
            MP:100,
            MAXMP:100,
            JN:[wugong[0]],
            WUGONG:[wugong[0]],
            WUQI:null,
            HUSHOU:null,
            YAODAI:null,
            XIEZI:null,
            EXP:10,
            MAXEXP:100,
            LEVEL:1,
        },
        {
            ID:3,
            Name:'李白',
            ack:20,
            def:3,
            HP:100,
            MAXHP:100,
            MP:100,
            MAXMP:100,
            JN:[],
            WUGONG:[],
            WUQI:null,
            HUSHOU:null,
            YAODAI:null,
            XIEZI:null,
            EXP:10,
            MAXEXP:100,
            LEVEL:1,
            tmp_ack:0,
            tmp_def:0,
            tmp_HP:0,
            tmp_MP:0,
        },
        {
            ID:4,
            Name:'独孤求败',
            ack:20,
            def:3,
            HP:100,
            MAXHP:100,
            MP:100,
            MAXMP:100,
            JN:[],
            WUGONG:[],
            WUQI:null,
            HUSHOU:null,
            YAODAI:null,
            XIEZI:null,
            EXP:10,
            MAXEXP:100,
            LEVEL:1,
            tmp_ack:0,
            tmp_def:0,
            tmp_HP:0,
            tmp_MP:0,
        },
    ]
}