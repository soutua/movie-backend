import express from 'express'
import { param } from 'express-validator'
import { validate, authenticate } from '../utils/middleware'
import {
  saveFavorite, deleteFavorite, getFavorite, getAllFavorites
} from '../services/favorite'

const favoritesRouter = express.Router()

favoritesRouter.get('/all',
  authenticate,
  async (_req, res) => {
    const movies = await getAllFavorites(res.locals.user)
    res.json(movies)
  })

favoritesRouter.put('/:movieId',
  param('movieId').notEmpty().isNumeric(),
  validate,
  authenticate,
  async (req, res) => {
    const id = parseInt(req.params.movieId, 10)
    await saveFavorite(res.locals.user, id)
    const movie = await getFavorite(res.locals.user, id)
    res.json(movie)
  })

favoritesRouter.delete('/:movieId',
  param('movieId').notEmpty().isNumeric(),
  validate,
  authenticate,
  async (req, res) => {
    await deleteFavorite(res.locals.user, parseInt(req.params.movieId, 10))
    res.end()
  })

favoritesRouter.get('/:movieId',
  param('movieId').notEmpty().isNumeric(),
  validate,
  authenticate,
  async (req, res) => {
    const movie = await getFavorite(res.locals.user, parseInt(req.params.movieId, 10))

    if (movie) {
      res.json(movie)
    } else {
      res.status(404).end()
    }
  })

export default favoritesRouter
