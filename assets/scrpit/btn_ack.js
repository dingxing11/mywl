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
var enemy = require("Enemy")
var wugong = require("WuGong")
cc.Class({
    22gi
    extends: cc.Component,

    properties: {
        sum: 0,
        liu: ''
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

    onLoad() {
        this.sum = 1;
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点，这里就是Button2
        clickEventHandler.component = "btn_ack"; //这个是脚本文件名
        clickEventHandler.handler = "btnClick1"; //回调函名称
        clickEventHandler.customEventData = "click1 user data"; //用户数据

        var button = this.node.getComponent(cc.Button); //获取cc.Button组件
        button.clickEvents.push(clickEventHandler); //增加处理
        this.liu = cc.find("Canvas/liu")
        var liumai = this.liu.getComponent(cc.Animation);
        // let animState = liumai.play('liumai')
        // animState.wrapMode = cc.WrapMode.Loop;
        this.liu.active = false
    },
    btnClick1(event, customEventData) {
        var huihe = cc.find("Canvas/huihe")
        var item = cc.find("Canvas/dhk/scroll/view/content/item")
        var item1 = item.getComponent(cc.Label)
        var huihe_lable = huihe.getComponent(cc.Label)
        huihe_lable.string = `第${this.sum}回合`
        this.node.getComponent(cc.Button).interactable = false;
        this.ackEnemy()
            .then(() => {
                return this.Attacked()
            })
            .then(() => {
                if (player.HP <= 0 || enemy.HP <= 0) {
                    if (enemy.HP <= 0) {
                        player.EXP += enemy.EXP
                        enemy.BeiBao.forEach(element => {
                            if (Math.floor(Math.random() * 100) <= element.drop) {
                                let isHas = false
                                player.BeiBao.forEach(row => {
                                    if (row.name === element.name) {
                                        isHas = true
                                        row.num += 1
                                    }
                                })
                                if (!isHas) {
                                    player.BeiBao.push(element)
                                }
                                cc.log(`获得了1个${element.name}`)
                                item1.string += `获得了1个${element.name}\n`
                            }
                        });
                        while (player.EXP >= player.MAXEXP) {
                            player.EXP = player.EXP - player.MAXEXP
                            player.MAXHP += Math.round(Math.random() * 20 + 1)
                            player.MAXMP += Math.round(Math.random() * 20 + 1)
                            player.ack += Math.round(Math.random() * 10 + 1)
                            player.def += Math.round(Math.random() * 5 + 1)
                            player.LEVEL += 1
                            player.MAXEXP += 100
                        }
                    }
                    enemy.HP = enemy.MAXHP
                    player.HP = player.MAXHP
                    player.MP = player.MAXMP
                    cc.log('11')
                    cc.director.loadScene("main");
                    cc.log('完了')
                } else {
                    return this.ackPlayer()
                }
            })
            .then(() => {
                this.node.getComponent(cc.Button).interactable = true;
                if (player.HP <= 0 || enemy.HP <= 0) {
                    if (enemy.HP <= 0) {
                        player.EXP += enemy.EXP

                        while (player.EXP >= player.MAXEXP) {
                            player.EXP = player.EXP - player.MAXEXP
                            player.MAXHP += Math.round(Math.random() * 20 + 1)
                            player.MAXMP += Math.round(Math.random() * 20 + 1)
                            player.ack += Math.round(Math.random() * 10 + 1)
                            player.def += Math.round(Math.random() * 5 + 1)
                            player.LEVEL += 1
                            player.MAXEXP += 100
                        }
                    }
                    enemy.HP = enemy.MAXHP
                    player.HP = player.MAXHP
                    player.MP = player.MAXMP
                    cc.log('11')
                    cc.director.loadScene("main");
                    cc.log('完了')
                } else {
                    this.sum = parseInt(this.sum) + 1
                    this.btnClick1()
                }
            })
    },
    ackEnemy() {
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

    enemyAttacked() {
        let p = new Promise((resolve, reject) => {
            var Canvas = cc.find("Canvas")
            var drophp = cc.find("Canvas/enemy1/drophp")
            var end1 = cc.instantiate("end")
            end1.parent = Canvas
            end1.setPosition(0, 0)
            end1.runAction(cc.sequence(
                cc.moveBy(0.5, 0, 20),
                cc.callFunc(resolve)))
        })
        return p
    },

    enemyDropHP() {
        let p = new Promise((resolve, reject) => {
            var Canvas = cc.find("Canvas")
            var drophp = cc.find("Canvas/enemy1/drophp")
            var end = cc.instantiate(end)
            end.setPosition(0, 0)
            end.parent = Canvas
            end.runAction(cc.sequence(
                cc.moveBy(0.5, 0, 20),
                cc.callFunc(resolve)))
        })
        return p
    },

    Attacked() {
        var attacked = cc.sequence(
            cc.moveBy(0.25, 20, 0),
            cc.moveBy(0.25, -20, 0),
            cc.moveBy(0.25, -20, 0),
            cc.moveBy(0.25, 20, 0)
        )
        return attacked
    },

    // 攻击猪脚
    ackPlayer() {
        let p = new Promise((resolve, reject) => {
            var player1 = cc.find("Canvas/player1")
            var enemy1 = cc.find("Canvas/enemy1")
            var scroll = cc.find("Canvas/dhk/scroll")
            var item = cc.find("Canvas/dhk/scroll/view/content/item")
            var enemy1Jump1 = cc.moveTo(0.5, player1.getPositionX() + 100, enemy1.getPositionY());
            var enemy1Jump2 = cc.moveTo(0.5, enemy1.getPosition());
            var view = scroll.getComponent(cc.ScrollView)
            var item1 = item.getComponent(cc.Label)
            cc.log('敌人X坐标' + enemy1.getPositionX())
            enemy1.runAction(cc.sequence(cc.callFunc(() => {
                    cc.log('开始被攻击')
                }), enemy1Jump1,
                cc.callFunc(() => {
                    player.HP = (player.HP - (enemy.ack - player.def)) > 0 ? (player.HP - (enemy.ack - player.def)) : 0
                    item1.string += `${player.Name}受到了${enemy.ack-player.def}点伤害\n`
                    view.scrollToBottom(0.1)
                }),
                enemy1Jump2,
                cc.callFunc(resolve)))
        })
        return p
    },
    start() {
        this.btnClick1()
    },
    enemy1Dead() {
        var enemy1 = cc.find("Canvas/enemy1")
        enemy1.runAction(cc.fadeOut(1))
    },
    player1Dead() {
        var player1 = cc.find("Canvas/player1")
        player1.runAction(cc.fadeOut(1))
    },
    pugong(resolve) {
        var player1 = cc.find("Canvas/player1")
        var enemy1 = cc.find("Canvas/enemy1")
        var scroll = cc.find("Canvas/dhk/scroll")
        var item = cc.find("Canvas/dhk/scroll/view/content/item")
        var player1Jump1 = cc.moveTo(0.5, enemy1.getPositionX() - 100, enemy1.getPositionY())
        var player1Jump2 = cc.moveTo(0.5, player1.getPosition());
        var view = scroll.getComponent(cc.ScrollView)
        var item1 = item.getComponent(cc.Label)
        var anim = player1.getComponent(cc.Animation);
        var liumai = this.liu.getComponent(cc.Animation);
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
                let sh = Math.round((Math.random() + 1) * (player.ack - enemy.def))
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
                }),
                cc.delayTime(1),
            ),
            player1Jump2)
        player1.runAction(cc.sequence(
            cc.repeat(pg, 1),
            cc.callFunc(() => {
                resolve()
            })))
    },
    localConvertWorldPointAR(node) {
        if (node) {
            return node.convertToWorldSpaceAR(cc.v2(0, 0));
        }
        return null;
    },
    // 获取武功秘籍,
    getWuGong() {
        return wugong[Math.floor(Math.random() * wugong.length)]
    },
    update(dt) {

    },
});