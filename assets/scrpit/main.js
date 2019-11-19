// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
var player = require('Player')
cc.Class({
    extends: cc.Component,

    properties: {
       
        jishi:{
            default:null,
            type:cc.Node
        },
        wugong_list:{
            default:null,
            type:cc.Prefab
        },
        wuqi:{
            type:cc.Label,
            default:null,
            displayName:'武器',
            tooltip:'武器文本框'
        },
        wugong:{
            type:cc.Label,
            default:null,
            displayName:'武功',
            tooltip:'武功文本框'
        },
        yifu:{
            type:cc.Label,
            default:null,
            displayName:'衣服',
            tooltip:'衣服文本框'
        },
        xiezi:{
            type:cc.Label,
            default:null,
            displayName:'鞋子',
            tooltip:'鞋子文本框'
        },
        yaodai:{
            type:cc.Label,
            default:null,
            displayName:'腰带',
            tooltip:'腰带文本框'
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
        this.label_wugong_list = cc.find('Canvas/main/node/list/view/content/label_wugong_list')
        this.main =  cc.find('Canvas/main')
        this.wgs = this.label_wugong_list.children
        // 监听武功或装备添加事件
        this.node.on('select_wugong',(event)=>{
            var msg = event.getUserData()
            cc.log(`添加武功:${msg}`)
            this.wugong.string = msg
        },this)
        this.node.on('select_wuqi',(event)=>{
            var msg = event.getUserData()
            cc.log(`添加武功:${msg}`)
            this.wuqi.string = msg
        },this)
        this.node.on('select_yifu',(event)=>{
            var msg = event.getUserData()
            cc.log(`添加武功:${msg}`)
            this.yifu.string = msg
        },this)
        this.node.on('select_xiezi',(event)=>{
            var msg = event.getUserData()
            cc.log(`添加武功:${msg}`)
            this.xiezi.string = msg
        },this)
        this.node.on('select_yaodai',(event)=>{
            var msg = event.getUserData()
            cc.log(`添加武功:${msg}`)
            this.yaodai.string = msg
        },this)
    },

    start () {
        // 初始化武功
        this.wugongInit()
        // 装备初始化
        this.zhuangbeiInit()
    },
    
    huobanInit(){
        if(player.huoban.length > 0){
            player.huoban.forEach(element => {
                this.updatePlayerStatus(element)
            });
        }
    },

    /**
     * 初始化武功信息
     */
    wugongInit(){
        for(var i = 0; i < player.JN.length; i++ ){
            if(i < this.wgs.length){
                var wg = this.wgs[i]
                var wg_name = wg.getChildByName('name')
                var wg_label = wg_name.getComponent(cc.Label)
                wg_label.string = player.JN[i].name
            }
        }
    },

    /**
     * 初始化装备信息
     */
     zhuangbeiInit(){
        var wuqi_node = cc.find('Canvas/main/node/list/view/content/laebel_zhuangbei/wuqi/wg/name')
        var yaodai_node = cc.find('Canvas/main/node/list/view/content/laebel_zhuangbei/yaodai/wg/name')
        var yifu_node = cc.find('Canvas/main/node/list/view/content/laebel_zhuangbei/yifu/wg/name')
        var xiezi_node = cc.find('Canvas/main/node/list/view/content/laebel_zhuangbei/xiezi/wg/name')
        var wuqi_label = wuqi_node.getComponent(cc.Label)
        var yaodai_label = yaodai_node.getComponent(cc.Label)
        var xiezi_label = xiezi_node.getComponent(cc.Label)
        var yifu_label = yifu_node.getComponent(cc.Label)
        if(player.WUQI != null){
            wuqi_label.string = player.WUQI.name
        }
        if(player.YIFU != null){
            yifu_label.string = player.YIFU.name
        }
        if(player.XIEZI != null){
            xiezi_label.string = player.XIEZI.name
        }
        if(player.YAODAI != null){
            yaodai_label.string = player.YAODAI.name
        }
     },

    /**
     * 进入商城
     */
    goShop(){
        this.jishi.active = true
    },

    /**
     * 进入主界面
     */
    goMain(){
        this.main.active = true
        this.jishi.active = false
    },

    // update (dt) {},
    
     /**
     * 添加武器
     */
    addWQ() {
        Global.wugong_list.title = '装备'
        Global.wugong_list.zhuangbei.part = '武器'
        this.wugonglist = cc.instantiate(this.wugong_list)
        this.wugonglist.parent = this.node
        this.wugonglist.setPosition(0,0)
        var wugonglist = this.wugonglist.getComponent('wugong_list')
        wugonglist.jn = this.wuqi
    },

    /**
     * 添加腰带
     */
    addYD() {
        Global.wugong_list.title = '装备'
        Global.wugong_list.zhuangbei.part = '腰带'
        this.wugonglist = cc.instantiate(this.wugong_list)
        this.wugonglist.parent = this.node
        this.wugonglist.setPosition(0,0)
        var wugonglist = this.wugonglist.getComponent('wugong_list')
        wugonglist.jn = this.yaodai
    },

    /**
     * 添加鞋子
     */
    addXZ() {
        cc.log(Global.wugong_list.title)
        Global.wugong_list.title = '装备'
        Global.wugong_list.zhuangbei.part = '鞋子'
        this.wugonglist = cc.instantiate(this.wugong_list)
        this.wugonglist.parent = this.node
        this.wugonglist.setPosition(0,0)
        var wugonglist = this.wugonglist.getComponent('wugong_list')
        wugonglist.jn = this.xiezi
    },

     /**
     * 添加衣服
     */
    addYF() {
        Global.wugong_list.title = '装备'
        Global.wugong_list.zhuangbei.part = '衣服'
        this.wugonglist = cc.instantiate(this.wugong_list)
        this.wugonglist.parent = this.node
        this.wugonglist.setPosition(0,0)
        var wugonglist = this.wugonglist.getComponent('wugong_list')
        wugonglist.jn = this.yifu
    },

    /**
     * 添加武功
     */
    addJN() {
        Global.wugong_list.title = '武功'
        this.wugonglist = cc.instantiate(this.wugong_list)
        this.wugonglist.parent = this.node
        this.wugonglist.setPosition(0,0)
        var wugonglist = this.wugonglist.getComponent('wugong_list')
        wugonglist.jn = this.wugong
    }
});
