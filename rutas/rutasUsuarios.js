var rutas = require("express").Router();
var {mostrarUsuarios, nuevoUsuario, borrarUsuarios, buscarPorId} = require("../bd/usuariosBD");
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

module.exports = rutas;