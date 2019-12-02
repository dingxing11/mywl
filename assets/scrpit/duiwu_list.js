// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var player = require('Player')
cc.Class({
    extends: cc.Component,

    properties: {
        duiwu_node:null,
        renwu:{
            default:null,
            type:cc.Node,
            displayName:'人物窗口'
        },
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
        this.team = []
        let node1 = cc.find('Canvas/main/node/duiwu_list/renwu1/Background/Label')
        let node2 = cc.find('Canvas/main/node/duiwu_list/renwu2/Background/Label')
        let node3 = cc.find('Canvas/main/node/duiwu_list/renwu3/Background/Label')
        let node4 = cc.find('Canvas/main/node/duiwu_list/renwu4/Background/Label')
        this.team[0] = node1.getComponent(cc.Label)
        this.team[1] = node2.getComponent(cc.Label)
        this.team[2] = node3.getComponent(cc.Label)
        this.team[3] = node4.getComponent(cc.Label)
    },
    /**
     * @description 创建伙伴选择窗口
     */
    addHuoBan(event, customEventData){
        this.duiwu_node = event.target
        var renwus = cc.instantiate(this.renwu)
        renwus.setPosition(0,0)
        this.node.addChild(renwus)
    },

    start () {
        this.node.on('renwu_list_ok',(event)=>{
            var renwu = event.getUserData()
            if(this.duiwu_node){
                var duiwu_id = this.duiwu_node.name.substr(-1,1)
                player.duiwu.forEach((element,index) => {
                    if(element != null&&element.ID === renwu.ID)
                        player.duiwu[index] = null
                });
                player.duiwu[duiwu_id-1] = renwu
                this.updateDuiWu()
                console.log(player.duiwu)
            }
        },this)
    },

    updateDuiWu(){
        for (let index = 0; index < player.duiwu.length; index++) {
            if(player.duiwu[index] != null)
                this.team[index].string = player.duiwu[index].Name;
            else
                this.team[index].string = '+'
        }
    }
    // update (dt) {},
});
