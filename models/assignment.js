const mongoose = require('./connection.js')

const AssignmentModelSchema = new mongoose.Schema({
 classId: String,
 name: String,
 seq: String,
 description: String
})

const AssignmentCollection = mongoose.model('Assignment', AssignmentModelSchema)

const getAssignmentsByClass = (classId) => {
  return AssignmentCollection.find({classId: classId})
}

const deleteAssignment = (id) => {
  return AssignmentCollection.deleteOne({_id: id})
}

const getAssignments = () => {
  return AssignmentCollection.find()
}

const getAnAssignment = (id) => {
  return AssignmentCollection.findOne({_id: id})
}

const addAssignment = (data) => {
  return AssignmentCollection.create(data)
} 

const updateAssignment = (id, data) => {
    return AssignmentCollection.findByIdAndUpdate(id, {classId: data.classId, name: data.name, description: data.description})
} 

module.exports = {
  getAssignmentsByClass,
  addAssignment,
  deleteAssignment,
  getAnAssignment,
  getAssignments,
  updateAssignment
}