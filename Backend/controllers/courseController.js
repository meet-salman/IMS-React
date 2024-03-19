import express from "express";
import mongoose from "mongoose";
import Course from '../models/courseModel.js'
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();


// Fetch All Courses Data
//  GET: localhost:3000/courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).send({ message: 'Courses Fetched Successfully!', courses: courses });

    } catch (error) {
        res.status(404).send({ message: 'No Courses Found!' });
    }
})


// Add Course
//  POST: localhost:3000/courses/add
router.post('/add', verifyToken, async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(200).send({ message: 'Course Added Successfully!', course: course });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
})


// Edit
//  PUT: localhost:3000/courses/:id
router.put('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid Course ID!" });
    }

    try {
        const course = await Course.findByIdAndUpdate(id, { ...req.body });

        // Error if data not found 
        if (!course)
            return res.status(404).send({ message: "No Course Found!" });

        // Data updated
        return res.status(200).send({ message: "Course Updated Successfully!" });
    } catch (error) {
        return res.status(200).send({ message: error.message });
    }
})


// Delete
//  PUT: localhost:3000/courses/:id
router.delete('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid Course ID!" });
    }

    try {
        const course = await Course.findByIdAndDelete(id, { ...req.body });

        // Error if data not found 
        if (!course)
            return res.status(404).send({ message: "No Course Found!" });

        // Data updated
        return res.status(200).send({ message: "Course Deleted Successfully!" });
    } catch (error) {
        return res.status(200).send({ message: error.message });
    }
})





export default router