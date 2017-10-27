
//导入userModel模块
const userModel = require('../model/userModel.js');
//导入 MD5加密模块
const common = require('../common.js');

module.exports = {
    showLoginPage(req,res){
        res.render('user/login',{});
    },
    showRegistorPage(req,res){
        res.render('user/register',{});
    },
    registerVertify(req,res){
        //获取请求 数据
        var user = req.body;
        //根据用户名 在数据库中查找对应的 用户的数量
        userModel.getUserCountByUsername(user.username,function(err,results){
            if(err) return res.json({err_code : 1 , msg : '注册失败，请稍后在试'});
            //判断有没有重名
            if(results[0].totalcount !== 0){
                return res.json({err_code : 2 , msg : '此用户名太受欢迎，请换一个'});
            }
            // //添加新用户
                //保存之前 先进行密码加密
            user.password = common.md5Encrypt(user.password);
            userModel.addUser(user,function(err,results){
                if(err) return res.json({err_code : 3 , msg : '注册失败'});
                res.json({err_code : 0 , msg : 'ok'});
            })
        });
    },
    login(req,res){
        //分析：
        //1. 获取登录请求数据
        //2. 查找数据库 是否有相应用户和密码 的用户
        //3. 登录成功调转到首页
        var user = req.body;
        //保存之前 先进行密码加密
        user.password = common.md5Encrypt(user.password);
        
        userModel.login(user,function(err,results){
            if(err || results.length !== 1) return res.json({err_code : 1 , msg : '登录失败'});
            
            //将用户名密码 存在session上
            req.session.user = results[0];
            req.session.islogin = true;
            res.json({err_code : 0, msg : 'ok'});
        })
    },
    logout(req,res){//注销
        //调用express-session中间件 提供的destroy 来注销 session
        req.session.destroy(err=>{
            res.redirect('/');
        });
    }

}