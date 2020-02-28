const mongoose = require('./connection.js')

const SolutionModelSchema = new mongoose.Schema({
 questionId: String,
 assignmentId: String,
 userId: String,
 content: String,
 correct: Boolean,
 submitted: Boolean
})

const SolutionCollection = mongoose.model('StudentSolution', SolutionModelSchema)

const getSolutionsByAssignment = (assignmentId) => {
  return SolutionCollection.find({assignmentId: assignmentId})
}

const getSolutionsByUser = (userId) => {
  return SolutionCollection.find({userId: userId})
}

const getSolutionsByQuestion = (questionId) => {
  return SolutionCollection.find({questionId: questionId})
}

const deleteSolution = (id) => {
  return SolutionCollection.deleteOne({_id: id})
}

const getSolutions = () => {
  return SolutionCollection.find()
}

const getASolution = (id) => {
  return SolutionCollection.findOne({_id: id})
}

const addSolution = (data) => {
  return SolutionCollection.create(data)
} 

const updateSolution = (id, data) => {
    return SolutionCollection.findByIdAndUpdate(id, {content: data.content, correct: data.correct, submitted: data.submitted})
} 

module.exports = {
    getASolution,
    getSolutions,
    getSolutionsByAssignment,
    getSolutionsByQuestion,
    getSolutionsByUser,
    deleteSolution,
    addSolution,
    updateSolution
}