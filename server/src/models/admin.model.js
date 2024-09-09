import mongoose from "mongoose";
import { Schema } from "mongoose";

// Definición del esquema para los roles
const adminSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: [String],
        required: true,
        default: ["user"]
    },
    permissions:
    {
        type: [String],
        required: true,
        default: []
    }
},
    {
        timestamps: true
    }


);

export default mongoose.model('Admin', adminSchema);