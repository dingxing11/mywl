// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
var player = require("Player")
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
       
    },

    start () {
        var xm = cc.find("Canvas/main/node/label_list/xm")
        var ack = cc.find("Canvas/main/node/label_list/ack")
        var def = cc.find("Canvas/main/node/label_list/def")
        var hp = cc.find("Canvas/main/node/label_list/hp")
        var mp = cc.find("Canvas/main/node/label_list/mp")
        var exp = cc.find("Canvas/main/node/label_list/exp")
        var jj = cc.find("Canvas/main/node/label_list/jj")
        var jn = cc.find("Canvas/main/node/label_list/jn")
        var name = xm.getComponent(cc.Label)
        var ack1 = ack.getComponent(cc.Label)
        var def1 = def.getComponent(cc.Label)
        var hp1 = hp.getComponent(cc.Label)
        var mp1 = mp.getComponent(cc.Label)
        var exp1 = exp.getComponent(cc.Label)
        var jj1 = jj.getComponent(cc.Label)
        var jn1 = jn.getComponent(cc.Label)
        name.string = `姓名:${player.Name}`
        ack1.string = `攻击:${player.ack}`
        def1.string = `防御:${player.def}`
        hp1.string = `血量:${player.HP}`
        mp1.string = `内力:${player.MP}`
        exp1.string = `修为:${player.EXP}/${player.MAXEXP}`
        jj1.string = `境界:${player.LEVEL}`
        if(player.JN.length>0){
            jn1.string = '武功:'
            player.JN.forEach(row => {
                jn1.string += row.name+','
            });
            jn1.string = jn1.string.substring(0,jn1.string.length-1)
        } else {
            jn1.string = '武功:无'
        }

    },

    update (dt) {
       
    },
});
