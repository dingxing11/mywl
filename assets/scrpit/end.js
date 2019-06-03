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
        drop:{
            default:null,
            type:cc.Prefab
        },
        drops:[]
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
        cc.log('掉落的物品:%s',this.drops)
        this.drops.forEach(item => {
            var items = this.node.getChildByName("items")
            var drop = cc.instantiate(this.drop)
            var drop_label = drop.getComponent(cc.Label)
            drop_label.string = `${item.name}x${item.num}`
            items.addChild(drop)
        });
    },
    btnClick1 (event, customEventData) {
        Global.goScene("main")
        cc.log('场景跳转了')
        var end = cc.find("Canvas/end")
        end.destroy()
    },

    start () {

    },

    // update (dt) {},
});
