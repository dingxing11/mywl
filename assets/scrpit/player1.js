// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

var wugong = require('WuGong')
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
        State:{
            default:null,
            type:cc.Node
        },
        // 人物buff
        _BUFF:{
            default:[
            ],
            type:Array
        },
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
        },
        // spine:{
        //     default:null,
        //     type:sp.Skeleton,
        // }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    /**添加人物状态图标 */
    addBuffAndDebuff(icon){
        var node = new cc.Node()
        var spriteCmp = node.addComponent(cc.Sprite)
        cc.loader.loadRes(`buff/${icon}`,cc.SpriteFrame,(err,spriteFrame)=>{
            if(err){
                cc.log(err)
            }
            spriteCmp.spriteFrame = spriteFrame
            node.width = 20
            node.height = 20
            node.parent = this.State
            node.setPosition(0,0)
        })
    },

    /**删除人物状态图标 */
    delBuffAndDebuff(state){
        this.State.children.forEach(element => {
            cc.log(element)
            this.State.children.forEach(element => {
                if(element.getComponent(cc.Sprite).spriteFrame.name === state)
                    element.destroy()
            })
            // var labelCmp = element.getComponent(cc.Label)
            // if(labelCmp.string === state){
            //     element.destroy()
            // }
        });
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
            let isACK = false
            if(this._player.JN.length>0){
                this._player.JN.forEach(element => {
                    cc.log('进来武功了'+element.NOW_CD)
                    if(element.NOW_CD == 0){
                        if(!isACK){
                            wugong.forEach(row =>{
                                if(row.name == element.name)
                                    element.action = row.action
                            } )
                            if(isACK = element.action(this,resolve,enemy,this.node)){
                                element.NOW_CD = element.CD
                            }
                        }
                    } else {
                        element.NOW_CD -= 1
                    }
                });
            } 
            if(!isACK)
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
        var enemyCmp = enemy1.getComponent('enemy1')
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
                sh = Math.round((Math.random() + 1) * (player.ack - enemy.def))
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
                    // let Armature = this.spine.armature();
                    // Armature.animation.play('attack1',1)
                    // this.spine.setAnimation(0,'shoot',false)
                    // this.spine.addAnimation(0,'idle',true)
                    this.enemyAttacked(enemy1)
                    this.drop(enemy1,sh)
                }),
                cc.delayTime(0.4),
            ),
            player1Jump2)
        this.repeat = this.node.runAction(cc.sequence(
            cc.repeat(pg, 1),
            cc.callFunc(() => {
                resolve()
            })))
    },
    
    /**
     * 技能(远程版)
     */
    skillRemote(){
        
    },

    /**
     * 技能(近战版)
     */
    skillMelee(){

    },

    enemyAttacked(enemy1) {
        let p = new Promise((resolve, reject) => {
            enemy1.runAction(cc.sequence(
                this.Attacked(),
                cc.callFunc(resolve)))
        })
        return p
    },

     // 被攻击动作
     Attacked() {
        var attacked =cc.sequence(
            cc.moveBy(0.1, 20, 0),
            cc.moveBy(0.1, -20, 0),
            cc.moveBy(0.1, -20, 0),
            cc.moveBy(0.1, 20, 0),
        )
        return attacked
    },
    // 怪物死亡动画
    enemy1Dead(enemy1) {
        enemy1.runAction(cc.fadeOut(1))
    },

    // 掉血
    drop(enemy1,hp) {
        var drop1 = new cc.Node()
        drop1.addComponent(cc.Label)
        drop1.color = cc.Color.RED
        var drop1_label = drop1.getComponent(cc.Label)
        drop1_label.string = `-${hp}`
        drop1.parent = enemy1
        drop1.setPosition(0,50)
        var attacked = cc.spawn(
            cc.moveBy(1, 0, 30),
            cc.fadeOut(1)
        )
        drop1.runAction(attacked)
    },

    start () {

    },

    update (dt) {
        // 更新人物状态(buff和debuff)

        if(this._player){
            this.Name.string = this._player.Name
            this.HP.string = `${this._player.HP}`
            this.HP_Pro.progress = (this._player.HP/this._player.MAXHP).toFixed(1)
        }
    },
});
