var bodyParser = require('body-parser'),
    http       = require('http'),
    express    = require('express')

var port       = port = process.env.PORT || 1111,
    app        = express(),
    Server     = http. createServer(app),
    Routers       = require('./lib')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/',Routers)
app.use(express.static('public'))

Server.listen(port, function(){
  console.log('El server esta corriendo en '+port)
})
