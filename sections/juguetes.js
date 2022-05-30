getData()
var datajson = "" 
var juguetes = []
async function getData(){
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
    .then(response => response.json())
    .then(data => datajson = data)
    var datos = datajson.response
    console.log(datos)
    function crearArticulo(juguetes){
        var contenedorJuguetes = document.getElementById("contenedorJuguetes") 
        var templateHtml = ""
        for(i=0;i<datos.length;i++){
            if(datos[i].tipo=="Juguete"){
                templateHtml+=`<div class="card m-2 carta" style="width: 16rem;">
                <img src="${juguetes[i].imagen}" class="card-img-top" alt="Petshop MINDY" style = "height: 24vh;">
                <div class="card-body">
                    <h5 class="card-title">${juguetes[i].nombre}</h5>
                    <p class="card-text">${juguetes[i].descripcion}</p>
                    <div class="d-flex flex-row justify-content-around align-content-center">
                        <p class="fw-bold">Price: $${juguetes[i].precio}</p>
                        <a href="details.html?id=${juguetes[i].id}" class="btn btn-danger">Go somewhere</a>
                    </div>
                </div>
            </div>`
                contenedorJuguetes.innerHTML = templateHtml
            }
        }
    }
    crearArticulo(datos)
}