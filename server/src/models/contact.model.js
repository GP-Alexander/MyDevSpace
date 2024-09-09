import mongoose from "mongoose";
import { Schema } from "mongoose";

// Definición del esquema para los contactos
const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
},
    {
        timestamps: true
    }
);

export default mongoose.model('Contact', contactSchema);