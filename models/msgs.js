var mongodb = require('./db')

function Msgs(msg, time, action) {
    this.msg = msg;
    // 判断是否传了 time 和 action
    if (time) {
        this.time = time;
    } else {
        this.time = new Date();
    }
    if (action) {
        this.action = action;
    } else {
        this.action = 1
    }
}

Msgs.prototype.save = function save(callback) {
// 存入 Mongodb 的文档
    var msg = {
        msg: this.msg,
        time: this.time,
        action: this.action
    };
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
// 读取 users 集合
        db.collection('message', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
// 为 name 属性添加索引
            // collection.ensureIndex('msg', {unique: true});
// 写入 user 文档
            collection.insert(msg, {safe: true}, function(err, msg) {
                mongodb.close();
                callback(err, msg);
            });
        });
    });
};

Msgs.get = function get(msg, callback) {
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        // 读取 message 集合
        db.collection('message', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            var query = {};
            if (msg) {
                query.msg = msg;
            }
            collection.find(query).toArray(function(err, docs) {
                mongodb.close();
                if (docs) {
            // 封装文档为 Msgs 对象
					var msgs = []
                    console.log(docs)
                    docs.forEach(function(doc, index) {
                    	var msg = new Msgs(doc.msg, doc.time, doc.action)
                    	msgs.push(msg);
                    })
                    callback(null, msgs);
                } else {
                    callback(err, null);
                }
            });
        });
    });
};

module.exports = Msgs
