const jwt = require('jsonwebtoken');

const SECRET = 'melina'

exports.generateToken = (data) => {
    return jwt.sign(data, SECRET, { expiresIn: 300 });
}

exports.authorize = function (req, res, next) {
    var token = req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Token de acesso não informado!'
        });
    } else {
        jwt.verify(token, SECRET, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                next();
            }
        });
    }
};




