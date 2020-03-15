//HotUpdate.js
/**
 * 负责热更新逻辑的组件
 */
cc.Class({
    extends: cc.Component,
 
    properties: {
        manifestUrl: {
            url:cc.RawAsset,  //本地project.manifest资源清单文件
            default:""
        },
        _updating: false,
        _canRetry: false,
        _storagePath: '',
        label: {
            default: null,
            type: cc.Label
        },
    },
 
    checkCb: function (event) {
        var self = this;
        cc.log('Code: ' + event.getEventCode());
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                self.label.string = '本地文件丢失';
                cc.log("No local manifest file found, hot update skipped.");
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                cc.log("Fail to download manifest file, hot update skipped.");
                self.label.string = '下载远程mainfest文件错误';
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                cc.log("Already up to date with the latest remote version.");
                self.label.string = '已经是最新版本';
                self.node.active = false
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                cc.log('New version found, please try to update.');
                self.label.string = '有新版本发现，请点击更新';
                //this.hotUpdate();  暂时去掉自动更新
                break;
            default:
                return;
        }
 
        this._am.setEventCallback(null);
        //this._checkListener = null;
        this._updating = false;
    },
 
    updateCb: function (event) {
        var self = this
        var needRestart = false;
        var failed = false;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                cc.log('No local manifest file found, hot update skipped...');
                self.label.string = '本地版本文件丢失，无法更新';
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                cc.log(event.getPercent());
                cc.log(event.getPercentByFile());
                cc.log(event.getDownloadedFiles() + ' / ' + event.getTotalFiles());
                cc.log(event.getDownloadedBytes() + ' / ' + event.getTotalBytes());
 
                var msg = event.getMessage();
                if (msg) {
                    cc.log('Updated file: ' + msg);
                }
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                cc.log('Fail to download manifest file, hot update skipped.');
                self.label.string = '下载远程版本文件失败';
                failed = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                cc.log('Already up to date with the latest remote version.');
                self.label.string = '当前为最新版本';
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                cc.log('Update finished. ' + event.getMessage());
                self.label.string = '更新完成. ' + event.getMessage();
                needRestart = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                cc.log('Update failed. ' + event.getMessage());
                self.label.string = '更新失败. ' + event.getMessage();
                this._updating = false;
                this._canRetry = true;
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                cc.log('Asset update error: ' + event.getAssetId() + ', ' + event.getMessage());
                self.label.string = '资源更新错误: ' + event.getAssetId() + ', ' + event.getMessage();
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                cc.log(event.getMessage());
                self.label.string = event.getMessage();
                break;
            default:
                break;
        }
 
        if (failed) {
            //cc.eventManager.removeListener(this._updateListener);
            this._am.setEventCallback(null);
            //this._updateListener = null;
            this._updating = false;
        }
 
        if (needRestart) {
            //cc.eventManager.removeListener(this._updateListener);
            this._am.setEventCallback(null);
            //this._updateListener = null;
            // Prepend the manifest's search path
            var searchPaths = jsb.fileUtils.getSearchPaths();
            var newPaths = this._am.getLocalManifest().getSearchPaths();
            cc.log(JSON.stringify(newPaths));
            Array.prototype.unshift(searchPaths, newPaths);
            // This value will be retrieved and appended to the default search path during game startup,
            // please refer to samples/js-tests/main.js for detailed usage.
            // !!! Re-add the search paths in main.js is very important, otherwise, new scripts won't take effect.
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
            jsb.fileUtils.setSearchPaths(searchPaths);
 
            cc.audioEngine.stopAll();
            cc.game.restart();
        }
    },
 
 
    retry: function () {
        if (!this._updating && this._canRetry) {
            this._canRetry = false;
 
            cc.log('Retry failed Assets...');
            this._am.downloadFailedAssets();
        }
    },
 
/*     checkForUpdate: function () {
        cc.log("start checking...");
        if (this._updating) {
            cc.log('Checking or updating ...');
            return;
        }
        if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
            this._am.loadLocalManifest(this.manifestUrl);
            cc.log(this.manifestUrl);
        }
        if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
            cc.log('Failed to load local manifest ...');
            return;
        }
        this._checkListener = new jsb.EventListenerAssetsManager(this._am, this.checkCb.bind(this));
        this._checkListener.setEventCallback(this.checkCb.bind(this));
        //cc.eventManager.addListener(this._checkListener, 1);
        
        this._am.checkUpdate();
        this._updating = true;
    }, */
 
    checkForUpdate:function(){
/*         if (this._updating) {
            cc.log('Checking or updating ...');
            return;
        } */
 
        //cc.log("加载更新配置文件");
 
        //this._am.loadLocalManifest(this.manifestUrl);
        //cc.log(this.manifestUrl);
 
        //this.tipLabel.string = '检查更新';
        //cc.log("start checking...");
 
        //var state = this._am.getState()
 
        //if (state=== jsb.AssetsManager.State.UNINITED) {
 
        // Resolve md5 url
 
        console.log('检查更新')
 
        this._am.setEventCallback(this.checkCb.bind(this));
 
        this._failCount = 0;
 
        this._am.checkUpdate();
 
        this._updating = true;
 
        // }
 
    },
 
    hotUpdate: function () {
        if (this._am && !this._updating) {
            //this._updateListener = new jsb.EventListenerAssetsManager(this._am, this.updateCb.bind(this));
            this._am.setEventCallback(this.updateCb.bind(this));
            //cc.eventManager.addListener(this._updateListener, 1);
 
            this._am.loadLocalManifest(this.manifestUrl);
 
            this._failCount = 0;
            this._am.update();
            this._updating = true;
        }
    },
 
    show: function () {
        // if (this.updateUI.active === false) {
        //     this.updateUI.active = true;
        // }
    },
 
    changesence:function(){
        cc.log("改变场景");
        cc.director.loadScene("helloworld");
    },
 
    // use this for initialization
    onLoad: function () {
        var self = this;
        // Hot update is only available in Native build
        console.log("onloadUpdate");
        if (!cc.sys.isNative) {
            return;
        }
 
        this._storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'remote-asset');
        cc.log('Storage path for remote asset : ' + this._storagePath);
 
        // Setup your own version compare handler, versionA and B is versions in string
        // if the return value greater than 0, versionA is greater than B,
        // if the return value equals 0, versionA equals to B,
        // if the return value smaller than 0, versionA is smaller than B.
        this.versionCompareHandle = function (versionA, versionB) {
            cc.log("JS Custom Version Compare: version A is " + versionA + ', version B is ' + versionB);
            self.label.string = "Compare: version A is " + versionA + ', version B is ' + versionB;
            var vA = versionA.split('.');
            var vB = versionB.split('.');
            for (var i = 0; i < vA.length; ++i) {
                var a = parseInt(vA[i]);
                var b = parseInt(vB[i] || 0);
                if (a === b) {
                    continue;
                }
                else {
                    return a - b;
                }
            }
            if (vB.length > vA.length) {
                return -1;
            }
            else {
                return 0;
            }
        };
 
        // Init with empty manifest url for testing custom manifest
        this._am = new jsb.AssetsManager('', this._storagePath, this.versionCompareHandle);
        // Setup the verification callback, but we don't have md5 check function yet, so only print some message
        // Return true if the verification passed, otherwise return false
        this._am.setVerifyCallback(function (path, asset) {
            // When asset is compressed, we don't need to check its md5, because zip file have been deleted.
            var compressed = asset.compressed;
            // Retrieve the correct md5 value.
            var expectedMD5 = asset.md5;
            // asset.path is relative path and path is absolute.
            var relativePath = asset.path;
            // The size of asset file, but this value could be absent.
            var size = asset.size;
            if (compressed) {
                cc.log("Verification passed : " + relativePath);
                return true;
            }
            else {
                cc.log("Verification passed : " + relativePath + ' (' + expectedMD5 + ')');
                return true;
            }
        }.bind(this));
 
        cc.log("Hot update is ready, please check or directly update.");
 
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            // Some Android device may slow down the download process when concurrent tasks is too much.
            // The value may not be accurate, please do more test and find what's most suitable for your game.
            this._am.setMaxConcurrentTask(2);
            cc.log("Max concurrent tasks count have been limited to 2");
        }
 
        this._am.loadLocalManifest(this.manifestUrl);
        
        cc.log(this.manifestUrl);
 
        //检查更新
        this.checkUpdate()
    },
 
    checkUpdate:function() {
        console.log('检查更新')
 
        this._am.setEventCallback(this.checkCb.bind(this));
 
        this._failCount = 0;
 
        this._am.checkUpdate();
 
        this._updating = true;
    },
 
    onDestroy: function () {
        if (this._updateListener) {
            //cc.eventManager.removeListener(this._updateListener);
            this._am.setEventCallback(null);
            //this._updateListener = null;
        }
        //if (this._am && !cc.sys.ENABLE_GC_FOR_NATIVE_OBJECTS) {
        //    this._am.release();
        //}
    }
});