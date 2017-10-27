const express = require('express');

const fs = require('fs');

const path = require('path');

const app = express();

//设置默认模板引擎
app.set('view engine','ejs');

//导入body-parser
const bodyParser = require('body-parser');
//注册中间件  来解析post请求过来的数据
app.use(bodyParser.urlencoded({extended : false}));

//注册express-session中间件
const session = require('express-session');
app.use(session({
    secret : 'this is  a salt',//相当于MD5 中的盐，做加密处理
    resave : false, //如果为true 表示 强制让所有的session存储到物理磁盘中
    saveUninitialized : false //如果为true 表示强制让 未初始化的session存储在物理磁盘中
}))


//如果路由模块太多了 那么一个个的导入会很麻烦  所以 为了解决这个麻烦 就有一个方法
//读取 文件 循环遍历文件名
fs.readdir(path.join(__dirname,'./router'),(err,filenames)=>{
    filenames.forEach((filename)=>{
        // console.log(filename);
        const fullpath = path.join(__dirname,'./router',filename);
        const tempModule = require(fullpath);
        app.use(tempModule);
    })
})

// //导入 index路由模块
// const indexRouter = require('./router/indexRouter.js');
// app.use(indexRouter);

// //导入 user路由模块
// const userRouter = require('./router/userRouter.js');
// app.use(userRouter);

//静态资源托管
app.use('/node_modules',express.static('node_modules'));

//监听端口
app.listen(3000,()=>{
    console.log('server running at http://127.0.0.1:3000');
    
})