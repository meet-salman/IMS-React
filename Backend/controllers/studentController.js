import express from "express";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import Student from "../models/studentModel.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();


// Fetch All Students Data
//  GET: localhost:3000/students
router.get('/', verifyToken, async (req, res) => {

    try {
        const students = await Student.find();
        res.status(200).send({ message: "Students Fetched Successfully!", students: students });

    } catch (error) {
        res.status(404).send({ message: 'No Students Found!' });
    }
});


// Register
//  POST: localhost:3000/students/register
router.post('/register', async (req, res) => {

    try {

        const { email } = req.body;
        const isExist = await Student.findOne({ email });

        if (isExist)
            return res.status(400).send({ message: 'Email is already exist!' });

        const student = await Student.create(req.body);
        res.status(200).send({ message: "SignUp Succesfully!", student: student });

    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
});


// Login 
//  PUT: localhost:3000/students/login
router.put('/login', async (req, res) => {

    try {
        const { email, password } = req.body;
        const student = await Student.findOne({ email });

        // Check Email Exist or Not
        if (!student)
            return res.status(404).send({ message: 'Invalid Email!' })


        // Password Compare
        const isCorrectPassword = student.comparePassword(password);
        if (!isCorrectPassword)
            return res.status(400).send({ message: 'Invalid Password!' })


        // Generate Token
        const token = student.generateToken();
        student.tokens.push(token);
        await student.save();


        // Student Logged In
        res.status(200).send({ message: "Logged In Succesfully!", student: student });
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
});


// Logout 
//  PUT: localhost:3000/students/logout
router.put('/logout', verifyToken, async (req, res) => {
    await Student.findByIdAndUpdate(req.userId, { $pull: { tokens: req.tokenToRemove } })
    res.send({ message: 'Logged out successfully!' })
})


// Edit
//  PUT: localhost:3000/students/:id
router.put('/:id', verifyToken, async (req, res) => {

    const { id } = req.params;

    // Checking ID is Valid or Not
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).send({ message: "Invalid Student ID!" });

    // Password Hashing if edited
    if ('password' in req.body) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash;
    }

    try {
        const student = await Student.findByIdAndUpdate(id, { ...req.body });

        // Error if data not found 
        if (!student)
            return res.status(404).send({ message: "No Student Data Found!" });

        // Data updated
        return res.status(200).send({ message: "Student Data Updated!" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }


});


// Delete
//  DELETE: localhost:3000/students/:id
router.delete('/:id', verifyToken, async (req, res) => {

    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);

    // Checking  ID valid or not
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).send({ message: "Invalid Student ID!" });

    try {
        // Error if data not found 
        if (!student)
            return res.status(404).send({ message: "No Student Data Found!" });

        // Data deleted
        return res.status(200).send({ message: "Student Data Deleted!" })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

})






export default router