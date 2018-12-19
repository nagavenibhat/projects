let mongodb = require('mongodb');
const config = require(__dirname + '/config.json');

let getURL = function(){
let url = "mongodb://";
    if (config.mongo.username !== undefined && config.mongo.username !== "") {
        url += config.mongo.username + ":" + config.mongo.password + "@";
    }
    url += config.mongo.host + ":" + config.mongo.port;
    return url;
}
module.exports.init = function(){
    mongodb.MongoClient.connect(getURL(),{useNewUrlParser: true}, function(err, db){
        if(!err){
            console.log('mongodb connected');
        }
        db = db.db(config.mongo.db);
	    module.exports.coll = db.collection(config.mongo.table);
    });
};
module.exports.read = function(){
	return module.exports.coll.find({
        status: 'success'
    }).sort({_id : -1});
}

module.exports.insert = function(data){
	return module.exports.coll.insertOne({
        _id: new mongodb.ObjectID().toString(),
        query: data.query  ,
        latitude: data.latitude,
        longitude: data.longitude,
        other: data,
        status: data.status,
        time: new Date(),
    });
}