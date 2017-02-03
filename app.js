var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.set('port', process.env.PORT || 3000)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Conten-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


var index = require('./routers/index')

app.use('/', index);

app.listen(3000);
console.log('server 3000');

module.exports = app;
