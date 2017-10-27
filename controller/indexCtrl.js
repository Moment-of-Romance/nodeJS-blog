//导入 文章模型模块
const articleModel = require('../model/articleModel.js');
//导入 公共模块
const common = require('../common.js');
module.exports = {
    showIndexPage(req,res){
        //获取所有的文章信息
        // articleModel.getAllArticles(function(err,results){
        //     if(err) return res.render('404',{});
        //     console.log(results);
        //     res.render('index',{
        //         user : req.session.user,
        //         islogin : req.session.islogin,
        //         list : results[0]
        //     });
        // })
        

        //获取 根据当前页数计算出 开始获取的序号 和 获取pageSize 条数据
        var pageSize = common.pageSize;
        var nowPage = req.query.page ? req.query.page : 1;
        articleModel.getArticleByNowPage(nowPage,pageSize,function(err,results){
            if(err) res.render('404',{});
            //记录总条数
            const totalSize = results[1][0].totalcount;
            //渲染首页
            res.render('index',{
                user : req.session.user,
                islogin : req.session.islogin,
                pageSize : pageSize,
                nowPage : nowPage,
                list : results[0],
                pages : Math.ceil(totalSize / pageSize)
            })
        })
    }
}
