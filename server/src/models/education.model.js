import mongoose from 'mongoose';
import { Schema } from 'mongoose';

// Definición del esquema para la educación
const educationSchema = new Schema({
institution: {
    type: String,
    required: true,
    trim: true
},
degree: {
    type: String,
    required: true,
    trim: true
},
fieldOfStudy: {
    type: String,
    required: true,
    trim: true
},
startDate: {
    type: Date,
    required: true
},

endDate: {
    type: Date,
    required: true
},

description: {
    type: String,
    required: true,
    trim: true
}
}, {
timestamps: true
});


export default mongoose.model('Education', educationSchema);