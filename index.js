const express = require('express');
const app = express();

// Habilita el middleware para procesar JSON
app.use(express.json());

let productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 30 }
];

// Obtener todos los productos
app.get('/productos', (req, res) => {
    res.json(productos);
}); 

// Agregar un nuevo producto (POST)
app.post('/productos', (req, res) => {
    const nuevoProducto = req.body;
    nuevoProducto.id = productos.length + 1; // Asignar un nuevo ID
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

// Actualizar un producto existente (PUT)
app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productoIndex = productos.findIndex(p => p.id === id);
    if (productoIndex !== -1) {
        productos[productoIndex] = { ...productos[productoIndex], ...req.body };
        res.json(productos[productoIndex]);
    } else {
        res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
});

// Eliminar un producto (DELETE)
app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productoIndex = productos.findIndex(p => p.id === id);
    if (productoIndex !== -1) {
        productos = productos.filter(p => p.id !== id);
        res.json({ mensaje: 'Producto eliminado' });
    } else {
        res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
