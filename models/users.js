var mongodb = require('./db')

function Users(user) {
    this.msg = user.msg
}

Users.prototype.save = function save(callback) {
// 存入 Mongodb 的文档
    var user = {
        msg: this.msg,
    };
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
// 读取 users 集合
        db.collection('userlist', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
// 为 name 属性添加索引
            // collection.ensureIndex('msg', {unique: true});
// 写入 user 文档
            collection.insert(user, {safe: true}, function(err, user) {
                mongodb.close();
                callback(err, user);
            });
        });
    });
};

Users.get = function get(username, callback) {
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
// 读取 users 集合
        db.collection('userlist', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            var query = {};
            if (username) {
                query.user = username;
            }
// 查找 name 属性为 username 的文档
            collection.find(query).toArray(function(err, docs) {
                mongodb.close();
                if (docs) {
// 封装文档为 User 对象
										var users = []
                    // console.log(docs)
                    docs.forEach(function(doc, index) {
                    	var user = new Users(doc)
                    	users.push(user);
                    })
                    callback(null, users);
                } else {
                    callback(err, null);
                }
            });
        });
    });
};

module.exports = Users