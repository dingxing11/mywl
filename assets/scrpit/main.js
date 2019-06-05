// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
var player = require('Player')
cc.Class({
    extends: cc.Component,

    properties: {
        jishi:{
            default:null,
            type:cc.Node
        }
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
        this.label_wugong_list = cc.find('Canvas/main/node/label_wugong_list')
        this.wgs = this.label_wugong_list.children
    },

    start () {
        for(var i = 0; i < player.JN.length; i++ ){
            if(i < this.wgs.length){
                var wg = this.wgs[i]
                var wg_name = wg.getChildByName('name')
                var wg_label = wg_name.getComponent(cc.Label)
                wg_label.string = player.JN[i].name
            }
        }
    },

    /**
     * 进入商城
     */
    goShop(){
        this.jishi.active = true
    }

    // update (dt) {},
});
