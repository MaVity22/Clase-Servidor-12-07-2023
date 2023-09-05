const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [
            true,
            "Username is required"
        ]
    },
    email: {
        type: String,
        required: [
            true,
            "Email is required"
        ],
        unique: true,
        validate: {
            validator: val => {
                const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/;
                return emailReg.test(val);
            },
            message: "Invalid email"
        }
    },
    age: {
        type: Number,
        required: [
            true,
            "Age is required"
        ],
        validate: {
            validator: val => val >= 18,
            message: "Age must be higher or equal to 18"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
},
    {
        timestamps: true
    }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;