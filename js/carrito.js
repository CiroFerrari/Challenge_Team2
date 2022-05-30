document.getElementById("limpiar-carrito").addEventListener("click", function() {
    document.getElementById('carrito').innerHTML = "";
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
console.log(dataArray);
html = getCarritoHtml(productosCarrito, productos);

document.getElementById('carrito').innerHTML = html;




function getCarritoHtml(productosCarrito , productos){


}

}