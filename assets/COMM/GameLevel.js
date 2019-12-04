// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:(
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
var enemys = require('Enemy')
var wugong = require('WuGong')
var zhuangbei = require('ZhuangBei')
module.exports = [{
    Level: 1,
    Enemys:[
        enemys[0],enemys[1]
    ],
    Enemys_pos:[cc.v2(162,68),cc.v2(169,-16)],
    Drop:[wugong[0],zhuangbei[1]],
    Exp:200
}]