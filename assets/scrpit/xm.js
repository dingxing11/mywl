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
        var xm = cc.find("Canvas/main/node/jiaose/label_list/xm")
        var ack = cc.find("Canvas/main/node/jiaose/label_list/ack")
        var def = cc.find("Canvas/main/node/jiaose/label_list/def")
        var hp = cc.find("Canvas/main/node/jiaose/label_list/hp")
        var mp = cc.find("Canvas/main/node/jiaose/label_list/mp")
        var exp = cc.find("Canvas/main/node/jiaose/label_list/exp")
        var jj = cc.find("Canvas/main/node/jiaose/label_list/jj")
        var jn = cc.find("Canvas/main/node/jiaose/label_list/jn")
        var money = cc.find("Canvas/main/node/jiaose/label_list/money")
        this.name = xm.getComponent(cc.Label)
        this.ack1 = ack.getComponent(cc.Label)
        this.def1 = def.getComponent(cc.Label)
        this.hp1 = hp.getComponent(cc.Label)
        this.mp1 = mp.getComponent(cc.Label)
        this.exp1 = exp.getComponent(cc.Label)
        this.jj1 = jj.getComponent(cc.Label)
        this.jn1 = jn.getComponent(cc.Label)
        this.money1 = money.getComponent(cc.Label)
    },

    start () {
        // this.updatePlayerStatus();
    },

    updatePlayerStatus(){
        this.name.string = `${player.Name}`
        this.ack1.string = `${player.ack}`
        this.def1.string = `${player.def}`
        this.hp1.string = `${player.HP}`
        this.mp1.string = `${player.MP}`
        this.exp1.string = `${player.EXP}/${player.MAXEXP}`
        this.jj1.string = `${player.LEVEL}`
        this.money1.string = `${player.money}`
        let wugong = ''
        player.WUGONG.forEach(element => {
            wugong += element.name + ','
        });
        this.jn1.string = `${wugong}`
    },
    update (dt) {
        // this.updatePlayerStatus();
    },
});
