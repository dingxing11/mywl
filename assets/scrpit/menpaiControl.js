// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        move_node:null,
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

    // onLoad () {},

    start () {
        // this.node.on('touchend',(event)=>{
        //     if(this.move_node){
        //         this.move_node.getChildByName('ok').active = false
        //         this.move_node = null
        //         cc.log('离开了后清空move_node:',this.move_node)
        //     }
        // })
        this.node.on(cc.Node.EventType.TOUCH_MOVE,(event) => {
            if(this.move_node){
                this.move_node.setPosition(this.node.convertToNodeSpaceAR(event.touch._point))
            }
        })
        this.node.on('edit-finish',(msg)=>{
            if(msg.getUserData()){
                this.move_node = null
            }
        })
        this.node.on('select-jiaju',(msg)=>{
            if(this.move_node){
                this.move_node.getChildByName('ok').active = false
                cc.log("接收前node",this.move_node)
            }
            this.move_node = msg.getUserData()
            this.move_node.getChildByName('ok').active = true
            cc.log("接收后node",this.move_node)
        })
    },

    /**点击床 */
    onPressChuangIcon(event,custom){
        cc.loader.loadRes(`menpai/prefabs/${event.target.name}`,cc.Prefab,(err,prefab) => {
            if(err)
                cc.log(err)
            var chuang_node = cc.instantiate(prefab)
            chuang_node.parent = this.node
            chuang_node.setPosition(0,0)
        })
    }

    // update (dt) {},
});
