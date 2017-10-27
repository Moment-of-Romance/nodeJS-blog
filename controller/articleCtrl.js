//导入 文章模型模块
const articleModel = require('../model/articleModel.js');
//导入markdown 
const markdown = require('markdown').markdown
module.exports = {
    showArticlePage(req,res){//显示文章添加页面

        //显示添加页面时必须与权限 1.必须登录 因为 每一篇文章都会有一个作者 
        if(!req.session.islogin) return res.redirect('/login');

        res.render('article/add',{
            user : req.session.user,
            islogin : req.session.islogin
        });
    },
    addArticle(req,res){//添加文章 {id , title , content , authorId , ctime} 作者的id通过表单隐藏于 提交过来，因为session里的内容有过期时间（20-30分钟） 这样用户体验不好
        //获取添加文章 的请求数据
        var newArticle = req.body;
        //完成 创建时间
        newArticle.ctime = new Date();
        // console.log(newArticle);
        // console.log(req.session.user)
        articleModel.addArticle(newArticle,function(err,results){
            if(err || results.affectedRows != 1) res.json({err_code : 1 , msg : '添加文章失败~'});
            //添加成功 返回 json对象
            res.json({err_code : 0 , msg : 'ok' , articleId : results.insertId})
        })
    },
    showInfoPage(req,res){//显示 文章详情页
        //获取 查询参数的id
        var articleId = req.query.id;
        //通过id 来 获取文章的信息
        articleModel.getArticleById(articleId,function(err,results){
            if(err || results.length != 1) res.render('404',{});

            //将文章内容 利用markdown进行转换
            results[0].content = markdown.toHTML(results[0].content);

            //获取文章成功 渲染详情页
            res.render('article/info',{
                user : req.session.user,
                islogin : req.session.islogin,
                article : results[0]
            })
        })
    },
    showEditPage(req,res){//显示 编辑页面
        //如果 没有登录 跳转到登录页
        if(!req.session.islogin) return res.redirect('/login');
        //登录了 但你不是文章的作者 你也进不来
            // 现货文章的id
        var articleId = req.query.id;
        //获取文章信息
        articleModel.getArticleById(articleId,function(err,results){
            if (err || results.length != 1) return res.render('404', {});
            if(req.session.user.id != results[0].authorId) return res.render('404',{});
            //如果是文章的作者
            //渲染 编辑页
            res.render('article/edit',{
                user : req.session.user,
                islogin : req.session.islogin,
                article : results[0]
            })
        })    
    },
    editArticle(req,res){ //编辑文章
        //获取 编辑后的文章信息
        var article = req.body;
        // console.log(article);
        //调用文章模型的 方法
        articleModel.editArticle(article,function(err,results){
            // console.log(results);
            //如果有错误  
            if(err || results.affectedRows != 1) res.json({err_code : 1 , msg :'编辑失败'});
            //成功
            res.json({err_code : 0 , msg : 'ok'})
        })
    }
}