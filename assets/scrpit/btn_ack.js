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
    extends: cc.Component,

    properties: {
        end: {
            default: null,
            type: cc.Prefab
        },
        repeat:'',
        player1:'',
        dropHP: {
            default: null,
            type: cc.Prefab,
            displayName: '掉血量'
        },
        sum: 0,
        liu: '',
        chufa: [], //触发类武功数组
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
        player.ackNum = 1
        // 是否触发触发类武功
        var jl = Math.floor(Math.random()*100)
        cc.log(`几率${jl}`)
        this.chufa.forEach(element => {
            cc.log(element)
            if(jl <= element.jl){
                player.ackNum = element.ackNum
                cc.log(player.ackNum)
            }
        })
        var huihe = cc.find("Canvas/huihe")
        var item = cc.find("Canvas/dhk/scroll/view/content/item")
        var item1 = item.getComponent(cc.Label)
        var huihe_lable = huihe.getComponent(cc.Label)
        huihe_lable.string = `${this.sum}`
        this.node.getComponent(cc.Button).interactable = false;
        this.ackEnemy()
            .then(() => {
                return this.Attacked()
            })
            .then(() => {
                if (player.HP <= 0 || enemy.HP <= 0) {
                    if (enemy.HP <= 0) {
                        this.player1.stopAction(this.repeat);
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
                        this.vectory()
                    } else {
                        this.vectory()
                    }
                    enemy.HP = enemy.MAXHP
                    player.HP = player.MAXHP
                    player.MP = player.MAXMP
                    cc.sys.localStorage.setItem('player', JSON.stringify(player));
                    // cc.director.loadScene("main");
                    cc.log('回合结束!')
                    return Promise.reject()
                } else {
                    return this.ackPlayer()
                }
            })
            .then(() => {
                this.node.getComponent(cc.Button).interactable = true;
                if (player.HP <= 0 || enemy.HP <= 0) {
                    if (enemy.HP <= 0) {
                        this.player1.stopAction(this.repeat);
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
                        this.vectory()
                    } else {
                        this.vectory()
                    }
                    enemy.HP = enemy.MAXHP
                    player.HP = player.MAXHP
                    player.MP = player.MAXMP
                    // cc.director.loadScene("main");
                    cc.log('失败，回合结束!')
                } else {
                    this.sum = parseInt(this.sum) + 1
                    this.btnClick1()
                }
            })
    },
    ackEnemy() {
        let p = new Promise((resolve, reject) => {
            let isACK = false
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
            if(player.WUGONG.length>0){
                player.WUGONG.forEach(element => {
                    cc.log('进来武功了'+element.NOW_CD)
                    if(element.NOW_CD == 0){
                        if(!isACK){
                            if(isACK = element.action(this,resolve,enemy,player)){
                                element.NOW_CD = element.CD
                            }
                        }
                    } else {
                        element.NOW_CD -= 1
                    }
                });
            } 
            if(!isACK)
                this.pugong(resolve)
        })
        return p
    },

    enemyAttacked() {
        let p = new Promise((resolve, reject) => {
            var enemy1 = cc.find("Canvas/enemy1")
            enemy1.runAction(cc.sequence(
                this.Attacked(),
                cc.callFunc(resolve)))
        })
        return p
    },

    playerAttacked() {
        let p = new Promise((resolve, reject) => {
            var enemy1 = cc.find("Canvas/player1")
            enemy1.runAction(cc.sequence(
                cc.moveBy(0.25, -15, 0),
                cc.moveBy(0.25, 15, 0),
                cc.moveBy(0.25, 15, 0),
                cc.moveBy(0.25, -15,0),
                cc.callFunc(resolve)))
        })
        return p
    },

    vectory() {
        var Canvas = cc.find("Canvas")
        var end = cc.instantiate(this.end)
        end.setPosition(0, 0)
        end.parent = Canvas
        end.setPosition(0, 0)
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

    // 怪物掉血
    drop(hp) {
        var enemy1 = cc.find("Canvas/enemy1")
        var drop1 = cc.instantiate(this.dropHP)
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

    // 主角掉血
    playerDrop(hp) {
        var enemy1 = cc.find("Canvas/player1")
        var drop1 = cc.instantiate(this.dropHP)
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

    // 攻击猪脚
    ackPlayer() {
        let p = new Promise((resolve, reject) => {
            var player1 = cc.find("Canvas/player1")
            var enemy1 = cc.find("Canvas/enemy1")
            var scroll = cc.find("Canvas/dhk/scroll")
            var item = cc.find("Canvas/dhk/scroll/view/content/item")
            var enemy1Jump1 = cc.moveTo(0.5, player1.getPosition().x+100, enemy1.getPosition().y);
            var enemy1Jump2 = cc.moveTo(0.5, enemy1.getPosition());
            var view = scroll.getComponent(cc.ScrollView)
            var item1 = item.getComponent(cc.Label)
            cc.log('敌人X坐标' + enemy1.getPosition().x)
            enemy1.runAction(cc.sequence(cc.callFunc(() => {
                    cc.log('开始被攻击')
                }), enemy1Jump1,
                cc.callFunc(() => {
                    player.HP = (player.HP - (enemy.ack - player.def)) > 0 ? (player.HP - (enemy.ack - player.def)) : 0
                    item1.string += `${player.Name}受到了${enemy.ack-player.def}点伤害\n`
                    view.scrollToBottom(0.1)
                }),
                cc.spawn(
                    cc.callFunc(() => {
                        this.playerAttacked()
                        this.playerDrop(enemy.ack-player.def)
                    }),
                    cc.delayTime(1),
                ),
                enemy1Jump2,
                cc.callFunc(resolve)))
        })
        return p
    },

    start() {
        // 加载人物被动状态
        player.WUGONG.forEach(element => {
            element.NOW_CD = 0
            cc.log(element.wugongtype)
            cc.log(element.gongneng)
            if(element.wugongtype === '被动'){
                if(element.gongneng === '增益类'){
                    for( var name in element){
                        player[name] = parseInt(player[name]) + parseInt(element[name])
                    }
                }
                if(element.gongneng === '触发类'){
                    let temp = {
                        ackNum: element.ackNum,
                        jl: element.jl
                    }
                    this.chufa.push(temp)
                    cc.log('存了左右')
                    cc.log(this.chufa)
                }
            }
        })
        // 开始攻击
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
        this.player1 = player1
        var enemy1 = cc.find("Canvas/enemy1")
        var scroll = cc.find("Canvas/dhk/scroll")
        var item = cc.find("Canvas/dhk/scroll/view/content/item")
        var player1Jump1 = cc.moveTo(0.5, enemy1.getPosition().x - 100, enemy1.getPosition().y)
        var player1Jump2 = cc.moveTo(0.5, player1.getPosition());
        var view = scroll.getComponent(cc.ScrollView)
        var item1 = item.getComponent(cc.Label)
        var anim = player1.getComponent(cc.Animation);
        var liumai = this.liu.getComponent(cc.Animation);
        liumai.active = true
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
                item1.string += `${player.Name}使用普攻对${enemy.Name}造成了${sh}点伤害\n`
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