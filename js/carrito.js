document.getElementById("limpiar-carrito").addEventListener("click", function () {
    document.getElementById('carrito').innerHTML = '<p class="fs-2 text-center">¡Su carrito está vacío!</p>';
    document.getElementById('total').innerHTML = '$0';

    localStorage.setItem("carrito", "");
});
document.getElementById("finalizar").addEventListener("click", function () {
    document.getElementById('carrito').innerHTML = '<p class="fs-1 text-center">¡Su compra fue exitosa!</p>';
    document.getElementById('total').innerHTML = '$0';

    localStorage.setItem("carrito", "");
});


getData()

async function getData() {
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then(response => response.json())
        .then(data => {
            productos = data.response
        })

    var html = "";

    if (localStorage.getItem("carrito") != ""){
         productosCarrito = JSON.parse(localStorage.getItem("carrito"));
        html = getCarritoHtml(productosCarrito, productos); 
        document.getElementById('carrito').innerHTML = html;
    }
  

if(html == ""){
    document.getElementById('carrito').innerHTML = '<p class="fs-2 text-center">¡Su carrito está vacío!</p>';
    document.getElementById('total').innerHTML = '$0';
}


document.querySelectorAll(".eliminar-producto").forEach(element => {
    element.addEventListener("click", function () {
        document.getElementById('carrito').innerHTML = "";
        productosCarrito = JSON.parse(localStorage.getItem("carrito"));
        
        for(var i=0; productosCarrito.length > i; i++){
            if(this.getAttribute('data-th') == productosCarrito[i].id){
                productosCarrito[i] = {id: 0, cantidad: 0};
            }
        }
        var carrito = JSON.stringify(productosCarrito);
        localStorage.setItem("carrito", carrito);

        location.reload();  
    })


});


    function getCarritoHtml(productosCarrito, productos) {
        var htmlProductos = '';
        var totalPrice = 0;
        
        
        productosCarrito.forEach(element => {
            for (var i = 0; productos.length > i; i++) {
                if (element.id == productos[i]._id) {
                    var cantidad = element.cantidad;
                    if(cantidad > productos[i].stock){
                        cantidad = productos[i].stock;
                    }
                    html += `
                            <div class="product card mb-3 mx-2 d-flex flex-column justify-content-between align-items-center py-3" style="width: 20rem; height: 35rem;">
                                <img class="card-img-top" style = "width: 75%;" src="${productos[i].imagen}" alt="imgproducto">
                                <div class="d-flex flex-column justify-content-between align-items-center">
                                    <h4 class="card-title text-center"> ${productos[i].nombre}</h4>
                                </div>
                                <div class="d-flex flex-column justify-content-end align-items-center">
                                    <div class="d-flex flex-row justify-content-center my-3">
                                        <label class="me-3" for="cantidad">Cantidad</label>
                                        <p>${cantidad}</p>
                                    </div>
                                    <p class="mt-2">Precio: $ ${productos[i].precio}</p>
                                    <p class="mb-2">Subtotal: $ ${cantidad * productos[i].precio} </p>
                                    <button data-th="${element.id}" class="eliminar-producto btn btn-danger mt-2">Eliminar</button>
                                </div>
                            </div>`;

                            totalPrice = totalPrice + cantidad * productos[i].precio;  
                }
            }
        });

        document.getElementById('total').innerHTML = '$'+totalPrice;
        return html;
    }
}