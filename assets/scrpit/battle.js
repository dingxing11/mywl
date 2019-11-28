import { resolve } from "path";
import { rejects } from "assert";

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
var enemy = require('Enemy')
cc.Class({
    extends: cc.Component,

    properties: {
        _player:null,
        _enmey:null,
        _battleFinish:false,
        _huiheFinish:false,
        _num:0,
        _playerIndex:0,
        _enemyIndex:0,
        playerTeam:[cc.Node],
        enemyTeam:[cc.Node],
        player:cc.Prefab,
        enemy:cc.Prefab
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

    // onLoad () {},

    /**
     * 回合整个流程
     */
    start () {
        this.readyTurn()
        .then(()=>{
            this.startTurn()
        })
    },

    // 初始化team
    teamInit(){
        // 初始化playerteam资源
        for (let index = 0; index < player.duiwu.length; index++) {
            if(player.duiwu[index]){
                var pos = this.playerTeam[index].position
                var parent = this.playerTeam[index].parent
                this.playerTeam[index] = cc.instantiate(this.player)
                this.playerTeam[index].name = 'player' + index
                this.playerTeam[index].parent = parent
                this.playerTeam[index].setPosition(pos)
                var playrComp = this.playerTeam[index].getComponent('player1')
                playrComp._player = player.duiwu[index]
            } else {
                this.playerTeam[index] = null
            }
        }
        cc.log(this.playerTeam)
        // 初始化enemyTeam资源
        for (let index = 0; index < this.enemyTeam.length; index++) {
            pos = this.enemyTeam[index].position
            parent = this.enemyTeam[index].parent
            this.enemyTeam[index] = cc.instantiate(this.enemy)
            this.enemyTeam[index].setPosition(pos)
            this.enemyTeam[index].parent = parent
            var enemy = require('Enemy')
            var enemyComp = this.enemyTeam[index].getComponent('enemy1')
            enemyComp._enmey = enemy[index]
        }
        cc.log(this.enemyTeam)
    },

    // 主循环
    startTurn(){
        this.playerTurn()
        .then(()=>{
            return this.enemyTurn()
        })
        .then(()=>{
            this._huiheFinish = true
        })
    },
    
    // player全部阵亡
    playersDead(){
        var dead = true
        for (let index = 0; index < this.playerTeam.length; index++) {
            if(this.playerTeam[index]){
                dead = false
                break
            }
        }
        return dead
    },

    // player全部阵亡
    enemysDead(){
        var dead = true
        for (let index = 0; index < this.enemyTeam.length; index++) {
            if(this.enemyTeam[index]){
                dead = false
                break
            }
        }
        return dead
    },

    // 准备开始
    readyTurn(){
        return new Promise((resolve,rejects)=>{
            this.teamInit()
            cc.log('准备开始')
            resolve()
        })
    },
    
    // 自己回合
    playerTurn(){
        return new Promise((resolve,reject)=>{
            cc.log('自己回合')
            // 1.攻击敌人
            if(this.playerTeam[this._playerIndex]){
                var player = this.playerTeam[this._playerIndex].getComponent('player1')
                player.ack(this.enemyTeam[this.firstEnemy()])
                .then(()=>{
                    if(this.enemyTeam[this.firstEnemy()].getComponent('enemy1')._enmey.HP <= 0)
                        this.enemyTeam[this.firstEnemy()] = null
                    this._playerIndex += 1
                    if(this.enemysDead()){
                        cc.log('胜利')
                        this._battleFinish = true
                        return null
                    }
                    // 是否回合结束
                    if(this._playerIndex >= this.playerTeam.length && this._enemyIndex >= this.enemyTeam.length){
                        this._playerIndex = 0
                        this._enemyIndex = 0
                    }
                    resolve()
                })
            } else {
                this._playerIndex += 1
                // 2.是否回合结束
                if(this._playerIndex >= this.playerTeam.length && this._enemyIndex >= this.enemyTeam.length){
                    this._playerIndex = 0
                    this._enemyIndex = 0
                }
                resolve()
            }
        })
    },

    // 战斗结束
    endTurn(){
        cc.log('战斗结束')
        this.vectory()
    },

    // 返回player队中的第一个人物id
    firstPlayer(){
        let player_index = null
        for (let index = 0; index < this.playerTeam.length; index++) {
            if(this.playerTeam[index]){
                player_index = index
                break
            }      
        }
        return player_index
    },

    // 返回enemy队中的第一个怪物id
    firstEnemy(){
        let enemy_index = null
        for (let index = 0; index < this.enemyTeam.length; index++) {
            if(this.enemyTeam[index]){
                enemy_index = index
                break
            }      
        }
        return enemy_index
    },

    // 对方回合
    enemyTurn(){
        return new Promise((resolve,reject)=>{
            cc.log('对方回合')
            if(this.enemyTeam[this._enemyIndex]){
                var enemy = this.enemyTeam[this._enemyIndex].getComponent('enemy1')
                enemy.ack(this.playerTeam[this.firstPlayer()])
                .then(()=>{
                    if(this.playerTeam[this.firstPlayer()].getComponent('player1')._player.HP <= 0)
                        this.playerTeam[this.firstPlayer()] = null
                    if(this.playersDead()){
                        cc.log('失败')
                        this._battleFinish = true
                        return null
                    }
                    this._enemyIndex +=1
                    if(this._playerIndex >= this.playerTeam.length && this._enemyIndex >= this.enemyTeam.length){
                        this._playerIndex = 0
                        this._enemyIndex = 0
                        this._huiheFinish = true
                        return null
                    }
                    resolve()
                })
            } else {
                this._enemyIndex +=1
                if(this._playerIndex >= this.playerTeam.length && this._enemyIndex >= this.enemyTeam.length){
                    this._playerIndex = 0
                    this._enemyIndex = 0
                }
                resolve()
            }
        })
    },
    
    // 胜利界面
    vectory() {
        cc.log('胜利了掉落物品')
        var end = cc.find("Canvas/end")
        var s_end = end.getComponent("end")
        end.zIndex = 1
        end.active = true
    },

    update (dt) {
        if(this._battleFinish){
            this.endTurn()
            this._battleFinish = false
        }
        if(this._huiheFinish){
            this.startTurn()
            this._huiheFinish = false
        }
    },
});
