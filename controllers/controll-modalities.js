const { isObjectIdOrHexString, ObjectId } = require('mongoose');
const Modality = require('./../models/Modality');

module.exports = {
  findAll: async (req, res) => {
    try {
      const result = await Modality.find({});
//      const result = await Modality.find({}).populate('projects');
      return res.status(200).json({ data: result });
    } catch (err) {
      return res.status(500).json({ err: err });
    }
  },
  save: async (req, res) => {
    try {
      const modality = new Modality(req.body);

      const existingModality = await Modality.findOne({ code: req.body.code });
      if (existingModality) {
        return res.status(201).json({ msg: 'El código ya existe' });
      }

      const result = await modality.save();
      return res.status(201).json({ data: modality });
    } catch (err) {
      return res.status(500).json({ err: err });
    }
  },
  findById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Modality.findById(id);

      return res.status(200).json({ data: result });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { code, name } = req.body;

      const query = await Modality.findById(id);

      if (query) {
        const result = await Modality.updateOne(
          { _id: ObjectId(id) },
          { $set: { name: name } }
        );

        return res.status(200).json({ data: result });
      } else {
        return res.status(201).json({ msg: 'El ObjectId no Existe' });
      }
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },

  erase: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedItem = await Modality.findById(id);
  
      if (deletedItem) {
        if (deletedItem.projects.length === 0) {
          const result = await Modality.findByIdAndDelete(id);
          return res.status(200).json({ data: result });
        } else {
          return res.status(400).json({ message: "El registro contiene proyectos" });
        }
      } else {
        return res.status(404).json({ message: "El ObjectId no Existe" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  
};
