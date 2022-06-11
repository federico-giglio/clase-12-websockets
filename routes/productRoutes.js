const { Router } = require("express");
const productos = require("../controllers/productController");
const router = Router;

// GET '/api/productos' -> devuelve todos los productos.

router.get("/", (req, res) => {
    const datos = productos.getAll();
    res.json(datos);
})

// GET '/api/productos/:id' -> devuelve un producto según su id.

router.get("/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const datos = productos.getById(id);
    res.send(datos);
})

// POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.

router.post("/", (req, res) => {
    const datos = req.body
    productos.addItem(datos);
    res.redirect("../../");
})

// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.

router.put("/:id", (req, res) => {
    const productoId = parseInt(req.params.id);
    const datos = req.body;
    productos.updateItem(productoId, datos);
    res.json({producto: "se ha actualizado el producto"})
})

// DELETE '/api/productos/:id' -> elimina un producto según su id.

router.delete("/:productId", (req, res) => {
    const productoId = parseInt(req.params.id);
    productos.deleteItem(productoId)
    res.json({producto: "se ha eliminado el producto"})
})

// ERRORS

router.use((err, req, res, next) => {
    res.status(500).send({error: err.message});
});


module.exports = router;