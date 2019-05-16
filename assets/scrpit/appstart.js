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
        cc.log("Time:")
        this._splash = this.node.getChildByName("splash")
    },
    

    start () {
        var Time = 3000
        var Fade = 0.5
        this._splash.active = true
        var time = Date.now()
        var fn = ()=>{
            var dt = Date.now() - time
            if(dt >= Time){
                this._splash.runAction(
                    cc.fadeOut(0.5),
                    cc.callFunc(()=>{
                        this._splash.active = false
                    })
                )
            } else {
                cc.log("Time:"+dt)
                setTimeout(fn,33)
            }
        }
        setTimeout(fn,33)
    },

    // update (dt) {},
});
