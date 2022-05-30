getData()

async function getData(){
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
    .then (response => response.json())
    .then (data => {
    dataArray = data.response})
        console.log(dataArray)

    let productosFarmacia = [];
    let divContenedorFarmacia = document.getElementById("ContenedorFarmacia")

    

// Funcion para traer los productos de farmacia       
    function traerProductosFarmacia() {
        
        for (producto of dataArray) {
            if (producto.tipo == "Medicamento") {
                productosFarmacia.push(producto);
            }
        }
        return productosFarmacia;
    }
    traerProductosFarmacia()
    console.log(productosFarmacia)

// Funcion para imprimir los productos de farmacia
    function imprimirProductosFarmacia(paramArray){
        if(paramArray.length != 0){
                let nuevoHtml = "";
                paramArray.forEach(
                    producto =>{
                        if (producto.stock < 5){
                        nuevoHtml+=`
                        <div class="card m-2 d-flex flex-column justify-content-between align-items-center" style="width: 20rem; height: 40rem;">
                            <img src="${producto.imagen}" class="card-img-top" style = "width: 75%;" alt="imagen-farmacia">
                                <div class="card-body d-flex flex-column justify-content-between align-items-center h-50">
                                    <div class="d-flex flex-column justify-content-between align-items-center">
                                        <h5 class="card-title">${producto.nombre}</h5>
                                        <p class="card-text">${producto.descripcion}</p>
                                    </div>
                                    <div class="d-flex flex-column justify-content-end align-items-center">
                                        <p class="my-1" style="color: red;">Stock: ${producto.stock}  Ultimas unidades!!</p>
                                        <p class="fw-bold my-1">Precio: $ ${producto.precio}</p>
                                        <div class="d-flex flex-row justify-content-center my-1">
                                            <label class="me-3">Cantidad:</label>
                                            <input type="number" class="cantidad" name="cantidad" value="1">
                                        </div>
                                        <button class="btn btn-danger mt-2" type="button" data-th="${producto._id}">Agregar al carrito</button>
                                    </div>
                                </div>
                        </div>
                        `
                    } else {
                        nuevoHtml+=`
                        <div class="card m-2 d-flex flex-column justify-content-between align-items-center" style="width: 20rem; height: 40rem;">
                            <img src="${producto.imagen}" class="card-img-top" style = "width: 75%;" alt="imagen-farmacia">
                                <div class="card-body d-flex flex-column justify-content-between align-items-center h-50">
                                    <div class="d-flex flex-column justify-content-between align-items-center">
                                        <h5 class="card-title">${producto.nombre}</h5>
                                        <p class="card-text">${producto.descripcion}</p>
                                    </div>
                                    <div class="d-flex flex-column justify-content-end align-items-center">
                                        <p class="my-1">Stock: ${producto.stock}</p>
                                        <p class="my-1 fw-bold">Precio: $ ${producto.precio}</p>   
                                        <div class="d-flex flex-row justify-content-around my-1"> 
                                            <label class="me-3">Cantidad:</label>
                                            <input type="number" class="cantidad" name="cantidad" value="1">
                                        </div>
                                        <button class="btn btn-danger mt-2" type="button" data-th="${producto._id}">Agregar al carrito</button>
                                    </div>
                                </div>
                        </div>
                        `
                    }
                    })
                    divContenedorFarmacia.innerHTML = nuevoHtml;
        }else{
            divContenedorFarmacia.innerHTML=` <p>No se han encontrado productos con ese nombre</p>`;
        }        
    }
    imprimirProductosFarmacia(productosFarmacia)

    let contenidoSearch = document.querySelector("#searchInput");
    contenidoSearch.addEventListener("keyup", filterAndRender);

// Filtra e imprime el nombre del producto puesto en el input search
    function filterAndRender(){
        let palabrasDelBuscador = contenidoSearch.value.toLowerCase();
        let arregloFiltrado = filterName(palabrasDelBuscador)
        imprimirProductosFarmacia(arregloFiltrado)
    }
    
// filtra el nombre del producto puesto en el input search
    function filterName(parametro) {
        let arregloFiltrado = productosFarmacia.filter((producto) => {
                return producto.nombre.toLowerCase().includes(parametro)})
        return arregloFiltrado 
    }  
    
    document.querySelectorAll('.boton-agregar').forEach(element => {
        element.addEventListener('click', function() {
            var cantidad = this.parentElement.querySelector('.cantidad').value;
            var id = this.getAttribute('data-th');


        })
    });

}
