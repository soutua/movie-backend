import express from 'express'
import { body } from 'express-validator'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { validate } from '../utils/middleware'
import { register, login } from '../services/user'

const userRouter = express.Router()

userRouter.post('/register',
  body('username').notEmpty(),
  body('password').notEmpty(),
  validate,
  async (req, res, next) => {
    try {
      await register(req.body.username, req.body.password)
      res.end()
    } catch (error) {
      if ((error as PrismaClientKnownRequestError).code === 'P2002') {
        res.status(409).json({ error: 'username_exists' })
      } else {
        next(error)
      }
    }
  })

userRouter.post('/login',
  body('username').notEmpty(),
  body('password').notEmpty(),
  validate,
  async (req, res) => {
    const token = await login(req.body.username, req.body.password)

    if (token) {
      res.json({
        username: req.body.username,
        token
      })
    } else {
      res.status(401).json({ error: 'invalid_login' })
    }
  })

export default userRouter
