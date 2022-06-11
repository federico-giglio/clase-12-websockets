class Contenedor {
    constructor() {
        this.datos = []
    }
getAll() {
    return this.datos;
}

//Obtener ID del item
getId (items) {
    const proximoId = items[items.length - 1].id + 1;
    return proximoId;
}

//Obtener un item por su ID
getById(id) {
    const item = this.datos.find((x => x.id === id));
    if(!item) {
        const error = new Error('Producto no encontrado')
        throw error;
    }
    return item;
}

//Agregar un item
addItem(item) {
    item.id = this.getId(this.datos);
    this.datos.push(item);
}

//Actualizar un item (se utilizará para método PUT)
updateItem(id, newDatos) {
    if(!newDatos.title || !newDatos.price || !newDatos.thumbnail) {
    const error = new Error('Ingrese la totalidad de los datos requeridos.')
    throw error;
    }
    const item = this.getById(id);
        for (let x in item) {
        if (x !== "id") item[x] = newDatos[x];
    }
}

//Eliminar un item por su id (se utilizará para método DELETE)
deleteItem(id) {
    this.datos.filter((item) => item.id !== id);
}
}

const productos = new Contenedor();

productos.datos = [
    {"title":"Harina","price":"150","thumbnail":"https://cdn-icons-png.flaticon.com/512/527/527760.png","id":1},
    {"title":"Jamon","price":"120","thumbnail":"https://www.lajamoneria.org/wp-content/uploads/2014/05/jamon-sevilla-ico.png","id":2},
    {"title":"Chocolate","price":"180","thumbnail":"https://cdn-icons-png.flaticon.com/512/2234/2234816.png","id":3},
    {"title":"Queso","price":"220","thumbnail":"https://cdn-icons.flaticon.com/png/512/3199/premium/3199950.png?token=exp=1654301135~hmac=6de825e087c575e9b0140ee58f3fa39c","id":4},
    {"title":"Maiz","price":"80","thumbnail":"https://cdn-icons-png.flaticon.com/512/736/736877.png","id":5}
]

module.exports = productos