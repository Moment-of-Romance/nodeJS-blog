//导入 数据库公共模块
const connection = require('./baseDB.js');

module.exports = {
    getUserCountByUsername(username,callback){//根据用户名 去查找对应的用户的数量
        let sql = 'select count(*) as totalcount from user where username=? ';
        connection.query(sql,username,callback);
    },
    addUser(user,callback){
        let sql = 'insert into user set ? ';
        connection.query(sql,user,callback);
    },
    login(user,callback){
        let sql = 'select * from user where username=? and password=?';
        connection.query(sql,[user.username,user.password],callback);
    }
}