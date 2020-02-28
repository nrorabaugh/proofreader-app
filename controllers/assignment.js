const express = require('express')

const assignmentApi = require('../models/assignment.js')

const assignmentRouter = express.Router()

assignmentRouter.post('/assignments', (req, res) => {
    assignmentApi.addAssignment(req.body)
  .then((assignment) => {
  res.json(assignment)
  })
})

assignmentRouter.get('/assignments/class/:classId', (req,res) => {
    assignmentApi.getAssignmentsByClass(req.params.classId)
  .then((assignments) => {
    res.json(assignments)
  })
})

assignmentRouter.put('/assignments/:id', (req, res) => {
    assignmentApi.updateAssignment(req.params.id, req.body)
  .then((assignment) => {
      res.json(assignment)
  })
})

assignmentRouter.get('/assignments', (req, res) => {
    assignmentApi.getAssignments()
  .then((assignments) => {
    res.json(assignments)
  })
})

assignmentRouter.get('/assignments/:id', (req, res) => {
    assignmentApi.getAnAssignment(req.params.id)
  .then((assignment) => {
    res.json(assignment)
  })
})

assignmentRouter.delete('/assignments/:id', (req, res) => {
    assignmentApi.deleteAssignment(req.params.id)
  .then((assignment) => {
    res.json(assignment)
  })
})

module.exports = {
  assignmentRouter
}