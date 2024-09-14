import mongoose from 'mongoose';
import {Schema } from 'mongoose';

// Definición del esquema para las experiencias
 const experienceSchema = new Schema({
 
    company: {
        type: String,
        required: true,
        trim: true
    },
    position: {
        type: String,
        required: true,
        trim: true
    },
    location: {
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
    },
    responsabilities: {
        type: [String],
        default: []
    }


 
}
,{
    timestamps: true
});	


export default mongoose.model('Experience', experienceSchema);

