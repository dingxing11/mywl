// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var MoveDirection = cc.Enum({
    NONE: 0,
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4
});

cc.Class({
    extends: cc.Component,

    properties: {
        _playerPos:null,
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

    _getTilePos(posInPixel) {
        var mapSize = this.node.getContentSize();
        var tileSize = this._tilemap.getTileSize();
        var x = Math.floor(posInPixel.x / tileSize.width);
        var y = Math.floor((mapSize.height - posInPixel.y) / tileSize.height) - 1;
        return cc.v2(x, y);
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.initPlayer()
        this.initItem()
        this.node.on(cc.Node.EventType.TOUCH_END,(event) => {
            var pos = this.node.convertToNodeSpaceAR(event.touch.getLocation())
            // cc.log(`点击了${pos}${this._layerBoss.getTileGIDAt(this._getTilePos(pos))}`)
            let Xvalue = pos.x - this._player.x
            let Yvalue = pos.y - this._player.y
            cc.log(`Xvalue${Xvalue}\nYvalue${Yvalue}`)
            cc.log(`前${this._player.x},${this._player.y}`)
            if(Math.abs(Xvalue) >= Math.abs(Yvalue) && Math.abs(Xvalue) > 32){
                if(Xvalue > 0){
                    this._player.x += 32
                } else {
                    this._player.x -= 32
                }
            } else if(Math.abs(Yvalue) >= Math.abs(Xvalue) && Math.abs(Yvalue) > 32){
                if(Yvalue > 0){
                    this._player.y += 32
                } else {
                    this._player.y -= 32
                }
            }
            cc.log(`后${this._getTilePos(this._player)}`)
            if(this._layerBoss.getTileGIDAt(this._getTilePos(this._player)) && !Global.boss.dead){
                Global.player.x = this._player.x
                Global.player.y = this._player.y
                Global.player.saved = true
                Global.goScene('battle',false)
            }
            if(this._layerBaoXiangClose.getTileGIDAt(this._getTilePos(this._player))  && !Global.baoxiang.opened){
                this.showMessage('空空如也~_~',1)
                this._layerBaoXiang.node.active = true
                this._layerBaoXiangClose.node.active = false
                Global.baoxiang.opened = true
            }
            if(this._layerEnd.getTileGIDAt(this._getTilePos(this._player))){
                if(!Global.boss.dead){
                    this.showMessage('请先杀了boss后通关!',1)
                    return
                }
                Global.player.saved = false
                Global.boss.dead = false
                Global.baoxiang.opened = false
                Global.goScene('main')
            }
        })
    },

    /**
     * 初始化角色信息
     */
    initPlayer(){
        var size = this.node.getContentSize()
        this._tilemap = cc.find("Canvas/map").getComponent(cc.TiledMap)
        this._player = cc.find("Canvas/map/player")
        this._layerBoss = this._tilemap.getLayer('boss');
        this._layerBaoXiang = this._tilemap.getLayer('open_baoxiang');
        this._layerBaoXiangClose = this._tilemap.getLayer('close_baoxiang');
        this._layerBossDead = this._tilemap.getLayer('boss_dead');
        this._layerEnd = this._tilemap.getLayer('end');
        this._layerBossDead.node.active = false
        this._layerBaoXiang.node.active = false
        cc.log(this._layerBoss)
        cc.log(this._layerBaoXiang)
        cc.log(this._layerBossDead)
        if(Global.player.saved) {
            if(Global.boss.dead){
                this._layerBoss.node.active = false
                this._layerBossDead.node.active = true
            }
            if(Global.baoxiang.opened){
                this._layerBaoXiangClose.node.active = false
                this._layerBaoXiang.node.active = true
            }
            this._player.setPosition(Global.player.x,Global.player.y)
        } else {
            let group = this._tilemap.getObjectGroup('players')
            let player1 = group.getObject('player1')
            cc.log(player1)
            this._player.setPosition(player1.x,size.height - player1.y)
            cc.log(this._player)
        }
    },

    initItem(){

    },
    
    start () {

    },

    /**
     * 提示框
     * @param message 显示信息
     * @param dt 显示时长
     */
    showMessage(message,dt){
        var labelnode = new cc.Node()
        var label = labelnode.addComponent(cc.Label)
        label.string = message
        labelnode.width = 400
        labelnode.height = 400
        var root = cc.find('Canvas')
        labelnode.parent = root
        labelnode.setPosition(0,0)
        this.scheduleOnce(()=>{
            labelnode.destroy()
        },dt)
    }
    // update (dt) {},
});