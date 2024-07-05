document.querySelector("#producto-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const producto = {
        codigoProd: document.getElementById("codigoProd").value,
        nombreProd: document.getElementById("nombreProd").value,
        marca: document.getElementById("marca").value,
        costo: document.getElementById("costo").value,
        cantidadDisponible: document.getElementById("cantidadDisponible").value
    };

    fetch("http://localhost:8080/productos/crear", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(producto)
    })
    .then(response => {
        if (response.ok) {
            // Verificar si la respuesta tiene un contenido JSON antes de procesarlo
            if (response.headers.get("Content-Type")?.includes("application/json")) {
                return response.json(); // Solo intenta analizar como JSON si la respuesta tiene contenido JSON
            } else {
                alert("Producto agregado con éxito!");
                document.querySelector("#producto-form").reset();
                return null; // No hay contenido para procesar
            }
        } else {
            throw new Error("Error en la solicitud: " + response.statusText);
        }
    })
    .then(data => {
        if (data) {
            console.log("Respuesta del servidor:", data);
        }
    })
    .catch(error => {
        console.error("Error al cargar producto:", error);
        alert("Error al cargar producto: " + error.message);
    });
});