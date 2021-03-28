import express from 'express'
import pino from 'pino-http'
import userRouter from './controllers/user'
import searchRouter from './controllers/search'
import categoryRouter from './controllers/category'
import favoritesRouter from './controllers/favorite'
import configurationRouter from './controllers/configuration'
import movieRouter from './controllers/movie'

const app = express()
app.use(pino())
app.use(express.json())
app.use('/api/user', userRouter)
app.use('/api/search', searchRouter)
app.use('/api/category', categoryRouter)
app.use('/api/movie', movieRouter)
app.use('/api/favorite', favoritesRouter)
app.use('/api/configuration', configurationRouter)

export default app
