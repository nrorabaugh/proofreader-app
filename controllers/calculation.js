const express = require('express')

const calculationApi = require('../models/calculation.js')

const calculationRouter = express.Router()

calculationRouter.post('/calculations', (req, res) => {
    calculationApi.addCalculation(req.body)
  .then((calculation) => {
  res.json(calculation)
  })
})

calculationRouter.get('/calculations/solution/:solutionId', (req,res) => {
    calculationApi.getCalculationsBySolution(req.params.solutionId)
  .then((calculations) => {
    res.json(calculations)
  })
})

calculationRouter.put('/calculations/:id', (req, res) => {
    calculationApi.updateCalculation(req.params.id, req.body)
  .then((calculation) => {
      res.json(calculation)
  })
})

calculationRouter.get('/calculations', (req, res) => {
    calculationApi.getCalculations()
  .then((calculation) => {
    res.json(calculation)
  })
})

calculationRouter.get('/calculations/:id', (req, res) => {
    calculationApi.getACalculation(req.params.id)
  .then((calculation) => {
    res.json(calculation)
  })
})

calculationRouter.delete('/calculations/:id', (req, res) => {
    calculationApi.deleteCalculation(req.params.id)
  .then((calculation) => {
    res.json(calculation)
  })
})

module.exports = {
  calculationRouter
}