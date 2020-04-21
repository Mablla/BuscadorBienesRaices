//
(function(document, window, undefined, $){
    (function(){
        return objeto = {
            init:function(){
                self = this
                //inicializa los objetos del body
                self.rangoPrecio()
                self.setSearch()
                //Paso los datos al Router '/init'
                self.ajaxRequest('/Init','GET',{})
                  .done(function(data){
                    self.renderSelect(data)
                  })
                  .fail(function(err){
                    console.log('Ocurrió un error codigo:  '+err.status)
                  })
                $('#buscar').on("click",function(){
                  self.filtrar()
                })
            },
            rangoPrecio:function(){
                //Inicializador del elemento Slider
                $("#rangoPrecio").ionRangeSlider({
                  type: "double",
                  grid: false,
                  min: 0,
                  max: 100000,
                  from: 1,
                  to: 100000,
                  prefix: "$"
                })
            },
            setSearch:function() {
                let busqueda = $('#checkPersonalizada')
                busqueda.on('change', (e) => {
                  if (this.customSearch == false) {
                    this.customSearch = true
                  } else {
                    this.customSearch = false
                  }
                  $('#personalizada').toggleClass('invisible')
                })
            },
            ajaxRequest:function(url, type, data){
              //funcion $.ajax que se comunica con el servidor
              return  $.ajax({
                        url: url,
                        type: type,
                        data: data
                      })
            },
            renderSelect:function(datos){
              //renderiza los Select
              var self = this
              var auxList = $('#ciudad')
              var auxTemplate=`<option value=":value:">:ciudad:</option>`
              datos.ciudad.map(function(ciudad,index){
                var auxDatos=auxTemplate.replace(':ciudad:',ciudad)
                                        .replace(':value:',ciudad)
                auxList.append(auxDatos)
              })
              var auxList = $('#tipo')
              var auxTemplate=`<option value=":value:">:tipo:</option>`
              datos.tipo.map(function(tipo,index){
                var auxDatos=auxTemplate.replace(':tipo:',tipo)
                                        .replace(':value:',tipo)
                auxList.append(auxDatos)
              })
              $("#ciudad,#tipo").show()
            },
            filtrar: function(){
              //Pasa los datos al Router '/filtrar'
              var self = this
              var rango = $("#rangoPrecio").data("ionRangeSlider")
              var regObj = {
                ciudad: $('#ciudad').val(),
                tipo:$('#tipo').val(),
                precio:{
                  max: rango.result.to,
                  min: rango.result.from
                }
              }
              var regJson = {reg:JSON.stringify(regObj)}
              self.ajaxRequest('/filtrar','POST',regJson)
                .done(function(data){self.renderLista(data)})
                .fail(function(err){console.log('Ocurrió un error codigo:  '+err.statusText+err.status)})
            },
            renderLista:function(data){
              //Renderiza los bienes raices
              var self = this
              var auxList = $('.lista')
              auxList.empty()
              var auxTemplate=`
              <div class="card horizontal">
                <div class="card-image">
                  <img src="img/home.jpg">
                </div>
                <div class="card-stacked">
                  <div class="card-content">
                    <div>
                      <b>Direccion: </b><p>:Direccion:</p>
                    </div>
                    <div>
                      <b>Ciudad: </b><p>:Ciudad:</p>
                    </div>
                    <div>
                      <b>Telefono: </b><p>:Telefono:</p>
                    </div>
                    <div>
                      <b>Código postal: </b><p>:Codigo:</p>
                    </div>
                    <div>
                      <b>Precio: </b><p>:Precio:</p>
                    </div>
                    <div>
                      <b>Tipo: </b><p>:Tipo:</p>
                    </div>
                  </div>
                  <div class="card-action right-align">
                    <a href="#">Ver más</a>
                  </div>
                </div>
              </div>
              `
              data.map(function(Reg,index){
                var auxDatos=auxTemplate.replace(':Direccion:',Reg.Direccion)
                                        .replace(':Ciudad:',Reg.Ciudad)
                                        .replace(':Telefono:',Reg.Telefono)
                                        .replace(':Codigo:',Reg.Codigo_Postal)
                                        .replace(':Precio:',Reg.Precio)
                                        .replace(':Tipo:',Reg.Tipo)
                auxList.append(auxDatos)
              })


            }

        }
} )()
  objeto.init()
}) (document,window,undefined,jQuery)
