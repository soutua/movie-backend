import express from 'express'
import { getImageConfig } from '../services/moviedb'

const configurationRouter = express.Router()

configurationRouter.get('/', async (_req, res) => {
  const imageConfig = await getImageConfig()
  res.json(imageConfig)
})

export default configurationRouter
