import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config/env.js";
const { Schema } = mongoose;


const studentSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: [true, " Email is required!"],
        unique: [true, "Email Already in Use!"]
    },
    contactNo: {
        type: String,
        length: 11,
        required: [true, " Email is required!"],
        unique: [true, "Email Already in Use!"]
    },
    course: {
        type: String,
        required: true
    },
    enrollDate: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'student',
    },
    password: {
        type: String,
        required: true
    },
    tokens: {
        default: [],
        type: []
    }
});


// Password Hashing
studentSchema.pre('save', function (next) {
    const student = this;

    if (student.isModified('password')) {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(student.password, salt);

        student.password = hash;
    }

    next();
});


// Password Compare
studentSchema.methods.comparePassword = function (password) {
    const student = this;

    return bcrypt.compareSync(password, student.password);
};


// Generate Token
studentSchema.methods.generateToken = function () {
    const id = this._id;
    const token = jwt.sign({ id }, JWT_SECRET);

    return token;
};



const studentModel = mongoose.model('Student', studentSchema);
export default studentModel;