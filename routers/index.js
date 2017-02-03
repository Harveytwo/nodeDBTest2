var express = require('express')
var router = express.Router()
var Orders = require('../models/orders')
var Users = require('../models/users')
var Msgs = require('../models/msgs')

var home = [
    { name: 'home', description: '我是首页', price: 12.12},
    { name: 'home', description: '我是首页', price: 12.12}
]

router.get('/', function(req, res) {
  res.json(home)
});

router.get('/users', function(req, res) {
  Users.get(null, function(err, posts) {
        if (err) {
            posts = [];
        }
        // console.log(posts)
        res.json(posts)
    });
});
router.post('/adduser', function(req, res) {
    //这里 req.body 需要使用 body-parser 模块才能获取到数据
    // console.log(req.body)
    res.send(
      {msg: req.body.msg}
    )
    var newUser = new Users({
        msg: req.body.msg,
    });
    newUser.save(function(err, posts) {
        if (err) {
            posts = [];
        }
        console.log(posts)
        res.json(posts)
    });
});

router.get('/msgs', function(req, res) {
     // res.send({msg:'增加成功'})
  Msgs.get(null, function(err, msgs) {
        if (err) {
            msgs = [];
        }
        // console.log(msgs)
        res.json(msgs)
    });
});

router.post('/addmsg', function(req, res) {
    var newMsg = new Msgs(req.body.msg, req.body.time, req.body.action);
    newMsg.save(function(err, msgs) {
        if (err) {
            msgs = [];
        }
        // console.log(msgs)
        res.json(msgs)
    });
});


module.exports = router
