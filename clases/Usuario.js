class Usuario {
    constructor(data) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.usuario = data.usuario;
        this.password = data.password;
    }

    // Setters
    set id(id) {
        this._id = id;
    }

    set nombre(nombre) {
        this._nombre = nombre;
    }

    set usuario(usuario) {
        this._usuario = usuario;
    }

    set password(password) {
        this._password = password;
    }

    // Getters
    get id() {
        return this._id;  // Corrección: Solo devolvemos `this._id`
    }

    get nombre() {
        return this._nombre;
    }

    get usuario() {
        return this._usuario;
    }

    get password() {
        return this._password;
    }

    // Método para obtener todos los datos del usuario
    get datos() {
        return {
            id: this.id,
            nombre: this.nombre,
            usuario: this.usuario,
            password: this.password
        };
    }
}

module.exports = Usuario;
