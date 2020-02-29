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
cc.Class({
    extends: cc.Component,

    properties: {
        title:'',
        item:'',
        Nname:{
            default:null,
            type:cc.Prefab
        },
        Ncontent:{
            default:null,
            type:cc.Node
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
        // 人物属性
        this.Nshuxing = this.node.getChildByName('shuxing')
        this.N_name = this.Nshuxing.getChildByName('name')
        this.Nview = this.N_name.getChildByName('view')
        this.Ncontent = this.Nview.getChildByName('content')
        
        this.view = this.node.getChildByName("view")
        this.content = this.view.getChildByName("content")
        this.label_list = this.content.getChildByName("label_list")
        var xm = this.label_list.getChildByName("xm")
        var ack = this.label_list.getChildByName("ack")
        var def = this.label_list.getChildByName("def")
        var hp = this.label_list.getChildByName("hp")
        var mp = this.label_list.getChildByName("mp")
        var exp = this.label_list.getChildByName("exp")
        var jj = this.label_list.getChildByName("jj")
        var jn = this.label_list.getChildByName("jn")
        var money = this.label_list.getChildByName("money")
        // 技能资源
        this.jn_list1 = this.content.getChildByName("label_wugong_list")
        // 装备资源
        this.laebel_zhuangbei = this.content.getChildByName("laebel_zhuangbei")
        this.wuqi = this.laebel_zhuangbei.getChildByName("wuqi")
        this.wq_wg = this.wuqi.getChildByName("wg")
        this.wq_name = this.wq_wg.getChildByName("name")

        this.yifu = this.laebel_zhuangbei.getChildByName("yifu")
        this.yf_wg = this.yifu.getChildByName("wg")
        this.yf_name = this.yf_wg.getChildByName("name")

        this.yaodai = this.laebel_zhuangbei.getChildByName("yaodai")
        this.yd_wg = this.yaodai.getChildByName("wg")
        this.yd_name = this.yd_wg.getChildByName("name")
        this.zb_wuqi = this.wq_name
        this.zb_yifu = this.yf_name
        // this.zb_xiezi = cc.find("Canvas/main/node/list/view/content/laebel_zhuangbei/xiezi/wg/name")
        this.zb_yaodai = this.yd_name

        this.name = xm.getComponent(cc.Label)
        this.ack1 = ack.getComponent(cc.Label)
        this.def1 = def.getComponent(cc.Label)
        this.hp1 = hp.getComponent(cc.Label)
        this.mp1 = mp.getComponent(cc.Label)
        this.exp1 = exp.getComponent(cc.Label)
        this.jj1 = jj.getComponent(cc.Label)
        this.jn1 = jn.getComponent(cc.Label)
        this.money1 = money.getComponent(cc.Label)
        this.isSelect = false
        this.jn_list = []
    },

    start () {
        this.node.on('select-renwu',event => {
            this.item = event.getUserData()
            this.selectItem(this.item)
        })
    },
    
    updatePlayerStatus(person){
        this.name.string = `姓名:${person.Name}`
        this.ack1.string = `攻击:${person.ack}`
        this.def1.string = `防御:${person.def}`
        this.hp1.string = `血量:${person.MAXHP}`
        this.mp1.string = `内力:${person.MAXMP}`
        this.exp1.string = `修为:${person.EXP}/${person.MAXEXP}`
        this.jj1.string = `境界:${person.LEVEL}`
        this.money1.string = `元宝:${person.money}`
        let wugong = ''
        person.WUGONG.forEach(element => {
            wugong += element.name + ','
        });
        this.jn1.string = `武功:${wugong}`
        this.updateJN()
        this.updateZB()
    },

    onEnable(){
        this.clearItems()
        this.ItemList()
    },
    
     // 清除titles
    clearTitles(){
        var nodes = this.Ntab.children
        nodes.forEach(node =>{
            node.destroy()
        })
    },

    // 清除items
    clearItems(){
        var nodes = this.Ncontent.children
        nodes.forEach(node =>{
            node.destroy()
        })
    },

    // 列举相应title下的全部值
    ItemList(){
        let items = new Array()
        var item = cc.instantiate(this.Nname);
        var item_label = item.getComponent(cc.Label);
        item_label.string = player.Name;
        items.push(item_label.string)
        this.Ncontent.addChild(item)
        player.huoban.forEach(row => {
            var item = cc.instantiate(this.Nname);
            var item_label = item.getComponent(cc.Label);
            item_label.string = row.Name;
            items.push(item_label.string)
            this.Ncontent.addChild(item)
        });
        // 选中第一个item
        this.item = items[0]
        this.selectItem(this.item);
    },

    // 选中item显示的详情
    selectItem(item){
        this.isSelect = true
        if(player.Name === item){
            Global.renwu_list.player = this.renwu = player
            return
        }
        player.huoban.forEach(row => {
            if(row.Name === item){
                console.log(row)
                Global.renwu_list.player = this.renwu = row
            }
        });
    },

    /**
     * @description 确认按钮
     */
    btn_ok(){
        var event = new cc.Event.EventCustom('renwu_list_ok',true)
        event.setUserData(this.renwu)
        this.node.dispatchEvent(event)
        this.node.destroy()
    },

    // 更新技能显示
    updateJN(){
        this.jn_list = []
        var jn_list = this.jn_list1.children
        jn_list.forEach(element => {
            if(element.name === 'wg')
                this.jn_list.push(element)
        });
        this.jn_list.forEach((element,index) => {
            var jn = element.children[0]
            var jn_label = jn.getComponent(cc.Label)
            if(this.renwu.JN[index]){
                jn_label.string = this.renwu.JN[index].name
            } else {
                jn_label.string = '+'
            }
        });
    },

    // 更新装备显示
    updateZB(){
        if(this.renwu.WUQI){
            this.zb_wuqi.getComponent(cc.Label).string = this.renwu.WUQI.name
        } else 
            this.zb_wuqi.getComponent(cc.Label).string = '+'
        // if(this.renwu.XIEZI){
        //     this.zb_xiezi.getComponent(cc.Label).string = this.renwu.XIEZI.name
        // } else 
        //     this.zb_xiezi.getComponent(cc.Label).string = '+'
        if(this.renwu.YAODAI){
            this.zb_yaodai.getComponent(cc.Label).string = this.renwu.YAODAI.name
        } else 
            this.zb_yaodai.getComponent(cc.Label).string = '+'
        if(this.renwu.YIFU){
            this.zb_yifu.getComponent(cc.Label).string = this.renwu.YIFU.name
        } else 
            this.zb_yifu.getComponent(cc.Label).string = '+'
    },

    // 更新显示信息
    update (dt) {
        if(this.isSelect){
            this.isSelect = false
            this.updatePlayerStatus(this.renwu)
        }
    },
});
