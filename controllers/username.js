const express = require('express')

const usernameApi = require('../models/username.js')

const usernameRouter = express.Router()

usernameRouter.post('/usernames', (req, res) => {
    usernameApi.addUsername(req.body)
  .then((username) => {
  res.json(username)
  })
})

usernameRouter.get('/usernames/extant/:username', (req, res) => {
    usernameApi.getUsernameByUsername(req.params.username)
  .then((username) => {
    res.json(username)
  })
})

usernameRouter.put('/usernames/:id', (req, res) => {
    usernameApi.updateUsername(req.params.id, req.body)
    .then((username) => {
        res.json(username)
      })
})

usernameRouter.get('/usernames', (req, res) => {
    usernameApi.getUsernames()
    .then((username) => {
        res.json(username)
      })
})

usernameRouter.get('/usernames/:id', (req, res) => {
    usernameApi.getAUsername(req.params.id)
    .then((username) => {
        res.json(username)
      })
})

usernameRouter.delete('/usernames/:id', (req, res) => {
    usernameApi.deleteUsername(req.params.id)
    .then((username) => {
        res.json(username)
      })
})

module.exports = {
  usernameRouter
}