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
        UserName:{
            default:null,
            type:cc.EditBox
        },
        LabelName:{
            default:null,
            type:cc.Label
        },
        LoginName:{
            default:null,
            type:cc.Label
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
        cc.log("Time:")
        this._splash = this.node.getChildByName("splash")
    },
    
    // 新老用户登录检测
    loginUser(){
        if(cc.sys.localStorage.length > 0){
            // 老用户
            this.UserName.node.active = false
            this.LabelName.node.active = false
            this.LoginName.string = '继续游戏'
            if(localStorage.hasOwnProperty('player')){
                var player1 = JSON.parse(cc.sys.localStorage.getItem('player'));
                for(var row in player1){
                    player[row]=player1[row]
                }
            }
       } else if(this.UserName.string.length > 0){
            // 新用户
            player.Name = this.UserName.string
       }
       cc.log('获取到的用户信息:%s',JSON.stringify(player))
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
                    cc.fadeOut(Fade),
                    cc.callFunc(()=>{
                        this._splash.active = false
                    })
                )
            } else {
                setTimeout(fn,33)
            }
        }
        this.loginUser()
        setTimeout(fn,33)
    },

    // update (dt) {},
});
