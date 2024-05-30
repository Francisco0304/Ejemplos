const mongoose = require('mongoose')

const {Schema} = mongoose

const schemaModalities = new Schema({
  code : {
    type : String,
    required : true,
    unique : true
  },
  name : {
    type :String,
    required : true,
  },
  projects : [
    {
      type : Schema.Types.ObjectId,
      ref : 'project'
    }
  ]
})

module.exports = mongoose.model('modality',schemaModalities)
