import mongoose from "mongoose";
import educationModel from "../models/education.model.js";

export const createEducation = async (req, res) => {
  try {
    const {
      institution,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      description,
    } = req.body;

    const newEducation = new educationModel({
      institution,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      description,
    });
    const educationSaved = await newEducation.save();
    res.status(201).json({
      message: "Education successfully created",
      education: educationSaved,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getEducation = async (req, res) => {
  try {
    const education = await educationModel.find();
    res.json(education);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getEducationById = async (req, res) => {
  const { id } = req.params;

  // Validar si el ID es un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const education = await educationModel.findById(id);
    if (!education) {
      return res
        .status(404)
        .json({ message: `Education with id ${id} not found` });
    }
    res.json(education);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateEducation = async (req, res) => {
  const { id } = req.params;

  const { institution, degree, fieldOfStudy, startDate, endDate, description } =
    req.body;
  // Validar si el ID es un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const updatedEducation = await educationModel.findOneAndUpdate(
      { _id: id },
      { institution, degree, fieldOfStudy, startDate, endDate, description },
      { new: true }
    );
    if (!updatedEducation) {
      return res
        .status(404)
        .json({ message: `Education with id ${id} not found` });
    }
    res.json({
      message: "Education successfully updated",
      education: updatedEducation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const deleteEducation = async (req, res) => {
  const { id } = req.params;

  // Validar si el ID es un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const deletedEducation = await educationModel.findByIdAndDelete(id);
    if (!deletedEducation) {
      return res
        .status(404)
        .json({ message: `Education with id ${id} not found` });
    }
    res.json({
      message: "Education successfully deleted",
      education: deletedEducation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
