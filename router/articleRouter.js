const express = require('express');

const router = express.Router();

//导入 文章 控制模块
const articleCtrl = require('../controller/articleCtrl');

router
    .get('/article/add',(req,res)=>{
        articleCtrl.showArticlePage(req,res);
    })
    .post('/article/add',(req,res)=>{
        articleCtrl.addArticle(req,res);
    })
    .get('/article/info',(req,res)=>{
        articleCtrl.showInfoPage(req,res);
    })
    .get('/article/edit',(req,res)=>{
        articleCtrl.showEditPage(req,res);
    })
    .post('/article/edit',(req,res)=>{
        articleCtrl.editArticle(req,res);
    })

//导出路由模块
module.exports = router;