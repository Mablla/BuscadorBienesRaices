var express = require('express')
var Router  = express.Router()

var Storage = require('../Storage')

Router.get('/Init',function(req, res){
  Storage.getInit()
            .then(function(Init){
              res.json(Init)
            })
            .catch(function(error){
              console.log('Ocurrió un error, se emitirá error: 500')
              res.sendStatus(500).json(erorr)
            })

})
Router.post('/filtrar',function(req,res){
    var reg = JSON.parse(req.body.reg)
    Storage.postFiltrar(reg)
            .then(function(filtrado){
              res.json(filtrado)
            })
            .catch(function(error){
              console.log('Ocurrió un error, se emitirá error: 500')
              res.sendStatus(500).json(erorr)
            })
})

module.exports = Router
