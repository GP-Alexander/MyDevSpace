import mongoose from "mongoose";
import { Schema } from "mongoose";

// Definición del esquema para los usuarios
const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "user",  
        enum: ["user", "admin", "superadmin"]
    },
    permissions: {
        type: [String],
        required: true,
        default: []
    },
    status: {
        type: Boolean,
        default: true
    },
    avatar: {
        type: String,
        default: "http://www.gravatar.com/avatar/?d=mp"
    },
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);
