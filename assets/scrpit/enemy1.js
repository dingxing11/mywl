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
        State:{
            default:null,
            type:cc.Node
        },
        _BUFF:{
            default:[
            ],
            type:Array
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
            node.setPosition(0,0)
            this.State.addChild(node)
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
            var playrCmp = player1.getComponent('player1')
            // cc.log('敌人X坐标' + this.node.getPosition().x)
            this.node.runAction(cc.sequence(cc.callFunc(() => {
                    // cc.log('开始被攻击')
                }), enemy1Jump1,
                cc.callFunc(() => {
                    player.HP = (player.HP - (enemy.ack - player.def)) > 0 ? (player.HP - (enemy.ack - player.def)) : 0
                    item1.string += `${player.Name}受到了${enemy.ack-player.def}点伤害\n`
                    // 添加眩晕buff
                    // var jl = Math.floor(Math.random()*100)
                    // if(jl>=0 && jl<=100){
                    //     let isXuanYun = false
                    //     playrCmp._BUFF.forEach(element => {
                    //         if(element.name == '眩晕'){
                    //             isXuanYun = true
                    //             if(element.huihe <= 0){
                    //                 element.huihe = 1
                    //                 playrCmp.addBuffAndDebuff('xuanyun')
                    //             }
                    //         }
                    //     });
                    //     if(!isXuanYun){
                    //         playrCmp._BUFF.push({
                    //             name:'眩晕',
                    //             huihe:1,
                    //             icon:'xuanyun'
                    //         })
                    //         playrCmp.addBuffAndDebuff('xuanyun')
                    //     }
                    // }
                    if (player.HP <= 0) {
                        this.player1Dead(player1)
                        cc.log('死了')
                    }
                    view.scrollToBottom(0.1)
                }),
                cc.spawn(
                    cc.callFunc(() => {
                        this.playerAttacked(player1)
                        this.playerDrop(player1,enemy.ack-player.def)
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

    // 主角掉血动画
    playerDrop(player1,hp) {
        var drop1 = new cc.Node()
        drop1.addComponent(cc.Label)
        drop1.color = cc.Color.RED
        var drop1_label = drop1.getComponent(cc.Label)
        drop1_label.string = `-${hp}`
        drop1.parent = player1
        drop1.setPosition(0,50)
        var attacked = cc.spawn(
            cc.moveBy(1, 0, 30),
            cc.fadeOut(1)
        )
        drop1.runAction(attacked)
    },

    // 人物被攻击动画
    playerAttacked(player1) {
        let p = new Promise((resolve, reject) => {
            player1.runAction(cc.sequence(
                cc.moveBy(0.25, -15, 0),
                cc.moveBy(0.25, 15, 0),
                cc.moveBy(0.25, 15, 0),
                cc.moveBy(0.25, -15,0),
                cc.callFunc(resolve)))
        })
        return p
    },

    // 人物死亡动画
    player1Dead(player1) {
        var sp1 = player1.getChildByName('playerbg')
        // var my_sp = sp1.getComponent(sp.Skeleton)
        // my_sp.setAnimation(0,'death',false)
        player1.runAction(cc.fadeOut(1))
    },

    update (dt) {
        if(this._enmey){
            this.Name.string = this._enmey.Name
            // this.HP.string = `血量:${this._enmey.HP}`
            this.HP_Pro.progress = (this._enmey.HP/this._enmey.MAXHP).toFixed(1)
        }
    },
});
