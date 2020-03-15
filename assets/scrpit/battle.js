import { resolve } from "path";
import { rejects } from "assert";
import { randomBytes } from "crypto";

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
var gamelv = require('GameLevel')
var duiwu = require('DuiWu')
cc.Class({
    extends: cc.Component,

    properties: {
        _player:null,
        _enmey:null,
        _resState:false,
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

    onLoad () {

    },

    /**
     * 回合整个流程
     */
    start () {
        cc.log('回合开始')
        this.readyTurn()
        .then(()=>{
            this.startTurn()
        })
    },

    // 初始化team
    teamInit(resolve){
        // 初始化playerteam资源
        this._isTeamInit = false
        for (let index = 0; index < duiwu.length; index++) {
            if(index === 3){
                this._isTeamInit = true
            }
            if(duiwu[index]){
                cc.loader.loadRes(duiwu[index].show,cc.SpriteFrame,(err,spriteframe)=>{
                    if(err){
                        cc.log('错了',err)
                    }
                    var pos =player.duiwu_pos[index]
                    var parent = this.node
                    this.playerTeam[index] = cc.instantiate(this.player)
                    this.playerTeam[index].name = 'player' + index
                    this.playerTeam[index].parent = parent
                    this.playerTeam[index].setPosition(pos)
                    var playrComp = this.playerTeam[index].getComponent('player1')
                    this._playerbg = this.playerTeam[index].getChildByName('playerbg').getComponent(cc.Sprite)
                    this.updateTeam();
                    playrComp._player = duiwu[index]
                    playrComp._player.HP = playrComp._player.MAXHP
                    cc.log('图片:',playrComp._player.show)
                    cc.log('名字:',playrComp._player.Name)
                    this._playerbg.spriteFrame = spriteframe
                    if(this._isTeamInit)
                        resolve()
                })
            } else {
                this.playerTeam[index] = null
            }
        }
        cc.log(this.playerTeam)
        // 初始化enemyTeam资源
        for (let index = 0; index < gamelv[Global.lv_battle].Enemys.length; index++) {
            if(gamelv[Global.lv_battle].Enemys[index]){
                var pos = gamelv[Global.lv_battle].Enemys_pos[index]
                var parent = this.node
                this.enemyTeam[index] = cc.instantiate(this.enemy)
                this.enemyTeam[index].setPosition(pos)
                this.enemyTeam[index].parent = parent
                var enemyComp = this.enemyTeam[index].getComponent('enemy1')
                enemyComp._enmey = gamelv[Global.lv_battle].Enemys[index]
                enemyComp._enmey.HP = enemyComp._enmey.MAXHP
            } else 
                this.enemyTeam[index] = null
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

    /**
     * 更新玩家队伍信息
    */
    updateTeam(){
        duiwu.forEach((team_huoban,team_index) => {
            if(team_huoban){
                player.huoban.forEach(huoban => {
                    if(huoban.ID === team_huoban.ID)
                        duiwu[team_index] = huoban
                    else if(player.ID === team_huoban.ID){
                        duiwu[team_index] = player
                    }
                });
            }
        });
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
            cc.log('准备开始')
            this.teamInit(resolve)
        })
    },
    
    // 自己回合
    playerTurn(){
        return new Promise((resolve,reject)=>{
            cc.log('自己回合')
            // 初始化状态
            this._resState = false
            if(this.playerTeam[this._playerIndex]){
                var player = this.playerTeam[this._playerIndex].getComponent('player1')
                // 1.查看自己状态
                cc.log('查看状态')
                this.updateState(player,resolve,0)
                // 2.攻击敌人
                if(this._resState === false){
                    cc.log('攻击敌人')
                    player.ack(this.enemyTeam[this.firstEnemy()])
                    .then(()=>{
                        if(this.enemyTeam[this.firstEnemy()].getComponent('enemy1')._enmey.HP <= 0){
                            this.enemyTeam[this.firstEnemy()] = null
                        }
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
                }
            } else {
                this._playerIndex += 1
                // 2.是否回合结束
                if(this._playerIndex >= this.playerTeam.length && this._enemyIndex >= this.enemyTeam.length){
                    this._playerIndex = 0
                    this._enemyIndex = 0
                    this._huiheFinish = true
                } else {
                    resolve()
                }
            }
        })
    },

    // 获取经验
    getExp(){
        var sum_exp = gamelv[Global.lv_battle].Exp
        var sum = 0
        duiwu.forEach(element => {
            if(element){
                sum +=1
            }
        });
        duiwu.forEach(element => {
            if(element){
                element.EXP += Math.floor(sum_exp / sum)
                while(element.EXP > element.MAXEXP){
                    element.EXP -= element.MAXEXP
                    element.LEVEL +=1
                    element.MAXEXP += 50 * element.LEVEL
                    element.ack += element.ack_up
                    element.def += element.def_up
                    element.MAXHP += element.MAXHP_up
                    element.MAXMP += element.MAXMP_up
                }
            }
        });
    },

    // 获取战利品
    getDrop(){
        var drop = gamelv[Global.lv_battle].Drop[Math.round(Math.random()*(gamelv[Global.lv_battle].Drop.length-1))]
        player.BeiBao.push(drop)
        return drop
    },
    
    /**
     * 更新状态
     * @param resolve -promise的resolve
     * @param id -0：player,1: enemy
     */
    updateState(player,resolve,id){
        player._BUFF.forEach(element => {
            if(element.name == '眩晕'&& element.huihe > 0){
                element.huihe = element.huihe - 1
                if(element.huihe === 0){
                    player.delBuffAndDebuff(element.icon)
                }
                cc.log(element.name)
                if(id === 0)
                    this._playerIndex += 1
                else {
                    this._enemyIndex +=1
                }
                this._resState = true
                resolve()
            }
        });
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
            this._resState = false
            if(this.enemyTeam[this._enemyIndex]){
                var enemy = this.enemyTeam[this._enemyIndex].getComponent('enemy1')
                // 查看状态
                this.updateState(enemy,resolve,1)
                if(!this._resState){
                    enemy.ack(this.playerTeam[this.firstPlayer()])
                    .then(()=>{
                        if(this.playerTeam[this.firstPlayer()].getComponent('player1')._player.HP <= 0){
                            this.playerTeam[this.firstPlayer()] = null
                        }
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
                }
            } else {
                this._enemyIndex +=1
                if(this._playerIndex >= this.playerTeam.length && this._enemyIndex >= this.enemyTeam.length){
                    this._playerIndex = 0
                    this._enemyIndex = 0
                    this._huiheFinish = true
                } else {
                    resolve()
                }
            }
        })
    },
    
    // 胜利界面
    vectory() {
        this.getExp()
        var item = this.getDrop()
        cc.log('胜利了掉落物品',item)
        var end = cc.find("Canvas/end")
        var s_end = end.getComponent("end")
        s_end.drops.push(item)
        end.zIndex = 1
        end.active = true
    },
    // 失败界面
    lose(){

    },

    update (dt) {
        if(this._battleFinish){
            this._battleFinish = false
            this.endTurn()
        }
        if(this._huiheFinish){
            this._huiheFinish = false
            
            this.startTurn()
        }
    },
});
