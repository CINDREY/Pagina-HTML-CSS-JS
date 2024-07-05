document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'http://localhost:8080/productos';
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codigoProd = urlParams.get('codigoProd');

    if (codigoProd) {
        fetch(`${apiUrl}/${codigoProd}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('codigoProd').value = data.codigoProd;
                document.getElementById('nombreProd').value = data.nombreProd;
                document.getElementById('marca').value = data.marca;
                document.getElementById('costo').value = data.costo;
                document.getElementById('cantidadDisponible').value = data.cantidadDisponible;
            })
            .catch(error => console.error('Error al cargar el producto:', error));
    }

    // Update product on form submission
    document.getElementById('producto-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const updatedProduct = {
            codigoProd: document.getElementById('codigoProd').value,
            nombreProd: document.getElementById('nombreProd').value,
            marca: document.getElementById('marca').value,
            costo: document.getElementById('costo').value,
            cantidadDisponible: document.getElementById('cantidadDisponible').value
        };

        fetch(`${apiUrl}/editar/${codigoProd}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        })
        .then(response => {
            if (response.ok) {
                window.location.href = 'VerProd.html';
            } else {
                console.error('Error al actualizar el producto');
            }
        })
        .catch(error => console.error('Error al actualizar el producto:', error));
    });

    // Fetch product details on page load
    fetchProducto();
});