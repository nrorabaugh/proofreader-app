const mongoose = require('./connection.js')

const CalculationModelSchema = new mongoose.Schema({
 solutionId: String,
 seq: String,
 expression: String,
 comment: String
})

const CalculationCollection = mongoose.model('Calculation', CalculationModelSchema)

const getCalculationsBySolution = (solutionId) => {
  return CalculationCollection.find({solutionId: solutionId})
}

const deleteCalculation = (id) => {
  return CalculationCollection.deleteOne({_id: id})
}

const getCalculations = () => {
  return CalculationCollection.find()
}

const getACalculation = (id) => {
  return CalculationCollection.findOne({_id: id})
}

const addCalculation = (data) => {
  return CalculationCollection.create(data)
} 

const updateCalculation = (id, data) => {
    return CalculationCollection.findByIdAndUpdate(id, {solutionId: data.solutionId, expression: data.expression, comment: data.comment})
} 

module.exports = {
  getCalculationsBySolution,
  deleteCalculation,
  addCalculation,
  getACalculation,
  getCalculations,
  updateCalculation
}