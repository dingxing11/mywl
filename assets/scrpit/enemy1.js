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
        _enmey:null,
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

    start () {

    },
    // 攻击猪脚
    ack(player1) {
        let p = new Promise((resolve, reject) => {
            var scroll = cc.find("Canvas/dhk/scroll")
            var item = cc.find("Canvas/dhk/scroll/view/content/item")
            var enemy1Jump1 = cc.moveTo(0.5, player1.getPosition().x+100, this.node.getPosition().y);
            var enemy1Jump2 = cc.moveTo(0.5, this.node.getPosition());
            var view = scroll.getComponent(cc.ScrollView)
            var item1 = item.getComponent(cc.Label)
            var enemy = this.node.getComponent('enemy1')._enmey
            var player = player1.getComponent('player1')._player
            cc.log('敌人X坐标' + this.node.getPosition().x)
            this.node.runAction(cc.sequence(cc.callFunc(() => {
                    cc.log('开始被攻击')
                }), enemy1Jump1,
                cc.callFunc(() => {
                    player.HP = (player.HP - (enemy.ack - player.def)) > 0 ? (player.HP - (enemy.ack - player.def)) : 0
                    item1.string += `${player.Name}受到了${enemy.ack-player.def}点伤害\n`
                    view.scrollToBottom(0.1)
                }),
                cc.spawn(
                    cc.callFunc(() => {
                        // this.playerAttacked()
                        // this.playerDrop(enemy.ack-player.def)
                    }),
                    cc.delayTime(1),
                ),
                enemy1Jump2,
                cc.callFunc(()=>{
                    resolve()
                })))
        })
        return p
    },
    update (dt) {
        if(this._enmey){
            this.Name.string = this._enmey.Name
            // this.HP.string = `血量:${this._enmey.HP}`
            this.HP_Pro.progress = (this._enmey.HP/this._enmey.MAXHP).toFixed(1)
        }
    },
});
