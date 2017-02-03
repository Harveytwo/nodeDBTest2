var mongodb = require('./db')

function Orders(user) {
    this.name = user.name
}

Orders.get = function get(username, callback) {
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        console.log('链接数据库成功')
// 读取 users 集合
        db.collection('orderlist', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
// 查找 name 属性为 username 的文档
            collection.findOne({}, function(err, doc) {
                mongodb.close();
                if (doc) {
// 封装文档为 User 对象
                    console.log(doc)
                    var user = new Orders(doc);
                    callback(err, user);
                } else {
                    callback(err, null);
                }
            });
        });
    });
};

// //客户端通过请求adduser接口post数据进入数据库
// app.post('/adduser',function(req,res){
//   var db = req.db
//   console.log(req.body)
//   collectuser.insert(req.body, function(err,result){
//     res.send(
//       (err == null) ? {msg:'增加成功'}:{msg:err}
//       )
//   })
// })

module.exports = Orders
