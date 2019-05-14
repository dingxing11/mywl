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
        HP:{
            default:null,
            type:cc.Label
        },
        HP_Pro:{
            default:null,
            type:cc.ProgressBar
        },
        Name:{
            default:null,
            type:cc.Label
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.Name.string = player.Name
    },

    // 被攻击动作
    Attacked() {
        var attacked =cc.sequence(
            cc.moveBy(0.25, 20, 0),
            cc.moveBy(0.25, -20, 0),
            cc.moveBy(0.25, -20, 0),
            cc.moveBy(0.25, 20, 0),
        )
        return attacked
    },

    ack() {
        let p = new Promise((resolve, reject) => {
            // anim.jumpback = function () {
            //     player1.runAction(cc.sequence(
            //     cc.callFunc(() => { 
            //         let sh = Math.round((Math.random()+1)*(player.ack-enemy.def))
            //         enemy.HP = enemy.HP -sh>0?enemy.HP - sh:0
            //         item1.string +=`敌人受到了${sh}点伤害\n`
            //         view.scrollToBottom(0.1)
            //     }),
            //     player1Jump2))
            // }.bind(this)
            this.pugong(resolve)
        })
        return p
    },

    // 普通攻击
    pugong(resolve) {
        var xhr = new XMLHttpRequest()
        var player1 = cc.find("Canvas/player1")
        this.player1 = player1
        var enemy1 = cc.find("Canvas/enemy1")
        var scroll = cc.find("Canvas/dhk/scroll")
        var item = cc.find("Canvas/dhk/scroll/view/content/item")
        var player1Jump1 = cc.moveTo(0.5, enemy1.getPositionX() - 100, enemy1.getPositionY())
        var player1Jump2 = cc.moveTo(0.5, player1.getPosition());
        var view = scroll.getComponent(cc.ScrollView)
        var item1 = item.getComponent(cc.Label)
        var anim = player1.getComponent(cc.Animation);
        var liumai = this.liu.getComponent(cc.Animation);
        var sh = 0;
        let pg = cc.sequence(cc.callFunc(() => {
                cc.log('开始攻击敌人')
            }),
            player1Jump1,
            cc.callFunc(() => {
                var animState = anim.getAnimationState('player_ack');
                this.liu.active = false
                anim.play('player_ack')
                // liumai.play('liumai')
            }),
            cc.callFunc(() => {
                sh = Math.round((Math.random() + 1) * (player.ack - enemy.def))
                enemy.HP = enemy.HP - sh > 0 ? enemy.HP - sh : 0
                item1.string += `${player.Name}对敌人造成了${sh}点伤害\n`
                if (enemy.HP <= 0) {
                    this.enemy1Dead()
                }
                view.scrollToBottom(0.1)
            }),
            cc.spawn(
                cc.callFunc(() => {
                    this.enemyAttacked()
                    this.drop(sh)
                }),
                cc.delayTime(1),
            ),
            player1Jump2)
        this.repeat = player1.runAction(cc.sequence(
            cc.repeat(pg, player.ackNum),
            cc.callFunc(() => {
                resolve()
            })))
    },

    start () {

    },
    update (dt) {
        this.HP.string = `${player.HP}`
        this.HP_Pro.progress = (player.HP/player.MAXHP).toFixed(1)
    },
});
