const express = require('express')
const app = express();

const config = require(__dirname + '/config.json');
const router = require(__dirname +'/router.js');

app.listen(config.port, function() {
    console.log(`Geo app listening on port ${config.port}!`)
})
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use('/',router)


