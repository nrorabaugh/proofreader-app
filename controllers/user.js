const express = require('express')

const userApi = require('../models/user.js')

const userRouter = express.Router()

userRouter.post('/users', (req, res) => {
    userApi.addUser(req.body)
  .then((user) => {
  res.json(user)
  })
})

userRouter.get('/users/extant/:username', (req, res) => {
  userApi.checkUsernameAvailability(req.params.username)
  .then((username) => {
    res.json(username)
  })
})

userRouter.get('/users/username/:username/password/:password', (req,res) => {
    userApi.getUserByCred(req.params.username, req.params.password)
  .then((user) => {
    res.json(user)
  })
})

userRouter.put('/users/:id', (req, res) => {
    userApi.updateUser(req.params.id, req.body)
  .then((user) => {
      res.json(user)
  })
})

userRouter.get('/users', (req, res) => {
    userApi.getUsers()
  .then((users) => {
    res.json(users)
  })
})

userRouter.get('/users/:id', (req, res) => {
    userApi.getAUser(req.params.id)
  .then((user) => {
    res.json(user)
  })
})

userRouter.delete('/users/:id', (req, res) => {
    userApi.deleteUser(req.params.id)
  .then((user) => {
    res.json(user)
  })
})

module.exports = {
  userRouter
}