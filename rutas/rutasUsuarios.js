var rutas = require("express").Router();
var {mostrarUsuarios, nuevoUsuario, borrarUsuarios, buscarPorId, modificarUsuario} = require("../bd/usuariosBD");
//var {Router} = require("express");

rutas.get("/", async (req, res)=>{
    //res.send("Hola estas en raiz");
    var usuariosValidos = await mostrarUsuarios();
    //console.log(usuariosValidos);
    res.json(usuariosValidos);
    
});

rutas.get("/buscarPorId/:id", async (req, res)=>{
    var usuarioValido = await buscarPorId(req.params.id);
    res.json(usuarioValido);
});

rutas.post("/nuevoUsuario", async (req, res)=>{
    console.log(req.body);
    var usuarioGuardado = await nuevoUsuario(req.body);
    res.json(usuarioGuardado);
});

rutas.delete("/borrarUsuario/:id", async (req, res)=>{
    var usuarioBorrado = await borrarUsuarios(req.params.id);
    res.json(usuarioBorrado);
});

rutas.put("/modificarUsuario/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const nuevosDatos = req.body;
        
        // Llama a la función modificarUsuario con el ID y los nuevos datos.
        const resultado = await modificarUsuario(id, nuevosDatos);
        console.log("Edición realizada correctamente");
        res.json(resultado);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});


module.exports = rutas;