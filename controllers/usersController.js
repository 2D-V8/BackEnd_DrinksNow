const User = require('../models/user');
const Rol = require('../models/rol');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const keys = require ('../config/keys');

module.exports = {

    login(req, res){

        const email = req.body.email;
        const password = req.body.password;

        User.finfByEmail(email, async (err, myUser) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Se genero un error con el registro del usuario',
                    error: err
                });
            }

            if (!myUser) {
                return res.status(401).json({ // Peticion no autorizada, cliente sin autorizacion para la peticion
                    success: false,
                    message: 'el email no fue encontrado',
                });
            }

            const isPasswordValid = await bcrypt.compare(password, myUser.password);

            if (isPasswordValid){
                const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {});
                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    birthdate: myUser.birthdate,
                    document: myUser.document,
                    email: myUser.email,
                    address: myUser.address,
                    session_token: `JWT ${token}`,
                    Roles: JSON.parse(myUser.Roles)
                }

                return res.status(201).json({
                    success: true,
                    message: 'el usuario fue autenticado',
                    data: data //id del nuevo usuario registrado.
                });
            }
            else{
                return res.status(401).json({ // Peticion no autorizada, cliente sin autorizacion para la peticion
                    success: false,
                    message: 'la contraseña es incorrecta',
                });
            }

            
        });

    },

    register(req, res) {
    const user = req.body;

    User.create(user, async (err, insertId) => {
        if (err) {
            return res.status(501).json({
                success: false,
                message: 'Se generó un error con el registro del usuario',
                error: err
            });
        }

        // Asignamos el id al objeto user que ya tenías
        user.id = insertId;

        // Generamos el token con el id y email
        const token = jwt.sign({ id: user.id, email: user.email }, keys.secretOrKey, {});
        user.session_token = `JWT ${token}`;

        // Registramos el rol con el ID correcto
        Rol.create(user.id, 3, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Se generó un error con el registro del rol de usuario',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'Se realizó el registro correctamente',
                data: {
                    id: user.id,
                    session_token: user.session_token
                }
            });
        });
    });
}

}