var wugong = require('WuGong')

window.Global = {
    sceneName:'',
    goScene(sceneName){
        this.sceneName = sceneName
        cc.director.loadScene("load")
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