const mongoose = require('./connection.js')

const ClassroomModelSchema = new mongoose.Schema({
 teacherId: String,
 name: String
})

const ClassroomCollection = mongoose.model('Classroom', ClassroomModelSchema)

const getClassroomByTeacher = (teacherId) => {
  return ClassroomCollection.findOne({teacherId: teacherId})
}

const deleteClassroom = (id) => {
  return ClassroomCollection.deleteOne({_id: id})
}

const getClassrooms = () => {
  return ClassroomCollection.find()
}

const getAClassroom = (id) => {
  return ClassroomCollection.findOne({_id: id})
}

const addClassroom = (data) => {
  return ClassroomCollection.create(data)
} 

const updateClassroom = (id, data) => {
    return ClassroomCollection.findByIdAndUpdate(id, {teacherId: data.teacherId, name: data.name})
} 

module.exports = {
    getClassroomByTeacher,
    getAClassroom,
    getClassrooms,
    deleteClassroom,
    addClassroom,
    updateClassroom
}