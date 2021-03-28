import express from 'express'
import { query } from 'express-validator'
import { validate } from '../utils/middleware'
import { searchMovies } from '../services/moviedb'

const searchRouter = express.Router()

searchRouter.get('/',
  query('q').notEmpty().isString(),
  validate,
  async (req, res) => {
    const searchResult = await searchMovies(req.query.q as string)
    res.json(searchResult)
  })

export default searchRouter
