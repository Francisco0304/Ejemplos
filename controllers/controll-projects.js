const Project = require('./../models/Project');
const Modality = require('./../models/Modality');

module.exports = {
  findAll: async (req, res) => {
    try {
      const projects = await Project.find();

      return res.status(200).json({ data: projects });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },

  save: async (req, res) => {
    const {id} = req.params

    const project = new Project(req.body)

    try {
      const modality = await Modality.findById(id)

      if( modality ){
        project.modality = id

        modality.projects.push( project )

        const result = await project.save(project)

        await modality.save(modality)

        return res.status(200).json({ data:result});

      }else{
        return res.status(404).json({ message: "Modalidad no Existe" });
      }
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },
  update: async (req, res) => {
    const { id } = req.params;

    try {
      const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedProject) {
        return res.status(404).json({ message: "Proyecto no encontrado" });
      }

      return res.status(200).json({ data: updatedProject });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },

  erase: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedProject = await Project.findByIdAndDelete(id);

      if (!deletedProject) {
        return res.status(404).json({ message: "Proyecto no encontrado" });
      }

      // También necesitas eliminar el proyecto de la lista de proyectos de la modalidad
      const modality = await Modality.findOneAndUpdate(
        { projects: id },
        { $pull: { projects: id } }
      );

      return res.status(200).json({ data: deletedProject });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
};
