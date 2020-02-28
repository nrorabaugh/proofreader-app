const express = require('express')

const questionApi = require('../models/question.js')

const questionRouter = express.Router()

questionRouter.post('/questions', (req, res) => {
    questionApi.addQuestion(req.body)
  .then((question) => {
  res.json(question)
  })
})

questionRouter.get('/questions/assignment/:assignmentId', (req,res) => {
    questionApi.getQuestionsByAssignment(req.params.assignmentId)
  .then((questions) => {
    res.json(questions)
  })
})

questionRouter.put('/questions/:id', (req, res) => {
    questionApi.updateQuestion(req.params.id, req.body)
  .then((question) => {
      res.json(question)
  })
})

questionRouter.get('/questions', (req, res) => {
    questionApi.getQuestions()
  .then((questions) => {
    res.json(questions)
  })
})

questionRouter.get('/questions/:id', (req, res) => {
    questionApi.getAQuestion(req.params.id)
    .then((question) => {
        res.json(question)
      })
})

questionRouter.delete('/questions/:id', (req, res) => {
    questionApi.deleteQuestion(req.params.id)
    .then((question) => {
        res.json(question)
      })
})

module.exports = {
    questionRouter
}