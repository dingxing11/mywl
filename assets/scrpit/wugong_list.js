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

    onEnable(){
        this.title = '武功'
        this.clearItems()
        this.selectTitle(this.title)
    },

    start () {
        cc.log('enable')
        var set = new Set()
        set.add('武功')
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
        // 选中第一个item
        // this.item = items[0]
        // this.selectItem(this.item);
    },

    // 选中item显示的详情
    selectItem(item){
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
                details_label.string += row.decribe;
                num_label.string = `数量:${row.num}`;
            }
        });
    },

    /**
     * 装备武功
     */
    addWG(){
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
        this.jn.string = this.item
        this.node.active = false
        cc.log('装备技能:%s',player.JN)
    },

    /**
     * 注释:返回键
     */
    cancel(){
        this.node.active = false
    }
    // update (dt) {},
});
