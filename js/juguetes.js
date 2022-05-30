// Traigo los datos de la Api
getData()
var datajson = "" 
var juguetes = []
var busqueda =""
var juguetes = []
async function getData(){
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
    .then(response => response.json())
    .then(data => datajson = data)
    var datos = datajson.response
    // Encierro en una variable, solo los juguetes
    function traerJuguetes(){
        for(juguete of datos){
            if (juguete.tipo == "Juguete"){
                juguetes.push(juguete)
            }
        }
    }
    traerJuguetes()
    console.log(juguetes)
    // Funcion para crear las cartas dinamicamente segun la cantidad de juguetes que haya en pantalla
    function crearArticulo(parametro){
        var contenedorJuguetes = document.getElementById("contenedorJuguetes") 
        if(parametro.length!=0){
            var templateHtml = ""    
        parametro.forEach(juguete => {
            if (juguete.stock > 5){
            templateHtml += `<div class="card m-2 carta" style="width: 16rem;">
            <img src="${juguete.imagen}" alt="Petshop MINDY" style = "height: 24vh;">
            <div class="card-body">
                <h5>${juguete.nombre}</h5>
                <p>${juguete.descripcion}</p>
                <div>
                    <p class="fw-bold">Precio: $${juguete.precio}</p>
                    <p>Stock: ${juguete.stock}</p>
                    <input type="number" class="cantidad" name="cantidad" value="1">
                    <button class="boton-agregar" type="button" data-th="${juguete._id}">Agregar al carrito</button>
                </div>
            </div>
        </div>`}
        else{
            templateHtml += `<div class="card m-2 carta" style="width: 16rem;">
            <img src="${juguete.imagen}" alt="Petshop MINDY" style = "height: 24vh;">
            <div class="card-body">
                <h5>${juguete.nombre}</h5>
                <p>${juguete.descripcion}</p>
                <div>
                    <p class="fw-bold">Precio: $${juguete.precio}</p>
                    <p style ="color: red">Stock: ${juguete.stock} ULTIMAS UNIDADES!!</p>
                    <input type="number" class="cantidad" name="cantidad" value="1">
                    <button class="boton-agregar" type="button" data-th="${juguete._id}">Agregar al carrito</button>
                </div>
            </div>
        </div>`
        }
        })
        contenedorJuguetes.innerHTML = templateHtml     
        }else{
            contenedorJuguetes.innerHTML = `<p>No se han encontrado juguetes con ese nombre</p>`
            console.log(contenedorJuguetes)
            console.log("")
        }
    }
    // Capturo los datos del search
    var inputsearch = document.getElementById("search")
    inputsearch.addEventListener("keyup", (event) => {
        busqueda = event.target.value;
        filtros();
    })
    // 
    // Segun los input, voy filtrando
    function filtros(){
        let filtros = []
        if(busqueda!==""){
            filtros.push(...juguetes.filter(dato => dato.nombre.toLowerCase().includes(busqueda.trim().toLowerCase())))
            console.log(filtros);
        } else {
            filtros.push(...juguetes)
        }
        crearArticulo(filtros)
    }filtros()
}