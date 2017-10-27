const express = require('express');

const router = express.Router();

//导入indexCtrl模块
const indexCtrl = require('../controller/indexCtrl.js');

router
    .get('/',(req,res)=>{
        indexCtrl.showIndexPage(req,res);
    })


//导出路由模块
module.exports = router;    