var wugong = require('WuGong')
window.Global = {
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
    }
}

window.getWG = (name) => {
    wugong.forEach(element => {
        if(element.name == name){
            return element
        }
    });
    return null
}