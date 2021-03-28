import express from 'express'
import { param } from 'express-validator'
import { validate } from '../utils/middleware'
import { getMovie } from '../services/moviedb'

const movieRouter = express.Router()

movieRouter.get('/:movieId',
  param('movieId').notEmpty().isNumeric(),
  validate,
  async (req, res) => {
    try {
      const movieResult = await getMovie(parseInt(req.params.movieId))
      res.json(movieResult)
    } catch (error) {
      res.status(404).end()
    }
  })

export default movieRouter
