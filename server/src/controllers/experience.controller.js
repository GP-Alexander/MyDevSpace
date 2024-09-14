import mongoose from "mongoose";
import Experience from "../models/experience.model.js";

export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.status(200).json(experiences); // 200 OK - Petición exitosa
  } catch (error) {
    res.status(500).json({ message: error.message }); // 500 Internal Server Error - Error del servidor
  }
};

export const getExperienceById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar formato del ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" }); // 400 Bad Request - Formato de ID inválido
    }

    const experience = await Experience.findById(id);

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" }); // 404 Not Found - No se encontró la experiencia
    }

    res.status(200).json(experience); // 200 OK - Petición exitosa
  } catch (error) {
    res.status(500).json({ message: error.message }); // 500 Internal Server Error - Error del servidor
  }
};

export const createExperience = async (req, res) => {
  try {
    const {
      company,
      position,
      location,
      startDate,
      endDate,
      description,
      responsabilities,
    } = req.body;

    const newExperience = new Experience({
      company,
      position,
      location,
      startDate,
      endDate,
      description,
      responsabilities,
    });
    await newExperience.save();

    res.status(201).json({
      message: "Experience created successfully",
      experience: newExperience,
    }); // 201 Created - Recurso creado exitosamente
  } catch (error) {
    res.status(400).json({ message: error.message }); // 400 Bad Request - Datos de entrada incorrectos
  }
};

export const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      company,
      position,
      location,
      startDate,
      endDate,
      description,
      responsabilities,
    } = req.body;

    // Validar formato del ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" }); // 400 Bad Request - Formato de ID inválido
    }

    const updatedExperience = {
      company,
      position,
      location,
      startDate,
      endDate,
      description,
      responsabilities,
      _id: id,
    };
    const result = await Experience.findByIdAndUpdate(id, updatedExperience, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({ message: "Experience not found" }); // 404 Not Found - No se encontró la experiencia
    }

    res.status(200).json({
      message: "Experience updated successfully",
      experience: result,
    }); // 200 OK - Recurso actualizado exitosamente
  } catch (error) {
    res.status(500).json({ message: error.message }); // 500 Internal Server Error - Error del servidor
  }
};

export const deleteExperience = async (req, res) => {
  const { id } = req.params;

  // Validar formato del ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" }); // 400 Bad Request - Formato de ID inválido
  }

  try {
    const experience = await Experience.findByIdAndDelete(id);

    if (!experience) {
      return res
        .status(404)
        .json({ message: `Experience with id ${id} not found` }); // 404 Not Found - No se encontró la experiencia
    }

    res.status(200).json({
      message: "Experience deleted successfully",
      experience: experience,
    }); // 200 OK - Recurso eliminado exitosamente
  } catch (error) {
    res.status(500).json({ message: error.message }); // 500 Internal Server Error - Error del servidor
  }
};
