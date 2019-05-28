

window.Global = {
    sceneName:'',
    goScene(sceneName){
        this.sceneName = sceneName
        cc.director.loadScene("load")
    }
}