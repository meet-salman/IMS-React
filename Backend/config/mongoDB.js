import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";

mongoose.connect(MONGO_URI);

export default mongoose