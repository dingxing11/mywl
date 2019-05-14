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
        decribe:'30%的概率攻击攻击两次',
        wugongtype:'被动',
        Type:'武功',
        pingzhi:'甲',
        gongneng:'触发类',
        power:0,
        jl:100,
        ackNum:2,
        NOW_CD:0,
        CD:0,
        action:function(self,resolve,enemy,player){
            var player1 = cc.find("Canvas/player1")
            var repeat_num = 1
            var isDead = false
        self.player1 = player1
        var enemy1 = cc.find("Canvas/enemy1")
        var scroll = cc.find("Canvas/dhk/scroll")
        var item = cc.find("Canvas/dhk/scroll/view/content/item")
        var player1Jump1 = cc.moveTo(0.5, enemy1.getPositionX() - 100, enemy1.getPositionY())
        var player1Jump2 = cc.moveTo(0.5, player1.getPosition());
        var view = scroll.getComponent(cc.ScrollView)
        var item1 = item.getComponent(cc.Label)
        var anim = player1.getComponent(cc.Animation);
        var liumai = self.liu.getComponent(cc.Animation);
        liumai.active = true
        var sh = 0;
        let pg = cc.sequence(cc.callFunc(() => {
                cc.log('开始攻击敌人')
            }),
            player1Jump1,
            cc.callFunc(() => {
                var animState = anim.getAnimationState('player_ack');
                self.liu.active = false
                anim.play('player_ack')
                // liumai.play('liumai')
            }),
            cc.callFunc(() => {
                sh = Math.round((Math.random() + 1) * (player.ack - enemy.def))
                enemy.HP = enemy.HP - sh > 0 ? enemy.HP - sh : 0
                if(enemy.HP <= 0){
                    isDead = true
                }
                if(!isDead && repeat_num <2) {
                    repeat_num++
                } else {
                    isDead = false
                }
                item1.string += `${player.Name}使用${this.name}对敌人造成了${sh}点伤害\n`
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
                cc.delayTime(1),
            ),
            player1Jump2)
        self.repeat = player1.runAction(cc.sequence(
            cc.repeat(pg, repeat_num),
            cc.callFunc(() => {
                resolve()
            })))
        }
    },
    {
        name:'六脉神剑',
        Type:'武功',
        pingzhi:'乙',
        decribe:'出自大理段氏,强力的攻击招式',
        wugongtype:'主动',
        gongneng:'攻击类',
        power:1.4,
        MAXCD: 3,
        NOW_CD:0,
        CD: 2,
        action:function(self,resolve,enemy,player){
            var player1 = cc.find("Canvas/player1")
            var repeat_num = 1
            var isDead = false
        self.player1 = player1
        var enemy1 = cc.find("Canvas/enemy1")
        var scroll = cc.find("Canvas/dhk/scroll")
        var item = cc.find("Canvas/dhk/scroll/view/content/item")
        var player1Jump1 = cc.moveTo(0.5, enemy1.getPositionX() - 100, enemy1.getPositionY())
        var player1Jump2 = cc.moveTo(0.5, player1.getPosition());
        var view = scroll.getComponent(cc.ScrollView)
        var item1 = item.getComponent(cc.Label)
        var anim = player1.getComponent(cc.Animation);
        var liumai = self.liu.getComponent(cc.Animation);
        liumai.active = true
        // 计算攻击次数
        var sh = 0;
        sh = Math.round((Math.random() + 1) * (player.ack - enemy.def))
        if (enemy.HP - sh <= 0) {
            isDead = true
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
                var animState = anim.getAnimationState('player_ack');
                self.liu.active = false
                anim.play('player_ack')
                // liumai.play('liumai')
            }),
            cc.callFunc(() => {
                enemy.HP = enemy.HP - sh > 0 ? enemy.HP - sh : 0
                item1.string += `${player.Name}使用${this.name}对${enemy.Name}造成了${sh}点伤害\n`
                cc.log("repeat num2:"+repeat_num)
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
                cc.delayTime(1),
            ),
            player1Jump2)
        self.repeat = player1.runAction(cc.sequence(
            cc.repeat(pg, repeat_num),
            cc.callFunc(() => {
                resolve()
            })))
        }
    }
]
