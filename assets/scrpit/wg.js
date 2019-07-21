// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var player = require("Player")
cc.Class({
    extends: cc.Component,

    properties: {
        wugong_list:{
            type:cc.Prefab,
            default:null,   
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
        // this.wugonglist = cc.find("Canvas/wugong_list")
        // var clickEventHandler = new cc.Component.EventHandler();
        // clickEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点，这里就是Button2
        // clickEventHandler.component = "wg"; //这个是脚本文件名
        // clickEventHandler.handler = "addJN"; //回调函名称
        // clickEventHandler.customEventData = "click1 user data"; //用户数据

        // var button = this.node.getComponent(cc.Button); //获取cc.Button组件
        // button.clickEvents.push(clickEventHandler); //增加处理
    },

    start () {
        
    },

     /**
     * 添加武器
     */
    addWQ() {
        Global.wugong_list.title = '装备'
        Global.wugong_list.zhuangbei.part = '武器'
        var wugonglist = this.wugonglist.getComponent('wugong_list')
        var name  =this.node.getChildByName('name')
        var wg_label = name.getComponent(cc.Label) 
        wugonglist.jn = wg_label
        this.wugonglist.active = true
    },

    /**
     * 添加腰带
     */
    addYD() {
        Global.wugong_list.title = '装备'
        Global.wugong_list.zhuangbei.part = '腰带'
        var wugonglist = this.wugonglist.getComponent('wugong_list')
        var name  =this.node.getChildByName('name')
        var wg_label = name.getComponent(cc.Label) 
        wugonglist.jn = wg_label
        this.wugonglist.active = true
    },

    /**
     * 添加鞋子
     */
    addXZ() {
        cc.log(Global.wugong_list.title)
        Global.wugong_list.title = '装备'
        Global.wugong_list.zhuangbei.part = '鞋子'
        var wugonglist = this.wugonglist.getComponent('wugong_list')
        var name  =this.node.getChildByName('name')
        var wg_label = name.getComponent(cc.Label) 
        wugonglist.jn = wg_label
        this.wugonglist.active = true
    },

     /**
     * 添加护手
     */
    addYF() {
        Global.wugong_list.title = '装备'
        Global.wugong_list.zhuangbei.part = '护手'
        var wugonglist = this.wugonglist.getComponent('wugong_list')
        var name  =this.node.getChildByName('name')
        var wg_label = name.getComponent(cc.Label) 
        wugonglist.jn = wg_label
        this.wugonglist.active = true
    },

    /**
     * 添加武功
     */
    addJN() {
        Global.wugong_list.title = '武功'
        var wugonglist = this.wugonglist.getComponent('wugong_list')
        var name  =this.node.getChildByName('name')
        var wg_label = name.getComponent(cc.Label) 
        wugonglist.jn = wg_label
        this.wugonglist.active = true
    }
    // update (dt) {},
});
