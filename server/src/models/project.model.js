import mongoose from 'mongoose';

// Definición del esquema para los proyectos
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  technologies: {
    type: [String], // Arreglo de cadenas de texto
    required: true
  },
  githubUrl: {
    type: String,
    required: true,
    trim: true
  },
  liveUrl: {
    type: String,
    required: true,
    trim: true
  },
  images: {
    type: [String], // Arreglo de URLs de imágenes
    default: [] // Por defecto es un arreglo vacío
  },
  date: {
    type: Date,
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  highlights: {
    type: [String], 
    default: []
  }
}, {
  timestamps: true
});

export default  mongoose.model('Project', projectSchema);

