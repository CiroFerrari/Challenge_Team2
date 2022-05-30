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
                        <div class="producto">
                            <img src="${producto.imagen}"  alt="imagen-farmacia">
                            <div>
                                <h5>${producto.nombre}</h5>
                                <p>${producto.descripcion}</p>
                                <p style="color: red;">Stock: ${producto.stock}  Ultimas unidades!!</p>
                                <div class="padre">
                                    <p>Precio: $ ${producto.precio}</p>
                                    <label>Cantidad:</label>
                                    <input type="number" class="cantidad" name="cantidad" value="1">
                                    <button class="boton-agregar" type="button" data-th="${producto._id}">Agregar al carrito</button>
                                </div>
                            </div>
                        </div>
                        `
                    } else {
                        nuevoHtml+=`
                        <div class="producto">
                            <img src="${producto.imagen}"  alt="imagen-farmacia">
                            <div>
                                <h5>${producto.nombre}</h5>
                                <p>${producto.descripcion}</p>
                                <p>Stock: ${producto.stock}</p>
                                <div class="padre">
                                    <p>Precio: $ ${producto.precio}</p>
                                    <label>Cantidad:</label>
                                    <input type="number" class="cantidad" name="cantidad" value="1">
                                    <button class="boton-agregar" type="button" data-th="${producto._id}">Agregar al carrito</button>
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
