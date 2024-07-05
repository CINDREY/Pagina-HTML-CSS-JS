document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'http://localhost:8080/productos';

    // Carga inicial de productos
    fetchProductos();

    // Añadir eventos a los botones después de cargar los productos
    function addEventListeners() {
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', handleEdit);
        });
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', handleDelete);
        });
    }

    // Manejo del clic en el botón editar
    function handleEdit(event) {
        const id = event.target.getAttribute('data-id');
        window.location.href = `editarProd.html?codigoProd=${id}`;
    }

    // Manejo del clic en el botón eliminar
    function handleDelete(event) {
        const id = event.target.getAttribute('data-id');
        if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            fetch(`${apiUrl}/eliminar/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    alert('Producto eliminado exitosamente');
                    fetchProductos(); // Recargar los productos
                } else {
                    throw new Error('Falló la eliminación del producto');
                }
            })
            .catch(error => {
                alert('Error al eliminar el producto');
                console.error('Error:', error);
            });
        }
    }

    // Función para cargar productos y opcionalmente filtrarlos
    function fetchProductos(searchQuery = '') {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayProductos(data, searchQuery);
            })
            .catch(error => console.error('Error al cargar los productos:', error));
    }

    // Función para mostrar productos en la tabla
    function displayProductos(products, searchQuery = '') {
        const tableBody = document.querySelector('#productos-table tbody');
        tableBody.innerHTML = ''; // Limpiar filas existentes
        const filteredProducts = products.filter(product => product.nombreProd.toLowerCase().includes(searchQuery.toLowerCase()));
        filteredProducts.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.codigoProd}</td>
                <td>${product.nombreProd}</td>
                <td>${product.marca}</td>
                <td>${product.costo}</td>
                <td>${product.cantidadDisponible}</td>
                <td>
                    <button class="btn btn-primary btn-sm edit-btn" data-id="${product.codigoProd}">Editar</button>
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${product.codigoProd}">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
        addEventListeners(); // Asegurar que los nuevos botones tengan eventos
    }

    // Función para manejar el formulario de búsqueda
    document.querySelector('.search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const searchQuery = document.querySelector('#searchInput').value.trim();
        fetchProductos(searchQuery); // Recargar productos con el filtro aplicado
    });
});