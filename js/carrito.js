document.getElementById("limpiar-carrito").addEventListener("click", function() {
    document.getElementById('carrito').innerHTML = "";
    localStorage.setItem("carrito", "");
});

document.querySelectorAll(".eliminar-producto").forEach(element => {
    element.addEventListener("click", function() {
        this.closest('.producto').innerHTML = "";
    })
});

getData()

async function getData(){
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
    .then (response => response.json())
    .then (data => {
    productos = data.response})

var html = "";

productosCarrito = JSON.parse(localStorage.getItem("carrito"));
html = getCarritoHtml(productosCarrito, productos);

document.getElementById('carrito').innerHTML = html;




function getCarritoHtml(productosCarrito , productos){
        var htmlProductos = '';
        productosCarrito.forEach(element => {
            for (var i = 0; productos.length > i; i++) {
            if(element.id == productos[i]._id){
html += `
<div class="producto">
            <div class="titulo-producto">
                <h3> ${productos[i].nombre}</h3>
            </div>
            <div class="img-producto">
                <img src="${productos[i].imagen}"
                    alt="imgproducto">
            </div>
            <div>
                <label for="cantidad">Cantidad</label>
                <input type="number" name="cantidad" value="${element.cantidad}">
                <p>Precio: $ ${productos[i].precio}</p>
                <p>Subtotal: $ ${element.cantidad * productos[i].precio} </p>
            </div>
            <button class="eliminar-producto">Eliminar</button>
        </div>`
            }  
        }

           });
           return html;
    }

        

}

