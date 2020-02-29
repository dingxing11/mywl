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
var wugong = require('WuGong')
var zhuangbei = require('ZhuangBei')
var shangcheng = require('ShangCheng')
var huoban = require('HuoBan')
cc.Class({
    extends: cc.Component,

    properties: {
        main:{
            default:null,
            type:cc.Node
        },
        money:{
            default:null,
            type:cc.Label
        },
        item1:{
            default:null,
            type:cc.Prefab
        },
        last_time:{
            default:null,
            type:cc.Label
        },
        select_title:'zhuangbei',
        interval:null
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
        var self = this
        this.items = this.node.getChildByName('items')
        this.item_describe = this.node.getChildByName('item_describe')
        this.item_name = this.item_describe.getChildByName('item_name')
        this.describe = this.item_describe.getChildByName('describe')
        this.shuoming = this.describe.getChildByName('shuoming')
        var item_name = this.item_name.getComponent(cc.Label)
        var shuoming = this.shuoming.getComponent(cc.Label)
        this.node.on('sh_select_item',(event) => {
            this.select_node = event.target
            self.item = self.getItemByName(event.getUserData())
            cc.log(self.item)
            if(self.item == null)
                item_name.string = self.item.Name
            else 
                item_name.string = self.item.name||self.item.Name
            shuoming.string = self.item.describe
            // 显示模型
            cc.loader.loadRes(self.item.show,cc.SpriteFrame,(err,spriteFrame) => {
                if(err){
                    cc.log(err)
                }
                var show = self.node.getChildByName('show')
                var show_sprite = show.getComponent(cc.Sprite)
                show_sprite.spriteFrame = spriteFrame
            })
        })

        // 设置定时器 1小时刷新商品
        if(this.interval == null){
            var self = this
            this.interval = setInterval(() => {
                var endTime = new Date()
                var time = shangcheng.time - (endTime.getTime() - shangcheng.startTime.getTime())
                // 刷新商城
                if(time < 0){
                    this.item_describe.active = false
                    shangcheng.startTime = new Date()
                    self.getItems()
                    self.clearItems()
                    if(self.select_title == 'zhuangbei'){
                        self.initZhuangBei()
                    }
                    if(self.select_title == 'wugong'){
                        self.initShuJi()
                    }
                    return 
                }
                //计算出小时数
                var leave1=time%(24*3600*1000)    //计算天数后剩余的毫秒数
                var hours=Math.floor(leave1/(3600*1000))
                if(hours >= 0 && hours < 10)
                    hours = '0'+hours
                //计算相差分钟数
                var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
                var minutes=Math.floor(leave2/(60*1000))
                if(minutes >= 0 && minutes < 10)
                minutes = '0'+minutes
                //计算相差秒数
                var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
                var seconds=Math.round(leave3/1000)
                if(seconds >= 0 && seconds < 10)
                    seconds = '0'+seconds
                cc.log(`${hours}:${minutes}:${seconds}`)
                self.last_time.string = `刷新时间: ${hours}:${minutes}:${seconds}`
            },1000)
        }
    },

    start () {
       if(shangcheng.startTime == 0)
            shangcheng.startTime = new Date()
       this.money.string = player.money
       if(Global.shangcheng_first == false){
            this.getItems()
            Global.shangcheng_first = true
       }
       this.select_title = 'zhuangbei'
       this.initZhuangBei()
    },

    // updateItems(){
    //     this.clearItems()
    //     this.money.string = player.money
    //     this.initZhuangBei()
    // },

    /**
     * 进货
     */
    getItems(){
        if(zhuangbei.length <= 10){
            shangcheng.zhuangbei = []
            zhuangbei.forEach(element => {
                shangcheng.zhuangbei.push(element)
            })
        } else {
            var ranNum = 10;
            for (var i = 0; i < ranNum; i++) {
                var ran = Math.floor(Math.random() * zhuangbei.length);
                shangcheng.zhuangbei.push(zhuangbei.splice(ran, 1)[0]);
            };
        }
        cc.log(zhuangbei)
        if(wugong.length <= 10){
            shangcheng.wugong = []
            wugong.forEach(element => {
                shangcheng.wugong.push(element)
            })
        } else {
            var ranNum = 10;
            for (var i = 0; i < ranNum; i++) {
                var ran = Math.floor(Math.random() * wugong.length);
                shangcheng.wugong.push(wugong.splice(ran, 1)[0]);
            };
        }
        cc.log(wugong)
        if(huoban.length <= 10){
            shangcheng.huoban = []
            huoban.forEach(element => {
                shangcheng.huoban.push(element)
            })
        } else {
            var ranNum = 10;
            for (var i = 0; i < ranNum; i++) {
                var ran = Math.floor(Math.random() * huoban.length);
                shangcheng.huoban.push(huoban[ran]);
            };
        }
        cc.log(huoban)
    },

    onEnable(){
        this.main.active = false
        var self = this
         // 设置定时器 1小时刷新商品
         if(this.interval == null){
            this.interval = setInterval(() => {
                var endTime = new Date()
                var time = shangcheng.time - (endTime.getTime() - shangcheng.startTime.getTime())
                if(time <= 0){
                    shangcheng.startTime = endTime
                    time = 0
                    self.getItems()
                    if(self.select_title == 'zhuangbei'){
                        self.initZhuangBei()
                    }
                    if(self.select_title == 'wugong'){
                        self.initShuJi()
                    }
                }
                //计算出小时数
                var leave1=time%(24*3600*1000)    //计算天数后剩余的毫秒数
                var hours=Math.floor(leave1/(3600*1000))
                if(hours >= 0 && hours < 10)
                    hours = '0'+hours
                //计算相差分钟数
                var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
                var minutes=Math.floor(leave2/(60*1000))
                if(minutes >= 0 && minutes < 10)
                    minutes = '0'+minutes
                //计算相差秒数
                var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
                var seconds=Math.round(leave3/1000)
                if(seconds >= 0 && seconds < 10)
                    seconds = '0'+seconds
                cc.log(`${hours}:${minutes}:${seconds}`)
                self.last_time.string = `刷新时间: ${hours}:${minutes}:${seconds}`
            },1000)
        }
    },

    progressCallback(){

    },

    completeCallback(){

    },

    // title选择了装备
    selectZhuangBei(){
        this.select_title = 'zhuangbei'
        this.initZhuangBei()
    },
    
    // title选择了书籍
    selectWuGong(){
        this.select_title = 'wugong'
        this.initShuJi()
    },

    /**
     * 选择了伙伴
     */
    selectHuoBan(){
        this.select_title = 'huoban'
        this.initHuoBan()
    },

    // 初始化装备列表
    initZhuangBei(){
        var self = this
        this.clearItems()
        shangcheng.zhuangbei.forEach(element => {
            // 显示图标
            cc.loader.loadRes(element.icon,cc.SpriteFrame,(err,spriteFrame) => {
                if(err){
                    cc.log(err)
                }
                var node =cc.instantiate(self.item1)
                var name = node.getChildByName('label')
                var money = node.getChildByName('money')
                var label_num = money.getChildByName('label_num')
                var name = node.getChildByName('label')
                var icon_bian = node.getChildByName('icon_bian')
                var icon = icon_bian.getChildByName('icon')
                var name_label = name.getComponent(cc.Label)
                var moeny_label = label_num.getComponent(cc.Label)
                var sprite = icon.getComponent(cc.Sprite)
                sprite.spriteFrame= spriteFrame;
                name_label.string = element.name
                moeny_label.string = element.money
                node.parent= self.items
                node.setPosition(0, 0)  
            })
        });
         // 清空show
         var show = self.node.getChildByName('show')
         var show_sprite = show.getComponent(cc.Sprite)
         show_sprite.spriteFrame = null
    },

    // 初始化书籍列表
    initShuJi(){
        var self = this
        this.clearItems()
        shangcheng.wugong.forEach(element => {
            // 显示图标
            cc.loader.loadRes(element.icon,cc.SpriteFrame,(err,spriteFrame) => {
                if(err){
                    cc.log(err)
                }
                var node =cc.instantiate(self.item1)
                var name = node.getChildByName('label')
                var money = node.getChildByName('money')
                var label_num = money.getChildByName('label_num')
                var name = node.getChildByName('label')
                var icon_bian = node.getChildByName('icon_bian')
                var icon = icon_bian.getChildByName('icon')
                var name_label = name.getComponent(cc.Label)
                var moeny_label = label_num.getComponent(cc.Label)
                var sprite = icon.getComponent(cc.Sprite)
                sprite.spriteFrame= spriteFrame;
                name_label.string = element.name
                moeny_label.string = element.money
                node.parent= self.items
                node.setPosition(0, 0)  
            })
        });
         // 清空show
         var show = self.node.getChildByName('show')
         var show_sprite = show.getComponent(cc.Sprite)
         show_sprite.spriteFrame = null
    },

    /**初始化伙伴列表 */
    initHuoBan(){
        var self = this
        this.clearItems()
        shangcheng.huoban.forEach(element => {
            // 显示图标
            cc.loader.loadRes(element.icon,cc.SpriteFrame,(err,spriteFrame) => {
                if(err){
                    cc.log(err)
                }
                var node =cc.instantiate(self.item1)
                var name = node.getChildByName('label')
                var money = node.getChildByName('money')
                var label_num = money.getChildByName('label_num')
                var name = node.getChildByName('label')
                var icon_bian = node.getChildByName('icon_bian')
                var icon = icon_bian.getChildByName('icon')
                var name_label = name.getComponent(cc.Label)
                var moeny_label = label_num.getComponent(cc.Label)
                var sprite = icon.getComponent(cc.Sprite)
                if(element.icon_bian_color)
                    icon_bian.color = cc.color().fromHEX(element.icon_bian_color)
                sprite.spriteFrame= spriteFrame;
                name_label.string = element.Name
                moeny_label.string = element.money
                node.parent= self.items
                node.setPosition(0, 0)  
            })
        });
         // 清空show
         var show = self.node.getChildByName('show')
         var show_sprite = show.getComponent(cc.Sprite)
         show_sprite.spriteFrame = null
    },

    // 显示详细购物
    showDescribe(){
        this.item_describe.active = true
    },

    /**
     * 通过名字获取item
     * @param {string} name 
     */
    getItemByName(name){
        var item = null
        zhuangbei.forEach(element => {
            if(element.name == name)
            item = element
        })
        if(!item){
            wugong.forEach(element => {
                if(element.name == name)
                item = element
            })
        }
        if(!item){
            huoban.forEach(element => {
                if(element.Name == name)
                item = element
            })
        }
        return item
    },

    // 详细页面取消
    describeCancel(){
        this.item_describe.active = false
    },

    onDestroy(){
        if(this.interval != null){
            clearInterval(this.interval)
            this.interval = null
        }
    },

    onDisable(){
        if(this.interval != null){
            clearInterval(this.interval)
            this.interval = null
        }
    },

    // 详细页面确认
    describeOK(){
        var self = this
        if(player.money - this.item.money < 0){
            cc.log('元宝不够了！')
            return 
        } 
        player.money = player.money - this.item.money
        this.money.string = player.money
        cc.log(player.money)
        cc.log(this.select_node)
        this.select_node.destroy()
        if(this.select_title == 'huoban'){
            //商城列表中删除
            shangcheng.huoban.forEach(element => {
                if(element.Name == self.item.name){
                    var index = shangcheng.huoban.indexOf(element)
                    shangcheng.huoban.splice(index,1)
                }
            })
            //添加到人物伙伴
            player.huoban.push(this.item)
        }
        if(this.select_title == 'zhuangbei'){
            //商城列表中删除
            shangcheng.zhuangbei.forEach(element => {
                if(element.name == self.item.name){
                    var index = shangcheng.zhuangbei.indexOf(element)
                    shangcheng.zhuangbei.splice(index,1)
                }
            })
            // 背包中增加
            this.item.num = 1
            player.BeiBao.push(this.item)
        }
        if(this.select_title == 'wugong'){
            var isHas = false
            shangcheng.wugong.forEach(element => {
                if(element.name == self.item.name){
                    var index = shangcheng.wugong.indexOf(element)
                    shangcheng.wugong.splice(index,1)
                }
            })
            // 背包中增加
            player.BeiBao.forEach(row => {
                if (row.name == self.item.name) {
                    // 数量加一
                    row.num += 1
                    isHas = true
                }
            })
            // 添加item
            if(!isHas){
                this.item.num = 1
                player.BeiBao.push(this.item)
            }
        }
        // 清空show
        var show = self.node.getChildByName('show')
        var show_sprite = show.getComponent(cc.Sprite)
        show_sprite.spriteFrame = null
        cc.log(player.BeiBao)
        this.item_describe.active = false
    },

    // 清除items
    clearItems(){
        var nodes = this.items.children
        nodes.forEach( element => {
            element.destroy()
        })
    },

    // update (dt) {

    // },
});
