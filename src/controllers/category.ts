import express from 'express'
import { param } from 'express-validator'
import { validate } from '../utils/middleware'
import { getCategory } from '../services/moviedb'

const categoryRouter = express.Router()

categoryRouter.get('/:category',
  param('category').notEmpty(),
  validate,
  async (req, res) => {
    try {
      const categoryResult = await getCategory(req.params.category)
      res.json(categoryResult)
    } catch (error) {
      res.status(404).end()
    }
  })

export default categoryRouter
