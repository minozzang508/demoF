const path = require('path');

module.exports = {
    name : 'word-relay-dev',
    mode : 'development', //deploy : 'production'
    devtool : 'eval',
    resolve : {
        extensions : ['.js', '.jsx'],
    },
    entry : {
        app : './client', //client에서 wordRelay를 불러오기 때문에 client만 입력해도 댄다.
    },
    module : {

    }
};