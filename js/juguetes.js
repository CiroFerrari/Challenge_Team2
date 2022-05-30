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
    function crearArticulo(jugueteF){
        var contenedorJuguetes = document.getElementById("contenedorJuguetes") 
        var templateHtml = ""
        for(i=0;i<juguetes.length;i++){
                templateHtml+=`<div class="card m-2 carta" style="width: 16rem;">
                <img src="${jugueteF[i].imagen}" alt="Petshop MINDY" style = "height: 24vh;">
                <div class="card-body">
                    <h5>${jugueteF[i].nombre}</h5>
                    <p>${jugueteF[i].descripcion}</p>
                    <div>
                        <p class="fw-bold">Precio: $${jugueteF[i].precio}</p>
                        <p>Stock: ${jugueteF[i].stock}</p>
                        <input type="number" class="cantidad" name="cantidad" value="1">
                        <button class="boton-agregar" type="button" data-th="${jugueteF._id}">Agregar al carrito</button>
                    </div>
                </div>
            </div>`
                contenedorJuguetes.innerHTML = templateHtml
        }
    }
    // Capturo los datos del search
    var inputsearch = document.getElementById("search")
    inputsearch.addEventListener("keyup", (event) => {
        busqueda = event.target.value;
        filtros();
        console.log(busqueda);
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