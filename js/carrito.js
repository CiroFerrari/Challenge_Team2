document.getElementById("limpiar-carrito").addEventListener("click", function () {
    document.getElementById('carrito').innerHTML = "";
    localStorage.setItem("carrito", "");
});

document.querySelectorAll(".eliminar-producto").forEach(element => {
    element.addEventListener("click", function () {
        this.closest('.producto').innerHTML = "";
    })
});

getData()

async function getData() {
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then(response => response.json())
        .then(data => {
            productos = data.response
        })

    var html = "";

    productosCarrito = JSON.parse(localStorage.getItem("carrito"));
    html = getCarritoHtml(productosCarrito, productos);

    document.getElementById('carrito').innerHTML = html;




    function getCarritoHtml(productosCarrito, productos) {
        var htmlProductos = '';
        productosCarrito.forEach(element => {
            for (var i = 0; productos.length > i; i++) {
                if (element.id == productos[i]._id) {
                    html += `
                            <div class="product card mb-3 mx-2 d-flex flex-column justify-content-between align-items-center py-3" style="width: 20rem; height: 35rem;">
                                <img class="card-img-top" style = "width: 75%;" src="${productos[i].imagen}" alt="imgproducto">
                                <div class="d-flex flex-column justify-content-between align-items-center">
                                    <h4 class="card-title text-center"> ${productos[i].nombre}</h4>
                                </div>
                                <div class="d-flex flex-column justify-content-end align-items-center">
                                    <div class="d-flex flex-row justify-content-center my-3">
                                        <label class="me-3" for="cantidad">Cantidad</label>
                                        <input class="ps-1" type="number" name="cantidad" value="${element.cantidad}">
                                    </div>
                                    <p class="mt-2">Precio: $ ${productos[i].precio}</p>
                                    <p class="mb-2">Subtotal: $ ${element.cantidad * productos[i].precio} </p>
                                    <button class=" btn btn-danger mt-2">Eliminar</button>
                                </div>
                            </div>`
                }
            }
        });
        return html;
    }
}
/* `
                        <div class="product card m-2 d-flex flex-column justify-content-between align-items-center" style="width: 20rem; height: 40rem;">
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
                                        <button class="boton-agregar btn btn-danger mt-2" type="button" data-th="${producto._id}">Agregar al carrito</button>
                                    </div>
                                </div>
                        </div>
                        ` */
