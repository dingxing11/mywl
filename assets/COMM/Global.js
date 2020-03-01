var wugong = require('WuGong')
window.Global = {
    // wugong_list窗口装备公共变量
    wugong_list:{
        title:'',
        zhuangbei:{
            part:''  //部位
        },
    },
    // duiwu_list窗口装备公共变量
    renwu_list:{
        player:null // 选中的人物属性
    },

    player:{
        saved:false
    },
    boss:{
        dead:false
    },
    baoxiang:{
        opened:false
    },
    sceneName:'',
    shangcheng_first:false,
    goScene(sceneName,isload = true){
        if(isload){
            this.sceneName = sceneName
            cc.director.loadScene("load")
        } else {
            cc.director.loadScene(sceneName)
        }
    },
    // 人物状态集合
    BufferAndDefbuff:[{
        name:'眩晕',
        huihe:1
    },{
        name:'中毒',
        huihe:3
    },{
        name:'缴械',
        huihe:1
    }]
}

window.getWG = (name) => {
    wugong.forEach(element => {
        if(element.name == name){
            return element
        }
    });
    return null
}
/**
* 提示框
* @param message 显示信息
* @param dt 显示时长
*/
window.showMessage = (message,dt)=>{
   var labelnode = new cc.Node()
   var label = labelnode.addComponent(cc.Label)
   label.string = message
   labelnode.width = 400
   labelnode.height = 400
   var root = cc.find('Canvas')
   labelnode.parent = root
   labelnode.setPosition(0,0)
   setTimeout(()=>{
       labelnode.destroy()
   },dt*1000)
}