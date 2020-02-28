const express = require('express')

const solutionApi = require('../models/solution.js')

const solutionRouter = express.Router()

solutionRouter.post('/solutions', (req, res) => {
    solutionApi.addSolution(req.body)
  .then((solution) => {
  res.json(solution)
  })
})

solutionRouter.get('/solutions/assignment/:assignmentId', (req,res) => {
    solutionApi.getSolutionsByAssignment(req.params.assignmentId)
  .then((solutions) => {
    res.json(solutions)
  })
})

solutionRouter.get('/solutions/student/:userId', (req,res) => {
  solutionApi.getSolutionsByUser(req.params.userId)
.then((solutions) => {
  res.json(solutions)
  })
})

solutionRouter.get('/solutions/question/:questionId', (req,res) => {
  solutionApi.getSolutionsByQuestion(req.params.questionId)
.then((solutions) => {
  res.json(solutions)
  })
})

solutionRouter.put('/solutions/:id', (req, res) => {
    solutionApi.updateSolution(req.params.id, req.body)
  .then((solution) => {
      res.json(solution)
  })
})

solutionRouter.get('/solutions', (req, res) => {
    solutionApi.getSolutions()
  .then((solutions) => {
    res.json(solutions)
  })
})

solutionRouter.get('/solutions/:id', (req, res) => {
    solutionApi.getASolution(req.params.id)
  .then((solution) => {
    res.json(solution)
  })
})

solutionRouter.delete('/solutions/:id', (req, res) => {
    solutionApi.deleteSolution(req.params.id)
  .then((solution) => {
    res.json(solution)
  })
})

module.exports = {
    solutionRouter
}