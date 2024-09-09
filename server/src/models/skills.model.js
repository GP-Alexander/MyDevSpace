import mongoose from "mongoose";
import { Schema } from "mongoose";

// Definición del esquema para las habilidades
const skillsSchema= new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    level: {
        type: String,
        required: true,
        enum: ["beginner", "intermediate", "advanced"]

    },
    category: {
        type: String,
        required: true,
        trim: true
    }


    

})

export default mongoose.model("Skills", skillsSchema);
