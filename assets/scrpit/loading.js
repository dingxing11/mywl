import { CC_BUILD } from "../../creator";

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
        cc.log("没进来？")
        this._urls = [
            cc.url.raw("resources/audio/ding.wav"),
            cc.url.raw("resources/audio/cheering.wav"),
            cc.url.raw("resources/audio/music_logo.mp3"),
        ]
        this.resource = null
        this.loadProgressBar.progress = 0
        this._clearAll();
        cc.loader.load(this._urls, this._progressCallback.bind(this), this._completeCallback.bind(this));
    },

    _clearAll() {
        for (var i = 0; i < this._urls.length; ++i) {
            var url = this._urls[i];
            cc.loader.release(url);
        }
    },

    _progressCallback(completedCount, totalCount, res) {
        cc.log(completedCount+totalCount)
        this.progress = completedCount / totalCount;
        this.resource = res;
        this.completedCount = completedCount;
        this.totalCount = totalCount;
    },

    _completeCallback(error, res) {
      
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
                cc.director.preloadScene(Global.sceneName, function () {
                    
                    cc.director.loadScene(Global.sceneName)
                }.bind(this));
            }
            return 
            // this.node.active = false;
        }
        if (progress < this.progress) {
            progress += dt;
            if(progress > 1)
                progress = 1
            cc.log("2"+progress)
        }
        this.loadProgressBar.progress = progress;
        var tip = (progress*100).toFixed(0)+"%"
        this.progressTip.string = tip
    }
});
