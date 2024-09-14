import mongoose from "mongoose";
import skillModel from "../models/skills.model.js";

export const getSkills = async (req, res) => {
    try {
        const skills = await skillModel.find();

        // Si no hay habilidades, devolver un array vacío y un mensaje
        if (skills.length === 0) {
            return res.status(200).json({ message: "No skills found", data: [] });
        }
        res
            .status(200)
            .json({ message: "Skills retrieved successfully", data: skills });
    } catch (error) {
        res
            .status(500)
            .json({
                message: "An error occurred while retrieving skills",
                error: error.message,
            });
    }
};

export const getSkillById = async (req, res) => {
    try {
        const { id } = req.params;
        const skill = await skillModel.findById(id);
        if (!skill) {
            return res
                .status(404)
                .json({ message: `Skill with id ${id} not found`, data: null });
        }
        res
            .status(200)
            .json({
                message: `Skill with id ${id} retrieved successfully`,
                data: skill,
            });
    } catch (error) {
        res
            .status(500)
            .json({
                message: "An error occurred while retrieving skill",
                error: error.message,
            });
    }
};

export const createSkill = async (req, res) => {
    try {
        const { name, level, category } = req.body;
        const newSkill = new skillModel({
            name,
            level,
            category,
        });
        const skillSaved = await newSkill.save();

        res
            .status(201)
            .json({ message: "Skill created successfully", data: newSkill });
    } catch (error) {
        res
            .status(500)
            .json({
                message: "An error occurred while creating skill",
                error: error.message,
            });
    }
};

export const updateSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, level, category } = req.body;
        const updatedSkill = await skillModel.findByIdAndUpdate(
            id,
            { name, level, category },
            { new: true }
        );
        if (!updatedSkill) {
            return res
                .status(404)
                .json({ message: `Skill with id ${id} not found`, data: null });
        }
        res
            .status(200)
            .json({
                message: `Skill with id ${id} updated successfully`,
                data: updatedSkill,
            });
    } catch (error) {
        res
            .status(500)
            .json({
                message: "An error occurred while updating skill",
                error: error.message,
            });
    }
};

export const deleteSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const skill = await skillModel.findByIdAndDelete(id);
        if (!skill) {
            return res
                .status(404)
                .json({ message: `Skill with id ${id} not found`, data: null });
        }
        res
            .status(200)
            .json({
                message: `Skill with id ${id} deleted successfully`,
                data: skill,
            });
    } catch (error) {
        res
            .status(500)
            .json({
                message: "An error occurred while deleting skill",
                error: error.message,
            });
    }
};
