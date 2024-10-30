const express = require("express");
const cors = require("cors");
const usuariosRutas = require("./rutas/rutasUsuarios");
const productosRutas = require("./rutas/rutasProductos");
const ventasRutas = require("./rutas/rutasVentas");

const app = express();

// Aceptar datos en formato x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Aceptar datos en formato JSON
app.use(express.json());
app.use(cors());

app.use("/", usuariosRutas);
app.use("/", productosRutas);
app.use("/", ventasRutas);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Servidor en http://localhost:" + port);
});
