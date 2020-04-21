var fs   = require('fs'),
    path = require('path')
var promise = require('es6-promise').Promise// necesario
function IsJsonString(str) { try { JSON.parse(str); } catch (e) { return false; } return true; }

module.exports = {

  getInit:function(){
    // Se agrega método al objeto array: Saca valores repetidos.
    Array.prototype.unique=function(a){
          return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
    });
    //
    var InitCiudad =[], InitTipo =[]
    var dataPath = __dirname + path.join("/data.json")
    return new promise(function (resolve,reject){
      fs.readFile(dataPath,'utf8',function(err, Datos){
        if (err) {console.log('Modulo: getInit(), ocurrió un error al intentar leer el archivo->'+err); reject(err)}
        if (IsJsonString(Datos)) {
          var objDatos = JSON.parse(Datos)
          objDatos.forEach((item, i) => {
              InitCiudad[i]=item.Ciudad
              InitTipo[i]=item.Tipo
          })
          InitCiudad = InitCiudad.unique().sort()
          InitTipo = InitTipo.unique().sort()
        }
        resolve({ciudad:InitCiudad,tipo:InitTipo})
      } )
    } )
  },
  postFiltrar:function(reg){
    var reg
    var dataPath = __dirname + path.join("/data.json")
    return new promise (function (resolve,reject){
      fs.readFile(dataPath,'utf8',function(err, Datos){
        if (err) {console.log('Modulo: filtrar() ocurrió un error al intentar leer el archivo->'+err); reject(err)}
        if (IsJsonString(Datos)) {
          let objDatos = JSON.parse(Datos)
          let obj = objDatos.filter((D)=> {
            let llave =  true
            if (reg.ciudad != "") {
              if (reg.ciudad!=D.Ciudad) {llave = false}
            }
            if (llave &&(reg.tipo!="")){
              if(reg.tipo!=D.Tipo){llave=false}
            }
            let Precio = Number(D.Precio.replace(/[^0-9.-]+/g,""));
            if (llave && !(reg.precio.min <= Precio && reg.precio.max >= Precio)) {llave=false}
            return llave
          })
          resolve(obj)
        } else {
          resolve({})
        }
      })
    })
  }
}
