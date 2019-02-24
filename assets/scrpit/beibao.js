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
        this.Ntab = cc.find("Canvas/main/node/beibao/tab")
        this.Ncontent = cc.find("Canvas/main/node/beibao/name/view/content")
        this.Nshuoming= cc.find("Canvas/main/node/beibao/shuoming")
        var set = new Set()
        set.add('全部');
        player.BeiBao.forEach(element => {
            set.add(element.Type)
        });
        var arr = new Array()
        set.forEach(element => {
            var title = cc.instantiate(this.Ntitle);
            var title1 = title.getChildByName("tabitem")
            var title_label = title1.getComponent(cc.Label)
            title_label.string = element
            arr.push(element)
            this.Ntab.addChild(title)
        })

        // 选择第一个title
        this.title = arr[0]
        this.selectTitle(this.title)
    },
    
    // 清除items
    clearItems(){
        var nodes = this.Ncontent.children
        nodes.forEach(node =>{
            node.destroy()
        })
    },

    // 列举相应title下的全部值
    selectTitle(title){
        let items = new Array()
        player.BeiBao.forEach(row => {
            if(row.Type === title || title === '全部'){
                var item = cc.instantiate(this.Nname);
                var item_label = item.getComponent(cc.Label);
                item_label.string = row.name;
                items.push(item_label.string)
                this.Ncontent.addChild(item)
            }
        });
        // 选中第一个item
        this.item = items[0]
        this.selectItem(this.item);
    },

    // 选中item显示的详情
    selectItem(item){
        player.BeiBao.forEach(row => {
            if(row.name === item){
                let title = this.Nshuoming.getChildByName("title");
                let num = this.Nshuoming.getChildByName("num");
                let body = this.Nshuoming.getChildByName("body");
                let details = body.getChildByName("details");
                let title_label = title.getComponent(cc.Label);
                let details_label = details.getComponent(cc.Label);
                let num_label = num.getComponent(cc.Label);
                title_label.string = `名称:${row.name}`;
                details_label.string = row.decribe;
                num_label.string = `数量:${row.num}`;
            }
        });
    }
    // update (dt) {},
});
