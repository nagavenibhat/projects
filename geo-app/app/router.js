let router = require('express').Router();
const api = require(__dirname +'/api.js');
const mongo = require(__dirname + '/mongo.js');
const bodyParser = require('body-parser')

mongo.init();

parseUrlencoded = bodyParser.urlencoded({ extended: false })

router.get('/', function(req, res) {
    res.render('index', {
        error: 'Welcome to Geo App',
        result : null
    })
})
router.post('/',parseUrlencoded, function(req, res) {
    api.geoFinder(req.body.address, res);
})

router.post('/getHistory', function(req, res) {
    mongo.read({status  : 'success' }).toArray(function(err, result) {
        if (err) throw err;
        res.render('index', {
            table: result
        });
    });
})

module.exports = router;
