// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        _loading:false,
        loadProgressBar:{
            default:null,
            type:cc.ProgressBar
        },
        progressTip:{
            default:null,
            type:cc.Label
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
        this.resource = null
        this.loadProgressBar.progress = 0
        this._clearAll();
        cc.director.preloadScene(Global.sceneName, this._progressCallback.bind(this), this._completeCallback.bind(this));
    },

    _clearAll() {

    },

    _progressCallback(completedCount, totalCount, res) {
        cc.log(completedCount+totalCount)
        this.progress = completedCount / totalCount;
        this.resource = res;
        cc.log("正在加载")
        cc.log(this.resource.id)
        this.completedCount = completedCount;
        this.totalCount = totalCount;
    },

    _completeCallback(error, res) {
      cc.log("加载完成!")
    },

    start () {

    },

    update: function (dt) {
        if (!this.resource) {
            return;
        }
        var progress = this.loadProgressBar.progress;
        if (progress >= 1) {
            if(!this._loading){
                this._loading = true
                cc.director.loadScene(Global.sceneName)
            }
            return 
            // this.node.active = false;
        }
        if (progress < this.progress) {
            progress += dt;
            if(progress > 1)
                progress = 1
            cc.log(progress)
        }
        this.loadProgressBar.progress = progress;
        var tip = (progress*100).toFixed(0)+"%"
        this.progressTip.string = tip
    }
});
