import mongoose from "mongoose";
import { Schema } from "mongoose";

const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    courseBy: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const courseModel = mongoose.model('Course', courseSchema);
export default courseModel;