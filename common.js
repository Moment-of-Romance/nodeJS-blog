const md5 = require('blueimp-md5');

module.exports = {
    passwordSalt : '%^&$^**(()#',
    md5Encrypt(originPwd){
        return md5(originPwd,this.passwordSalt);
    },
    pageSize : 5 //每页显示的条数
}