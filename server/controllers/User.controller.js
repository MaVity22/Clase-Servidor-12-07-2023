const User = require('../models/User.model');
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


module.exports.createUser = async (request, response) => {
    const { userName, email, age, password } = request.body;
    if (!userName || !email || !password) {
        response.status(400).json({ message: 'Missing fields, all are mandatory!' });
    }
    else {
        const userFound = await User.findOne({ email });
        if (userFound) {
            response.status(400).json({ message: 'User already exist' });
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            User.create({
                userName, email, age, password: hashedPassword
            })
                .then(user => response.json({
                    email: user.email, userName: user.userName,
                    _id: user._id, token: generateToken(user._id)
                }))
                .catch(err => response.status(400).json(err));
        }
    }
};

module.exports.getAllUsers = (_, response) => {
    // Se obtienen los usuarios ordenados de forma ascendemte, en función de su edad
    User.find({}).sort({ age: 1 })
        .then(user => response.json(user))
        .catch(err => response.json(err))
}

module.exports.getUser = (request, response) => {
    User.findOne({ _id: request.params.id })
        .then(user => response.json(user))
        .catch(err => response.json(err))
}

module.exports.updateUser = (request, response) => {
    User.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true })
        .then(updatedUser => response.json(updatedUser))
        .catch(err => response.json(err))
}

module.exports.deleteUser = (request, response) => {
    User.deleteOne({ _id: request.params.id })
        .then(userDeleted => response.json(userDeleted))
        .catch(err => response.json(err))
}

// Función para generar el token del Id
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}
// Controlador para el inicio de sesión. Comparación entre contraseñas.
module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });
    //console.log('Usuario encontrado: ', userFound);
    if (userFound && (await bcrypt.compare(password, userFound.password))) {
        res.json({ message: 'Login User', email: userFound.email, userName: userFound.userName, token: generateToken(userFound._id) })
    } else {
        res.status(400).json({ message: 'Login Failed' })
    }
}