document.getElementById("limpiar-carrito").addEventListener("click", function() {
    document.getElementById('carrito').innerHTML = "";
});

document.querySelectorAll(".eliminar-producto").forEach(element => {
    element.addEventListener("click", function() {
        this.closest('.producto').innerHTML = "";
    })
});



