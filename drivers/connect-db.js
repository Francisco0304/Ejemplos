const mongoose = require('mongoose')

const URI = "mongodb://localhost:27017/projects"

mongoose.set('strictQuery')

mongoose.connect(URI)
  .then(()=> console.log('Connect Success...'))
  .catch( err => console.log(err))

module.exports = mongoose