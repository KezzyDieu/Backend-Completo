// Requerimos el paquete que instalamos llamado "firebase-admin"
const admin = require("firebase-admin");
// Cargamos las credenciales de Firebase desde un archivo JSON
const keys = require("../keys.json");


// Iniciamos la conexión con Firebase utilizando las credenciales proporcionadas
admin.initializeApp({
    credential: admin.credential.cert(keys) // Autenticamos con un certificado de servicio
});

// Nos conectamos a Firebase Firestore (la base de datos NoSQL de Firebase)
const bd = admin.firestore();

// Llamamos a la colección "miejemploBD" en Firestore, donde se almacenan los datos de usuarios
const usuariosBD = bd.collection("miejemploBD");

// Llamamos a la colección "productos" en Firestore, donde se almacenan los datos de productos
const productosBD = bd.collection("productos");

// Llamamos a la colección "ventas" en Firestore, donde se almacenan los datos de las ventas generadas
const ventasBD = bd.collection("ventas");

// Exportamos las colecciones para que puedan ser utilizadas en otros módulos del proyecto
module.exports = {
    usuariosBD,
    productosBD,
    ventasBD,
}

// console.log(usuariosBD); 
