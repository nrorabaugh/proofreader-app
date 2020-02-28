const mongoose = require('./connection.js')

const QuestionModelSchema = new mongoose.Schema({
 assignmentId: String,
 number: String,
 content: String,
 solution: String
})

const QuestionCollection = mongoose.model('Question', QuestionModelSchema)

const getQuestionsByAssignment = (assignmentId) => {
  return QuestionCollection.find({assignmentId: assignmentId})
}

const deleteQuestion = (id) => {
  return QuestionCollection.deleteOne({_id: id})
}

const getQuestions = () => {
  return QuestionCollection.find()
}

const getAQuestion = (id) => {
  return QuestionCollection.findOne({_id: id})
}

const addQuestion = (data) => {
  return QuestionCollection.create(data)
} 

const updateQuestion = (id, data) => {
    return QuestionCollection.findByIdAndUpdate(id, {assignmentId: data.assignmentId, number: data.number, content: data.content, solution: data.solution})
} 

module.exports = {
    getAQuestion,
    getQuestions,
    getQuestionsByAssignment,
    deleteQuestion,
    addQuestion,
    updateQuestion
}