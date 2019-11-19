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
        _player:null,
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
           
    },

    // // 被攻击动作
    // Attacked() {
    //     var attacked =cc.sequence(
    //         cc.moveBy(0.25, 20, 0),
    //         cc.moveBy(0.25, -20, 0),
    //         cc.moveBy(0.25, -20, 0),
    //         cc.moveBy(0.25, 20, 0),
    //     )
    //     return attacked
    // },

    ack(enemy) {
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
            this.pugong(resolve,enemy)
        })
        return p
    },

    // 普通攻击
    pugong(resolve,enemy1) {
        var item = cc.find("Canvas/dhk/scroll/view/content/item")
        var scroll = cc.find("Canvas/dhk/scroll")
        var player1Jump1 = cc.moveTo(0.5, enemy1.getPosition().x - 100, enemy1.getPosition().y)
        var player1Jump2 = cc.moveTo(0.5, this.node.getPosition());
        var view = scroll.getComponent(cc.ScrollView)
        var item1 = item.getComponent(cc.Label)
        var player = this.node.getComponent('player1')._player
        var enemy = enemy1.getComponent('enemy1')._enmey
        // var anim = this.node.getComponent(cc.Animation);
        // var liumai = this.liu.getComponent(cc.Animation);
        // liumai.active = true
        var sh = 0;
        let pg = cc.sequence(cc.callFunc(() => {
                cc.log('开始攻击敌人')
            }),
            player1Jump1,
            cc.callFunc(() => {
                // var animState = anim.getAnimationState('player_ack');
                // this.liu.active = false
                // anim.play('player_ack')
                // liumai.play('liumai')
            }),
            cc.callFunc(() => {
                // 没装备武器默认伤害为0
                if(player.WUQI == null){
                    sh = Math.round((Math.random() + 1) * (player.ack - enemy.def))
                    cc.log('没有装备武器')
                } else {
                    sh = Math.round((Math.random() + 1) * (player.ack + player.WUQI.ack - enemy.def))
                    cc.log('装备武器')
                }
                enemy.HP = enemy.HP - sh > 0 ? enemy.HP - sh : 0
                item1.string += `${player.Name}使用普攻对${enemy.Name}造成了${sh}点伤害\n`
                if (enemy.HP <= 0) {
                    this.enemy1Dead(enemy1)
                    cc.log('死了')
                }
                view.scrollToBottom(0.1)
            }),
            cc.spawn(
                cc.callFunc(() => {
                    // this.enemyAttacked()
                    // this.drop(sh)
                }),
                cc.delayTime(1),
            ),
            player1Jump2)
        this.repeat = this.node.runAction(cc.sequence(
            cc.repeat(pg, 1),
            cc.callFunc(() => {
                resolve()
            })))
    },

    enemy1Dead(enemy1) {
        enemy1.runAction(cc.fadeOut(1))
    },

    start () {

    },
    update (dt) {
        if(this._player){
            this.Name.string = this._player.Name
            this.HP.string = `${this._player.HP}`
            this.HP_Pro.progress = (this._player.HP/this._player.MAXHP).toFixed(1)
        }
    },
});
