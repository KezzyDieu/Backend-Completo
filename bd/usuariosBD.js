// Importa el objeto `usuariosBD` que probablemente se usa para interactuar con Firebase.
const {usuariosBD} = require("./conexion");
// Importa la clase `Usuario` desde otro archivo.
const Usuario = require("../clases/Usuario");
// Importa funciones relacionadas con la validación y encriptación de contraseñas.
const {validarPassword, encriptarPassword} = require("../middlewares/funcionesPassword");
// Importa una función `is` para verificar tipos de datos.
const { is } = require("type-is");


// Función para validar que un objeto `usuario` tiene los atributos necesarios.
function validar(usuario){
    var valido = false;
    // Verifica que los campos 'nombre', 'usuario', y 'password' no sean indefinidos.
    if (usuario.nombre != undefined && usuario.usuario != undefined && usuario.password != undefined) {
        valido = true;
    }
    return valido;
}

// Función asíncrona que obtiene todos los usuarios de la base de datos.
async function mostrarUsuarios(){
    // Obtiene los usuarios de la base de datos.
    const usuarios = await usuariosBD.get();
    
    // Arreglo que almacenará los usuarios válidos.
    usuariosValidos = [];
    
    // Itera sobre cada usuario.
    usuarios.forEach(usuario => {
        // Crea una instancia de la clase `Usuario` con los datos del usuario extraído.
        const usuario1 = new Usuario({id: usuario.id, ...usuario.data()});
        
        // Valida si el usuario tiene todos los campos requeridos.
        if (validar(usuario1.datos)) {
            // Si es válido, lo agrega a la lista de usuarios válidos.
            usuariosValidos.push(usuario1.datos);
        }
    });
    
    // Retorna el arreglo con los usuarios válidos.
    return usuariosValidos;
}

// Función asíncrona que busca un usuario por su ID.
async function buscarPorId(id){
    var usuarioValido;
    
    // Busca al usuario en la base de datos usando su ID.
    const usuario = await usuariosBD.doc(id).get();
    
    // Crea una instancia de la clase `Usuario` con los datos del usuario encontrado.
    const usuario1 = new Usuario({id: usuario.id, ...usuario.data()});
    
    // Si el usuario es válido, lo almacena en `usuarioValido`.
    if (validar(usuario1.datos)) {
        usuarioValido = usuario1.datos;
    }
    
    // Retorna el usuario válido (si existe).
    return usuarioValido;
}

// Función asíncrona para crear un nuevo usuario.
async function nuevoUsuario(data) {
    // Encripta la contraseña del usuario antes de almacenarla.
    const {hash, salt} = encriptarPassword(data.password);
    
    // Reemplaza la contraseña por su versión encriptada y añade el salt.
    data.password = hash;
    data.salt = salt;
    
    // Asigna un tipo de usuario predeterminado ("usuario").
    data.tipoUsuario = "usuario";
    
    // Crea una instancia de `Usuario` con los datos proporcionados.
    const usuario1 = new Usuario(data);
    
    var usuarioValido = {};
    var usuarioGuardado = false;
    
    // Si los datos del usuario son válidos, los guarda en la base de datos.
    if (validar(usuario1.datos)) {
        usuarioValido = usuario1.datos;
        await usuariosBD.doc().set(usuarioValido);
        usuarioGuardado = true;
    }
    
    // Retorna un booleano indicando si el usuario fue guardado exitosamente.
    return usuarioGuardado;
}

// Función asíncrona para borrar un usuario por su ID.
async function borrarUsuarios(id) {
    var usuarioBorrado = true;
    
    // Busca al usuario en la base de datos usando su ID.
    if (await buscarPorId(id) != undefined) {
        console.log("Se borrará el usuario");
        
        // Borra al usuario de la base de datos si existe.
        await usuariosBD.doc(id).delete();
    }
    
    // Retorna un booleano indicando que el usuario fue borrado (por defecto `true`).
    return usuarioBorrado;
}

module.exports ={
    mostrarUsuarios,
    nuevoUsuario,
    borrarUsuarios,
    buscarPorId,
}

// Prueba con datos de ejemplo para crear un nuevo usuario
/*var data = {
    nombre: "Morelos Pavon",
    usuario: "More",
    password: "More*1900"
}*/

//borrarUsuarios("103"); // Elimina el usuario con ID "103"
//mostrarUsuarios(); // Llama a la función para mostrar usuarios
//buscarPorId("102"); // Busca al usuario con ID "102"
//nuevoUsuario(data); // Crea un nuevo usuario con los datos proporcionados
