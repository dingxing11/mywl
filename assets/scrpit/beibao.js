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
        row:'', //选中的数据
        title:'',
        item:'', //选中数据的名称
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
        this.zhujiao = player
        this.Ntab = cc.find("Canvas/main/node/beibao/tab")
        this.Ncontent = cc.find("Canvas/main/node/beibao/name/view/content")
        this.Nshuoming= cc.find("Canvas/main/node/beibao/shuoming")
        this.list = cc.find("Canvas/main/node/list")
        this.node.on('select-tab',event => {
            this.title = event.getUserData()
            this.clearItems()
            this.selectTitle(this.title)
        })
        this.node.on('select-item',event => {
            this.item = event.getUserData()
            this.selectItem(this.item)
        })
        // 返回学习武功的人物
        this.node.on('renwu_list_ok',event => {
            var player = event.getUserData()
            this.useItme(player)
        })
    },

    start () {
        
    },
    
    onEnable(){
        this.clearTitles()
        this.clearItems()
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
                this.row = row
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
        });
    },
    
    // 创建人物列表窗口
    createListWindow(){
        var window = cc.instantiate(this.list)
        window.setPosition(0,0)
        window.zIndex = 1
        window.parent = this.node
    },
    
    // 使用物品
    useItme(player=player){
        // 使用武功秘籍
        if(this.row.Type === '武功'){
            let index = true
            player.WUGONG.forEach(element =>{
                if(this.row.name === element.name){
                    cc.log('已经学会该武功')
                    index = false
                }
                cc.log(element.name)
            })
            if(index){
                player.WUGONG.push(this.row)
                let title = this.Nshuoming.getChildByName("title");
                let num = this.Nshuoming.getChildByName("num");
                let body = this.Nshuoming.getChildByName("body");
                let details = body.getChildByName("details");
                let title_label = title.getComponent(cc.Label);
                let details_label = details.getComponent(cc.Label);
                let num_label = num.getComponent(cc.Label);
                if(this.row.num > 1) {
                    this.row.num = parseInt(this.row.num) - 1
                    num_label.string = `数量:${this.row.num}`;    
                } else {
                    cc.log('数量是1销毁')
                    // this.zhujiao.BeiBao.splice(i,1)
                    title_label.string = `名称:`;
                    details_label.string = ``;
                    num_label.string = `数量:`;
                    let nodes = this.Ncontent.children;
                    nodes.forEach(element => {
                        let element_label = element.getComponent(cc.Label);
                        cc.log(element_label.string+'11')
                        cc.log(this.row.name+'12')
                        if(element_label.string == this.row.name){
                            cc.log('destroy');
                            element.destroy();
                        }
                    })
                }
            }      
        }
    }
    // update (dt) {},
});
