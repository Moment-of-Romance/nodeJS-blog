const express = require('express');

const router = express.Router();

//导入user控制模块
const userCtrl = require('../controller/userCtrl.js');

router
    .get('/login',(req,res)=>{
        userCtrl.showLoginPage(req,res);
    })
    .get('/register',(req,res)=>{
        userCtrl.showRegistorPage(req,res);
    })
    .post('/register',(req,res)=>{
        userCtrl.registerVertify(req,res);
    })
    .post('/login',(req,res)=>{
        userCtrl.login(req,res);
    })
    .get('/logout',(req,res)=>{//注销
        userCtrl.logout(req,res);
    })

//导出路由模块
module.exports = router;