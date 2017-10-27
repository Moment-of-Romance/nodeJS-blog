//导入 数据库公共模块
const connection = require('./baseDB.js');


module.exports = {
    addArticle : function(article,callback){
        let sql = 'insert into article set ?';
        connection.query(sql,article,callback);
    },
    getArticleById : function(articleId,callback){
        let sql = 'select * from article where id=?';
        connection.query(sql,articleId,callback);
    },
    editArticle : function(article,callback){
        let sql = 'update article set ? where id=?';
        connection.query(sql,[article,article.id],callback);
    },
    getAllArticles : function(callback){
        let sql = `select article.*, user.nickname
        from article
        left join user
        on article.authorId=user.id
        order by article.id desc;

        select count(*) as totalcount from article;
        `
        connection.query(sql,callback);
    },
    getArticleByNowPage : function(nowPage,pageSize,callback){
        let sql = `select article.*,user.nickname
        from article
        left join user
        on article.authorId=user.id
        order by article.id desc limit ${(nowPage - 1)*pageSize}, ${pageSize};

        select count(*) as totalcount from article;
        `
        connection.query(sql,callback);
    }
}