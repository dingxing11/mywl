// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

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
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点，这里就是Button2
        clickEventHandler.component = "items";//这个是脚本文件名
        clickEventHandler.handler = "btnClick1"; //回调函名称
        clickEventHandler.customEventData = "click1 user data"; //用户数据

        var button = this.node.getComponent(cc.Button); //获取cc.Button组件
        button.clickEvents.push(clickEventHandler); //增加处理
    },
    btnClick1 (event, customEventData) {
        var name = cc.find("Canvas/main/node")
        var dhk = cc.find("Canvas/main/dhk/scroll/view/content/item")
        var item_label = this.node.getComponent(cc.Label)
        var scroll = cc.find("Canvas/main/dhk/scroll")
        if(name){
            var xx = dhk.getComponent(cc.Label)
            var view = scroll.getComponent(cc.ScrollView)
            xx.string += `点击了${item_label.string}\n`
            view.scrollToBottom(0.1)
        }
     },
    start () {

    },

    // update (dt) {},
});
