import Project from "../models/project.model.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createProject = async (req, res) => {

  const {
    title,
    description,
    technologies,
    githubUrl,
    liveUrl,
    images,
    date,
    tags,
    highlights,
  } = req.body;

  try {
    const newProject = new Project({
      title,
      description,
      technologies,
      githubUrl,
      liveUrl,
      images,
      date,
      tags,
      highlights,
    });

    await newProject.save();

    res.status(201).json({ message: "Project created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateProject = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    technologies,
    githubUrl,
    liveUrl,
    images,
    date,
    tags,
    highlights,
  } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        title,
        description,
        technologies,
        githubUrl,
        liveUrl,
        images,
        date,
        tags,
        highlights,
      },
      { new: true }
    );

    if (!updatedProject)
      return res.status(404).json({ message: "Project not found" });

    res
      .status(200)
      .json({
        message: "Project updated successfully",
        project: updatedProject,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject)
      return res.status(404).json({ message: "Project not found" });

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
