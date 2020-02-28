const express = require('express')

const classroomApi = require('../models/classroom.js')

const classroomRouter = express.Router()

classroomRouter.post('/classrooms', (req, res) => {
    classroomApi.addClassroom(req.body)
  .then((classroom) => {
  res.json(classroom)
  })
})

classroomRouter.get('/classrooms/teacher/:teacherId', (req,res) => {
    classroomApi.getClassroomByTeacher(req.params.teacherId)
  .then((classroom) => {
    res.json(classroom)
  })
})

classroomRouter.put('/classrooms/:id', (req, res) => {
    classroomApi.updateClassroom(req.params.id, req.body)
  .then((classroom) => {
      res.json(classroom)
  })
})

classroomRouter.get('/classrooms', (req, res) => {
    classroomApi.getClassrooms()
  .then((classrooms) => {
    res.json(classrooms)
  })
})

classroomRouter.get('/classrooms/:id', (req, res) => {
    classroomApi.getAClassroom(req.params.id)
    .then((classroom) => {
        res.json(classroom)
      })
})

classroomRouter.delete('/classrooms/:id', (req, res) => {
    classroomApi.deleteClassroom(req.params.id)
    .then((classroom) => {
        res.json(classroom)
      })
})

module.exports = {
    classroomRouter
}