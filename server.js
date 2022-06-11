const express = require("express");
const { Server : IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const productRouter = require("./routes/productRoutes");
const { engine } = require("express.handlebars");
const productos = require("./controllers/productController");
const app = express();
const httpServer = new HttpServer(app);
const ioServer = new IOServer(httpServer);

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use("/api/productos", productRouter);
app.use(express.static("public"));

//HANDLEBARS
app.engine(".hbs", engine({
    extname:".hbs",
    defaultLayout:"index.hbs",
})
);
app.set("view engine", "hbs");
app.set("views", "./views");

app.get("/productos", (req, res) => {
    res.render("productList", { products: productos.getAll()});
});
app.get("/chat", async (req, res) => {
    res.render("chat", {messages: await chat.getAll()});
});

//WebSocket Handlebars
ioServer.on("connection", async (socket) => {
    console.log("new connection");
    socket.emit("init", productos.getAll());

socket.on("new_product", (new_product) => {
    productos.addItem(new_product);
    ioServer.sockets.emit("product_update", productos.getAll());
    });
socket.on("new_message", async (new_message) => {
    await chat.save(new_message);
    ioServer.sockets.emit("chat_update", await chat.getAll());
    });
});

httpServer.listen(8080, () => {
    console.log("Escuchando...")
});