const mongoose = require('./connection.js')

const ModelSchema = new mongoose.Schema({
 title: String,
 content: String,
})

const ModelCollection = mongoose.model('Model', ModelSchema)

//ReadAll function

//ReadOne function

//Create Function

//Update function

//Delete function

module.exports = {
    //CRUD functions
  }