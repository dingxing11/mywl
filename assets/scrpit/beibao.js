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
        this.node.on('select-tab',msg => {
            
        })
    },

    start () {
        this.Ntab = cc.find("Canvas/main/node/beibao/tab")
        this.Ncontent = cc.find("Canvas/main/node/beibao/name/view/content")
        this.Nshuoming= cc.find("Canvas/main/node/beibao/shuoming")
        var set = new Set()
        player.BeiBao.forEach(element => {
            set.add(element.Type)
        });
        set.forEach(element => {
            player.BeiBao.forEach(row => {
                if(element === row.Type){
                    var item = cc.instantiate(this.Nname);
                    var item_label = item.getComponent(cc.Label);
                    item_label.string = row.name;
                    this.Ncontent.addChild(item)
                }
            });
            var title = cc.instantiate(this.Ntitle);
            var title1 = title.getChildByName("tabitem")
            var title_label = title1.getComponent(cc.Label)
            title_label.string = element
            this.Ntab.addChild(title)
        })
    },

    // update (dt) {},
});
