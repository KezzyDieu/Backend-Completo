// Requerimos el módulo 'console' para usar funciones de logging
const { log } = require("console");

// Requerimos el módulo 'crypto' para encriptación y generación de hash
const crypto = require("crypto");

// Función para encriptar una contraseña utilizando un salt y el algoritmo 'scryptSync'
function encriptarPassword(password) {
    // Genera un salt aleatorio de 32 bytes convertido a hexadecimal
    const salt = crypto.randomBytes(32).toString("hex");
    // console.log(salt);

    // Genera un hash encriptado de la contraseña utilizando el salt y el algoritmo 'sha512'
    const hash = crypto.scryptSync(password, salt, 100000, 64, "sha512").toString("hex");
    // console.log(hash); 

    // Devuelve el salt y el hash generados
    return {
        salt,
        hash,
    }
}

// Función para validar si una contraseña ingresada genera el mismo hash que el almacenado
function validarPassword(password, salt, hash) {
    // Genera un hash basado en la contraseña ingresada y el salt almacenado
    const hashEvaluar = crypto.scryptSync(password, salt, 100000, 64, "sha512").toString("hex");
    // console.log(5==3); 

    // Compara el hash generado con el hash almacenado y retorna true si son iguales
    return hashEvaluar == hash;
}

// Función de ejemplo para actualizar el usuario (vacía por ahora)
function usuarioActualizado() {
    // Lógica futura para actualizar un usuario
}

// Función de ejemplo para verificar si el usuario es un administrador autorizado (vacía por ahora)
function adminAutorizado() {
    // Lógica futura para verificar permisos de administrador
}

// Exportamos las funciones para que puedan ser utilizadas en otros módulos del proyecto
module.exports = {
    encriptarPassword,
    validarPassword,
    usuarioActualizado,
    adminAutorizado,
}

// encriptarPassword("abc"); 
// validarPassword(); 
