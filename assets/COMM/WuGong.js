// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
module.exports = [
    {
        name:'左右互搏',
        describe:'30%的概率攻击攻击两次',
        wugongtype:'被动',
        Type:'武功',
        pingzhi:'甲',
        gongneng:'触发类',
        power:0,
        jl:30,
        ackNum:2,
        NOW_CD:0,
        CD:0,
        drop:100,
        num:1,
        icon:'wugong/JA001_1',
        show:'wugong/JA001_2',
        money:1000,
        action:function(self,resolve,enemy,player){
            var jl = Math.floor(Math.random()*100)
            if(jl >= this.jl || jl < 0){
                cc.log('没有进入左右互搏!'+jl)
                return false
            }
            cc.log("进入左右互搏"+jl) 
            var sleep = 1
            var repeat_num = 1
            var isDead = false
            var scroll = cc.find("Canvas/dhk/scroll")
            var item = cc.find("Canvas/dhk/scroll/view/content/item")
            var player1Jump1 = cc.moveTo(0.5, enemy.getPosition().x - 100, enemy.getPosition().y)
            var player1Jump2 = cc.moveTo(0.5, player.getPosition());
            var view = scroll.getComponent(cc.ScrollView)
            var item1 = item.getComponent(cc.Label)
            var sh = 0;
            sh = Math.round((Math.random() + 1) * (player.getComponent('player1')._player.ack - enemy.getComponent('enemy1')._enmey.def))
            if (enemy.getComponent('enemy1')._enmey.HP - sh <= 0) {
                isDead = true
                sleep = 0
            } else {
                isDead = false
            }
            if(!isDead && repeat_num <2) {
                repeat_num = 2
            }
            let pg = cc.sequence(cc.callFunc(() => {
                    cc.log("repeat num1:"+repeat_num)
                    cc.log('开始攻击敌人')
                }),
                player1Jump1,
                cc.callFunc(() => {
                    // var animState = anim.getAnimationState('player_ack');
                    // self.liu.active = false
                    // anim.play('player_ack')
                    // liumai.play('liumai')
                }),
                cc.callFunc(() => {
                        enemy.getComponent('enemy1')._enmey.HP = enemy.getComponent('enemy1')._enmey.HP - sh > 0 ? enemy.getComponent('enemy1')._enmey.HP - sh : 0
                        item1.string += `${player.getComponent('player1')._player.Name}使用${this.name}对${enemy.getComponent('enemy1')._enmey.Name}造成了${sh}点伤害\n`
                        cc.log("repeat num2:"+repeat_num)
                        if (enemy.getComponent('enemy1')._enmey.HP <= 0) {
                            player.getComponent('player1').enemy1Dead(enemy)
                        }
                        view.scrollToBottom(0.1)
                    
                }),
                cc.spawn(
                    cc.callFunc(() => {
                        player.getComponent('player1').enemyAttacked(enemy)
                        player.getComponent('player1').drop(enemy,sh)
                    }),
                    cc.delayTime(1),
                ),
                cc.callFunc(() => {
                    if (!isDead) {
                        sh = Math.round((Math.random() + 1) * (player.getComponent('player1')._player.ack - enemy.getComponent('enemy1')._enmey.def))
                        enemy.getComponent('enemy1')._enmey.HP = enemy.getComponent('enemy1')._enmey.HP - sh > 0 ? enemy.getComponent('enemy1')._enmey.HP - sh : 0
                        item1.string += `${player.getComponent('player1')._player.Name}使用${this.name}对${enemy.getComponent('enemy1')._enmey.Name}造成了${sh}点伤害\n`
                        cc.log("repeat num2:"+repeat_num)
                        if (enemy.getComponent('enemy1')._enmey.HP <= 0) {
                            player.getComponent('player1').enemy1Dead(enemy)
                        }
                        view.scrollToBottom(0.1)
                    }
                }),
                cc.spawn(
                    cc.callFunc(() => {
                        if (!isDead) {
                            player.getComponent('player1').enemyAttacked(enemy)
                            player.getComponent('player1').drop(enemy,sh)
                        }
                    }),
                    cc.delayTime(sleep),
                ),
                player1Jump2)
            self.repeat = player.runAction(cc.sequence(
                cc.repeat(pg, 1),
                cc.callFunc(() => {
                    resolve()
                })))
            return true
        }
    },
    {
        name:'六脉神剑',
        Type:'武功',
        pingzhi:'乙',
        describe:'出自大理段氏,强力的攻击招式',
        wugongtype:'主动',
        gongneng:'攻击类',
        power:3,
        MAXCD: 3,
        NOW_CD:0,
        CD: 2,
        drop:30,
        num:1,
        money:2000,
        icon:'wugong/ID070_1',
        show:'wugong/ID070_2',
        action:function(self,resolve,enemy,player){
            var player1 = cc.find("Canvas/player1")
            self.player1 = player1
            var enemy1 = cc.find("Canvas/enemy1")
            var scroll = cc.find("Canvas/dhk/scroll")
            var item = cc.find("Canvas/dhk/scroll/view/content/item")
            var player1Jump1 = cc.moveTo(0.5, enemy1.getPosition().x - 100, enemy1.getPosition().y)
            var player1Jump2 = cc.moveTo(0.5, self.liu.getPosition())
            var view = scroll.getComponent(cc.ScrollView)
            var item1 = item.getComponent(cc.Label)
            var anim = player1.getComponent(cc.Animation);
            var liumai = self.liu.getComponent(cc.Animation);
            self.liu.active = true
            self.liu.opacity = 255
            var sh = 0;
            let pg = cc.sequence(cc.callFunc(() => {
                    cc.log('开始攻击敌人')
                }),
                cc.callFunc(() => {
                    anim.play('player_ack')
                    // liumai.play('liumai')
                }),
                player1Jump1,
                cc.callFunc(() => {
                    self.liu.opacity = 0
                }),
                cc.callFunc(() => {
                    sh = Math.round((Math.random() + 1) * (player.ack*this.power - enemy.def))
                    enemy.HP = enemy.HP - sh > 0 ? enemy.HP - sh : 0
                    item1.string += `${player.Name}使用${this.name}对${enemy.Name}造成了${sh}点伤害\n`
                    if (enemy.HP <= 0) {
                        self.enemy1Dead()
                    }
                    view.scrollToBottom(0.1)
                }),
                cc.spawn(
                    cc.callFunc(() => {
                        self.enemyAttacked()
                        self.drop(sh)
                    }),
                    cc.delayTime(0),
                ),
                player1Jump2,
                cc.callFunc(() => {
                    self.liu.active = false
                }),)
            self.repeat = self.liu.runAction(cc.sequence(
                cc.repeat(pg,1),
                cc.callFunc(() => {
                    resolve()
                })))
            return true
        }
    },
    {
        name:'铁砂掌',
        Type:'武功',
        pingzhi:'丙',
        describe:'10%几率眩晕敌人,造成120%的伤害',
        wugongtype:'主动',
        gongneng:'攻击类',
        power:1.2,
        MAXCD: 3,
        NOW_CD:0,
        CD: 2,
        drop:30,
        num:1,
        money:2000,
        icon:'wugong/ID070_1',
        show:'wugong/ID070_2',
        action:function(self,resolve,enemy,player){
            var scroll = cc.find("Canvas/dhk/scroll")
            var item = cc.find("Canvas/dhk/scroll/view/content/item")
            var player1Jump1 = cc.moveTo(0.5, enemy.getPosition().x - 100, enemy.getPosition().y)
            var player1Jump2 = cc.moveTo(0.5, player.getPosition())
            var view = scroll.getComponent(cc.ScrollView)
            var item1 = item.getComponent(cc.Label)
            var player_node = player
            var enemy_node = enemy
            var player = player.getComponent('player1')._player
            var enemy = enemy.getComponent('enemy1')._enmey
            var sh = 0;
            let pg = cc.sequence(cc.callFunc(() => {
                    cc.log('开始攻击敌人')
                }),
                player1Jump1,
                cc.callFunc(() => {
                    sh = Math.round((Math.random() + 1) * (player.ack*this.power - enemy.def))
                    enemy.HP = enemy.HP - sh > 0 ? enemy.HP - sh : 0
                    item1.string += `${player.Name}使用${this.name}对${enemy.Name}造成了${sh}点伤害\n`
                     // 添加眩晕buff
                    var jl = Math.floor(Math.random()*100)
                    if(jl>=0 && jl<=80){
                        let isXuanYun = false
                        enemy_node.getComponent('enemy1')._BUFF.forEach(element => {
                            if(element.name == '眩晕'){
                                isXuanYun = true
                                if(element.huihe <= 0){
                                    element.huihe = 1
                                    enemy_node.getComponent('enemy1').addBuffAndDebuff('xuanyun')
                                }
                            }
                        });
                        if(!isXuanYun){
                            enemy_node.getComponent('enemy1')._BUFF.push({
                                name:'眩晕',
                                huihe:1,
                                icon:'xuanyun'
                            })
                            enemy_node.getComponent('enemy1').addBuffAndDebuff('xuanyun')
                            item1.string += `${player.Name}使用${this.name}对${enemy.Name}造成了眩晕\n`
                        }
                    }
                    if (enemy.HP <= 0) {
                        player_node.getComponent('player1').enemy1Dead(enemy_node)
                    }
                    view.scrollToBottom(0.1)
                }),
                cc.spawn(
                    cc.callFunc(() => {
                        player_node.getComponent('player1').enemyAttacked(enemy_node)
                        player_node.getComponent('player1').drop(enemy_node,sh)
                    }),
                    cc.delayTime(1),
                ),
                player1Jump2,
                cc.callFunc(() => {
                    // self.liu.active = false
                }),)
                self.repeat = player_node.runAction(cc.sequence(
                    cc.repeat(pg, 1),
                    cc.callFunc(() => {
                        resolve()
                    })))
                return true
        }
    }
]
