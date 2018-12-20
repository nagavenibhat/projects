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
module.exports.read = function(query){
	return module.exports.coll.find(query).sort({lastSearchTime : -1});
}

module.exports.insert = function(data){
	return module.exports.coll.insertOne({
        _id: data.address ,
        address: data.address ,
        latitude: data.latitude,
        longitude: data.longitude,
        other: data,
        status: data.status,
        lastSearchTime: new Date(),
        firstSearchTime: new Date(),
        searchCount : 1
    });
}

module.exports.update = function(data){
    module.exports.coll.findOneAndUpdate({
        _id: data.address
    },[],{
        $set : { lastSearchTime : new Date()},
        $push: {'history.time' : data.lastSearchTime },
        $inc : {searchCount : 1 }
    },{}, function(err, res) {
            if (err) {
                console.log("error in updating data at :" +  err);
            }
        });
}