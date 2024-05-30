const mongoose = require('mongoose');
const { Schema } = mongoose;

const schemaProject = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  students: [{
    name: {
      type: String,
      required: true
    },
    surName: {
      type: String,
      required: true
    }
  }],
  modality: {
    type: Schema.Types.ObjectId,
    ref: 'modality'
  }
});

module.exports = mongoose.model('project', schemaProject);
