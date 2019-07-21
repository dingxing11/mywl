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
        //row 选中整个json数据
        row:'',
        title:'',
        item:'',
        jn:{
            default:null,
            type:cc.Label,
        },
        Ntitle:{
            default:null,
            type:cc.Prefab
        },
        Nname:{
            default:null,
            type:cc.Prefab
        },
        Ntab:{
            default:null,
            type:cc.Node
        },
        Ncontent:{
            default:null,
            type:cc.Node
        },
        Nshuoming:{
            default:null,
            type:cc.Node
        }
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
         this.Ntab = cc.find("Canvas/wugong_list/tab")
        this.Ncontent = cc.find("Canvas/wugong_list/name/view/content")
        this.Nshuoming= cc.find("Canvas/wugong_list/shuoming")
        this.node.on('select-tab',event => {
            this.title = event.getUserData()
            this.clearItems()
            this.selectTitle(this.title)
        },this)
        this.node.on('select-item',event => {
            this.item = event.getUserData()
            this.selectItem(this.item)
        },this)
    },

    start () {
        var set = new Set()
        set.add(Global.wugong_list.title)
        var arr = new Array()
        set.forEach(element => {
            var title = cc.instantiate(this.Ntitle)
            var title1 = title.getChildByName("tabitem")
            var title_label = title1.getComponent(cc.Label)
            title_label.string = element
            arr.push(element)
            this.Ntab.addChild(title)
        })
        // 选择第一个title
        this.title = arr[0]
        this.clearItems()
        this.selectTitle(this.title)
    },
    
    // 清除items
    clearItems(){
        var nodes = this.Ncontent.children
        nodes.forEach(node =>{
            node.destroy()
        })
    },

    // 删除原技能
    deleteOldJN(){
        for(var key of player.JN.keys()){
            cc.log("key:%s",key)
            cc.log("value:%",player.JN[key])
            cc.log("oldvalue:%",this.jn.string)
            if(player.JN[key].name == this.jn.string){
                cc.log('进来删除了!%s', JSON.stringify(player.JN[key]))
                player.JN.splice(key,1)
                break
            }
        }
        cc.log('装备技能书:%s', JSON.stringify(player.JN))
    },

    // 列举相应title下的全部值
    selectTitle(title){
        if(this.title == '武功'){
            let items = new Array()
            var item = cc.instantiate(this.Nname);
            var item_label = item.getComponent(cc.Label);
            item_label.string = '<空>';
            items.push(item_label.string)
            this.Ncontent.addChild(item)
            player.WUGONG.forEach(row => {
                let hasJN = false
                player.JN.forEach(element =>{
                    if(element.name == row.name)
                        hasJN = true
                })
                if(!hasJN){
                    var item = cc.instantiate(this.Nname);
                    var item_label = item.getComponent(cc.Label);
                    item_label.string = row.name;
                    items.push(item_label.string)
                    this.Ncontent.addChild(item)
                }
            });
        }
        if(this.title == '装备'){
             let items = new Array()
            var item = cc.instantiate(this.Nname);
            var item_label = item.getComponent(cc.Label);
            item_label.string = '<空>';
            items.push(item_label.string)
            this.Ncontent.addChild(item)
            player.BeiBao.forEach(row => {
                if(row.Part == Global.wugong_list.zhuangbei.part){
                    this.row = row
                    var item = cc.instantiate(this.Nname);
                    var item_label = item.getComponent(cc.Label);
                    item_label.string = row.name;
                    items.push(item_label.string)
                    this.Ncontent.addChild(item)
                }
            });
        }
        // this.item = items[0]
        // this.selectItem(this.item);
    },

    // 选中item显示的详情
    selectItem(item){
        // 遍历武功
        if(item == '<空>'){
            let title = this.Nshuoming.getChildByName("title");
            let num = this.Nshuoming.getChildByName("num");
            let body = this.Nshuoming.getChildByName("body");
            let details = body.getChildByName("details");
            let title_label = title.getComponent(cc.Label);
            let details_label = details.getComponent(cc.Label);
            let num_label = num.getComponent(cc.Label);
            title_label.string = `名称`;
            details_label.string = ``;
            num_label.string = ``;
            this.row = null
            return
        }
        player.WUGONG.forEach(row => {
            if(row.name == item){
                let title = this.Nshuoming.getChildByName("title");
                let num = this.Nshuoming.getChildByName("num");
                let body = this.Nshuoming.getChildByName("body");
                let details = body.getChildByName("details");
                let title_label = title.getComponent(cc.Label);
                let details_label = details.getComponent(cc.Label);
                let num_label = num.getComponent(cc.Label);
                title_label.string = `名称:${row.name}`;
                details_label.string = `品质:${row.pingzhi}\n`;
                details_label.string += '=======================\n';
                details_label.string += row.describe;
                num_label.string = `数量:${row.num}`;
            }
            return 
        });
        // 遍历背包装备
        player.BeiBao.forEach(row => {
            if(row.name == item && row.Type == '装备'){
                this.row = row
                if(row.Part == '武器'){
                    let title = this.Nshuoming.getChildByName("title");
                    let num = this.Nshuoming.getChildByName("num");
                    let body = this.Nshuoming.getChildByName("body");
                    let details = body.getChildByName("details");
                    let title_label = title.getComponent(cc.Label);
                    let details_label = details.getComponent(cc.Label);
                    let num_label = num.getComponent(cc.Label);
                    title_label.string = `名称:${row.name}`;
                    details_label.string = `品质:${row.pingzhi}\n`;
                    details_label.string = `攻击:${row.ack}\n`;
                    details_label.string += '=======================\n';
                    details_label.string += row.describe;
                    num_label.string = `数量:${row.num}`;
                }
                if(row.Part == '腰带'){
                    let title = this.Nshuoming.getChildByName("title");
                    let num = this.Nshuoming.getChildByName("num");
                    let body = this.Nshuoming.getChildByName("body");
                    let details = body.getChildByName("details");
                    let title_label = title.getComponent(cc.Label);
                    let details_label = details.getComponent(cc.Label);
                    let num_label = num.getComponent(cc.Label);
                    title_label.string = `名称:${row.name}`;
                    details_label.string = `品质:${row.pingzhi}\n`;
                    details_label.string = `血量:${row.HP}\n`;
                    details_label.string = `防御:${row.def}\n`;
                    details_label.string += '=======================\n';
                    details_label.string += row.describe;
                    num_label.string = `数量:${row.num}`;
                }
                if(row.Part == '鞋子'){
                    let title = this.Nshuoming.getChildByName("title");
                    let num = this.Nshuoming.getChildByName("num");
                    let body = this.Nshuoming.getChildByName("body");
                    let details = body.getChildByName("details");
                    let title_label = title.getComponent(cc.Label);
                    let details_label = details.getComponent(cc.Label);
                    let num_label = num.getComponent(cc.Label);
                    title_label.string = `名称:${row.name}`;
                    details_label.string = `品质:${row.pingzhi}\n`;
                    details_label.string = `防御:${row.def}\n`;
                    details_label.string += '=======================\n';
                    details_label.string += row.describe;
                    num_label.string = `数量:${row.num}`;
                }
                if(row.Part == '衣服'){
                    let title = this.Nshuoming.getChildByName("title");
                    let num = this.Nshuoming.getChildByName("num");
                    let body = this.Nshuoming.getChildByName("body");
                    let details = body.getChildByName("details");
                    let title_label = title.getComponent(cc.Label);
                    let details_label = details.getComponent(cc.Label);
                    let num_label = num.getComponent(cc.Label);
                    title_label.string = `名称:${row.name}`;
                    details_label.string = `品质:${row.pingzhi}\n`;
                    details_label.string = `防御:${row.def}\n`;
                    details_label.string += '=======================\n';
                    details_label.string += row.describe;
                    num_label.string = `数量:${row.num}`;
                }
            }
            return
        });
    },

    /**
     * 装备武功
     */
    addWG(){
        if(this.title == '武功'){
            cc.log(this.item)
            // 删除原武功
            this.deleteOldJN()
            // 选择空项
            if(this.item == '<空>'){
                this.jn.string  = '+'
                this.node.active = false
                return
            }
            player.JN.forEach(element => {
                if(element.name == this.item)
                    return 
            })
            player.WUGONG.forEach(row => {
                if(row.name == this.item){
                    player.JN.push(row)
                }
            })
            var event = new cc.Event.EventCustom('select_wugong', true)
            event.setUserData(this.item)
            this.node.dispatchEvent(event)
            this.node.destroy()
        }
        if(this.title == '装备'){
            if(Global.wugong_list.zhuangbei.part == '武器'){
                // 选择空项
                if(this.item == '<空>'){
                    this.jn.string  = '+'
                    player.WUQI = null
                    this.node.destroy()
                    return
                }
                player.WUQI = this.row
                cc.log(`装备了:${JSON.stringify(player.WUQI)}`)
                this.addWQ()
            }
            if(Global.wugong_list.zhuangbei.part == '衣服'){
                 // 选择空项
                 if(this.item == '<空>'){
                    this.jn.string  = '+'
                    player.YIFU = null
                    this.node.destroy()
                    return
                }
                player.YIFU = this.row
                this.addYF()
            }
            if(Global.wugong_list.zhuangbei.part == '腰带'){
                 // 选择空项
                 if(this.item == '<空>'){
                    this.jn.string  = '+'
                    player.YAODAI = null
                    this.node.destroy()
                    return
                }
                player.YAODAI = this.row
                this.addYD()
            }
            if(Global.wugong_list.zhuangbei.part == '鞋子'){
                 // 选择空项
                 if(this.item == '<空>'){
                    this.jn.string  = '+'
                    player.XIEZI = null
                    this.node.destroy()
                    return
                }
                player.XIEZI = this.row
                this.addXZ()
            }
        }
    },

    /**
     * 装备武器
     */
    addWQ(){
        var event = new cc.Event.EventCustom('select_wuqi', true)
        event.setUserData(this.item)
        this.node.dispatchEvent(event)
        this.node.destroy()
    },

     /**
     * 装备衣服
     */
    addYF(){
        var event = new cc.Event.EventCustom('select_yifu', true)
        event.setUserData(this.item)
        this.node.dispatchEvent(event)
        this.node.destroy()
    },

     /**
     * 装备腰带
     */
    addYD(){
        var event = new cc.Event.EventCustom('select_yaodai', true)
        event.setUserData(this.item)
        this.node.dispatchEvent(event)
        this.node.destroy()
    },

     /**
     * 装备鞋子
     */
    addXZ(){
        var event = new cc.Event.EventCustom('select_xiezi', true)
        event.setUserData(this.item)
        this.node.dispatchEvent(event)
        this.node.destroy()
    },

    /**
     * 注释:返回键
     */
    cancel(){
        this.node.destroy()
    }
    // update (dt) {},
});
