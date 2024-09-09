import mongoose from "mongoose";
import { Schema } from "mongoose";

// Definición del esquema para las certificaciones
const certificacionesSchema = new Schema({
name: {
    type: String,
    required: true,
    trim: true
},
issuingOrganization: {
    type: String,
    required: true,
    trim: true
},
issueDate: {
    type: Date,
    required: true
},
expirationDate: {
    type: Date,
    required: true
},
credentialID: {
    type: String,
    required: true,
    trim: true
},
credentialURL: {
    type: String,
    required: true,
    trim: true
}
}, {

timestamps: true
});


export default mongoose.model('Certifications', certificacionesSchema);