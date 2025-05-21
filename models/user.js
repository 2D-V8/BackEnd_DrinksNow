const db = require('../config/config');
const bcrypt = require('bcryptjs');

const User = {};

User.finfById = (id, result) => {
    const sql = `
        SELECT 
           U.id,
           U.email,
           U.name,
           U.birthdate,
           U.document,
            U.password,
            U.address,
            json_arrayagg(
            json_object(
                'id', CONVERT(R.id, char),
                'name', R.name,
                'image', R.image,
                'route', R.route
                )
            ) as Roles
            FROM
                users as U
            INNER JOIN 
                user_hash_roles as Us on Us.id_user = U.id
            INNER JOIN 
                roles as R on R.id = Us.id_rol
            WHERE 
                id = ?
            GROUP BY 
            U.id
    `;

    db.query(
        sql,
        [id], 
        (err,user) => {
            if (err) {
                console.log('Error:', err);
                result(err,null);
            }
            else{
                console.log(' Usuario Obtenido:', user[0]);
                result(null, user[0]);
            }
        } 
    )
}

User.finfByEmail = (email, result) => {
    const sql = `
        SELECT 
           U.id,
           U.email,
           U.name,
           U.birthdate,
           U.document,
            U.password,
            U.address,
            json_arrayagg(
            json_object(
                'id', CONVERT(R.id, char),
                'name', R.name,
                'image', R.image,
                'route', R.route
                )
            ) as Roles
            FROM
                users as U
            INNER JOIN 
                user_hash_roles as Us on Us.id_user = U.id
            INNER JOIN 
                roles as R on R.id = Us.id_rol
            WHERE 
                email = ?
            GROUP BY 
            U.id
    `;

    db.query(
        sql,
        [email], 
        (err,user) => {
            if (err) {
                console.log('Error:', err);
                result(err,null);
            }
            else{
                console.log(' Usuario Obtenido:', user[0]);
                result(null, user[0]);
            }
        } 
    )
}

User.create = async (user, result) => {

    const hash = await bcrypt.hash(user.password, 10);

    const sql = `
        INSERT INTO
            users(
                name,
                birthdate,
                document,
                email,
                address,
                password,
                created_at,
                updated_at
            )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)
    
    `;

   db.query
   (
        sql,
        [
            user.name,
            user.birthdate,
            user.document,
            user.email,
            user.address,
            hash,
            new Date(),
            new Date()
        ],
        (err,res) => {
            if (err) {
                console.log('Error:', err);
                result(err,null);
            }
            else{
                console.log('Id del nuevo usuario: ', res.insertId);
                result(null, res.insertId);
            }
        } 
        
   ) 

}

module.exports = User;