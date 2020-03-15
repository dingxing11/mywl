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
var duiwu = require('DuiWu')
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
        },
        restart:{
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
        cc.log("Time:")
        this._splash = this.node.getChildByName("splash")
    },

    // 重新开始
    newGame(){
        cc.sys.localStorage.removeItem('player')
        cc.game.end()
    },

    loginUser(){
        if(cc.sys.localStorage.getItem('player')){
            // 老用户
            cc.log('进来了')
            cc.log(JSON.stringify(cc.sys.localStorage))
            this.restart.active = true
            this.UserName.node.active = false
            this.LabelName.node.active = false
            this.LoginName.string = '继续游戏'
            // 队伍和玩家读取存档
            var player1 = JSON.parse(cc.sys.localStorage.getItem('player'));
            var duiwu1 = JSON.parse(cc.sys.localStorage.getItem('duiwu'));
            for(var row in player1){
                player[row]=player1[row]
            }
            for(var row in duiwu1){
                duiwu[row]=duiwu1[row]
            }
       } else {
            // 新用户
            this.restart.active = false
       }
       cc.log('获取到的用户信息:%s',JSON.stringify(player))
    },
    start () {
        this._splash = this.node.getChildByName("splash")
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
