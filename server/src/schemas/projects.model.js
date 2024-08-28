const mongoose = require('mongoose');
const { Schema } = mongoose;

// Definición del esquema para los proyectos
const projectSchema = new Schema({
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
    type: [String], // Arreglo de etiquetas
    default: []
  },
  highlights: {
    type: [String], // Arreglo de puntos destacados
    default: []
  }
}, {
  timestamps: true // Agrega createdAt y updatedAt automáticamente
});

// Crear el modelo basado en el esquema
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
