// Importa el objeto `usuariosBD` que probablemente se usa para interactuar con Firebase.
const { usuariosBD } = require("./conexion");
// Importa la clase `Usuario` desde otro archivo.
const Usuario = require("../clases/Usuario");
// Importa funciones relacionadas con la validación y encriptación de contraseñas.
const { validarPassword, encriptarPassword } = require("../middlewares/funcionesPassword");
// Importa una función `is` para verificar tipos de datos.
const { is } = require("type-is");

// Función para validar que un objeto `usuario` tiene los atributos necesarios.
function validar(usuario) {
    return usuario.nombre !== undefined && usuario.usuario !== undefined && usuario.password !== undefined;
}

// Función asíncrona que obtiene todos los usuarios de la base de datos.
async function mostrarUsuarios() {
    const usuarios = await usuariosBD.get();  // Obtiene los usuarios de la base de datos
    const usuariosValidos = [];  // Arreglo para almacenar usuarios válidos

    usuarios.forEach(usuario => {
        const usuario1 = new Usuario({ id: usuario.id, ...usuario.data() });  // Crea una instancia de Usuario
        if (validar(usuario1.datos)) {  // Valida si el usuario tiene todos los campos requeridos
            usuariosValidos.push(usuario1.datos);  // Agrega a la lista de usuarios válidos
        }
    });

    return usuariosValidos;  // Retorna el arreglo con los usuarios válidos
}

// Función asíncrona que busca un usuario por su ID.
async function buscarPorId(id) {
    const usuario = await usuariosBD.doc(id).get();  // Busca al usuario en la base de datos

    if (!usuario.exists) {
        return null;  // Retorna null si no se encuentra el usuario
    }

    const usuario1 = new Usuario({ id: usuario.id, ...usuario.data() });  // Crea una instancia de Usuario

    if (validar(usuario1.datos)) {
        const { password, salt, ...usuarioSinPassword } = usuario1.datos;  // Excluye datos sensibles
        return usuarioSinPassword;  // Retorna el usuario sin datos sensibles
    }

    return null;  
}

// Función asíncrona para crear un nuevo usuario.
async function nuevoUsuario(data) {
    try {
        const { hash, salt } = encriptarPassword(data.password);  // Encripta la contraseña
        data.password = hash;  // Reemplaza la contraseña por su versión encriptada
        data.salt = salt;  // Añade el salt
        data.tipoUsuario = "usuario";  // Asigna un tipo de usuario predeterminado

        if (!data.id) {
            data.id = usuariosBD.doc().id;  // Genera un nuevo ID si no se proporciona uno
        }

        const usuario1 = new Usuario(data);  // Crea una instancia de Usuario

        if (validar(usuario1.datos)) {
            await usuariosBD.doc(usuario1.id).set(usuario1.datos);  // Guarda en la base de datos
            return true;  // Usuario guardado
        }
        return false;  // Datos no válidos
    } catch (error) {
        console.error("Error al crear usuario:", error);  // Manejo de errores
        throw error;  // Lanza el error para manejo superior
    }
}

// Función asíncrona para borrar un usuario por su ID.
async function borrarUsuarios(id) {
    const usuarioBorrado = true;

    if (await buscarPorId(id) != undefined) {
        console.log("Se borrará el usuario");  // Confirma que se borrará el usuario
        await usuariosBD.doc(id).delete();  // Borra el usuario de la base de datos
    }

    return usuarioBorrado;  // Retorna un booleano indicando que el usuario fue borrado
}

// Función asíncrona para modificar un usuario.
async function modificarUsuario(id, nuevosDatos) {
    try {
        const usuarioDoc = await usuariosBD.doc(id).get();  // Verifica si el usuario existe
        if (!usuarioDoc.exists) {
            throw new Error("Usuario no encontrado");  // Lanza error si no se encuentra
        }

        if (nuevosDatos.password) {
            const { hash, salt } = encriptarPassword(nuevosDatos.password);  // Encripta nueva contraseña
            nuevosDatos.password = hash;  // Reemplaza la antigua
            nuevosDatos.salt = salt;  // Actualiza el salt
        } else {
            // Elimina las claves de `password` y `salt` si no hay nueva contraseña
            delete nuevosDatos.password;
            delete nuevosDatos.salt;
        }

        await usuariosBD.doc(id).update(nuevosDatos);  // Actualiza los campos en la base de datos

        return { mensaje: "Usuario actualizado correctamente", id };  // Mensaje de éxito
    } catch (error) {
        console.error("Error al modificar usuario:", error);  // Manejo de errores
        throw error;  // Lanza el error
    }
}

module.exports = {
    mostrarUsuarios,
    nuevoUsuario,
    borrarUsuarios,
    buscarPorId,
    modificarUsuario,
};  
