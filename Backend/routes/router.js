import express from "express";
const router = express.Router();
import students from '../controllers/studentController.js';
import courses from '../controllers/courseController.js';


router.use('/api/v1/students', students)
router.use('/api/v1/courses', courses)


export default router;