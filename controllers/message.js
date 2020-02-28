const express = require('express')

const messageApi = require('../models/message.js')

const messageRouter = express.Router()

messageRouter.post('/messages', (req, res) => {
  messageApi.addMessage(req.body)
  .then((message) => {
  res.json(message)
  })
})

messageRouter.get('/messages/assignment/:assignmentId', (req,res) => {
  messageApi.getMessagesInAssignment(req.params.assignmentId)
  .then((messages) => {
    res.json(messages)
  })
})

messageRouter.put('/messages/:id', (req, res) => {
  messageApi.updateMessage(req.params.id, req.body)
  .then((message) => {
      res.json(message)
  })
})

messageRouter.get('/messages', (req, res) => {
  messageApi.getMessages()
  .then((messages) => {
    res.json(messages)
  })
})

messageRouter.get('/messages/:id', (req, res) => {
  messageApi.getAMessage(req.params.id)
  .then((message) => {
    res.json(message)
  })
})

messageRouter.delete('/messages/:id', (req, res) => {
  messageApi.deleteMessage(req.params.id)
  .then((message) => {
    res.json(message)
  })
})

module.exports = {
  messageRouter
}