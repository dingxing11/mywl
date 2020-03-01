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

    onLoad () {
        this.is_edit = true //是否处于编辑状态
        this.is_block = false // 是否处于锁定状态
        var manager = cc.director.getCollisionManager()
        cc.log(manager)
        manager.enabled = true;
        manager.enabledDebugDraw = false;
        manager.enabledDrawBoundingBox = false;
        this.touchingNumber = 0;
        this.node.color = cc.Color.GREEN;
    },

    start () {
        this.node.on('touchstart',()=>{
            if(this.is_edit){
                // let ok1 = this.node.getChildByName('ok')
                // ok1.active = true
                // cc.log('怎么没出来',this.node.getChildByName('ok'))
                let select_node = new cc.Event.EventCustom('select-jiaju',true)
                select_node.setUserData(this.node)
                this.node.dispatchEvent(select_node)
            }
        })
    },

    onCollisionEnter(other) {
        cc.log('碰到了')
        this.is_block = true
        if(this.is_edit){
            this.node.color = cc.Color.RED;
        }
        this.touchingNumber ++;
    },

    onCollisionStay(){
        if(!this.is_block)
            this.is_block = true
    },

    onCollisionExit() {
        this.is_block = false
        this.touchingNumber --;
        if (this.touchingNumber === 0) {
            if(this.is_edit)
                this.node.color = cc.Color.GREEN;
        }
    },

    /**确定 */
    onOK(event){
        cc.log(event.target)
        if(this.is_block){
            this.is_block = false
            showMessage('不能放在这里!',2)
            return
        }
        this.is_edit = false
        var chuang_node = event.target.parent
        chuang_node.color = cc.Color.WHITE
        var ok_node = chuang_node.getChildByName('ok')
        ok_node.active = false
        let edit_finish = new cc.Event.EventCustom('edit-finish',true)
        edit_finish.setUserData(true)
        this.node.dispatchEvent(edit_finish)
    }
    // update (dt) {},
});
