import Contact from "../models/contact.model.js";
import mongoose from "mongoose"; // Importar mongoose para validar ObjectId

export const createContact = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({ name, email, message });
    const contactSaved = await newContact.save();
    res.status(201).json({
      message: "Contact successfully created",
      contact: contactSaved
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getContactById = async (req, res) => {
  const { id } = req.params;

  // Validar si el ID es un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: `Contact with id ${id} not found` });
    }
    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, message } = req.body;

  // Validar si el ID es un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: id },
      { name, email, message },
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: `Contact with id ${id} not found` });
    }
    res.json({
      message: "Contact successfully updated",
      contact: updatedContact
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;

  // Validar si el ID es un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ message: `Contact with id ${id} not found` });
    }
    res.json({
      message: `Contact with id ${id} successfully deleted`,
      contact
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
