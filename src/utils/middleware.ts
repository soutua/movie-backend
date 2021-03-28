import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { verify, Secret } from 'jsonwebtoken'
import pino from 'pino'
import { PrismaClient } from '@prisma/client'
import config from '../utils/config'
import { TokenData } from '../types/types'

const logger = pino()
const prisma = new PrismaClient()

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    next()
  } else {
    res.status(400).json({ errors: errors.array() })
  }
}

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.get('authorization')
  const authHeaderStart = 'bearer '
  let user

  if (authorizationHeader && authorizationHeader.toLowerCase().startsWith(authHeaderStart)) {
    const token = authorizationHeader.substring(authHeaderStart.length)
    let decodedToken

    try {
      decodedToken = verify(token, config.TOKEN_SECRET as Secret) as TokenData
    } catch (error) {
      logger.error('Token verification failed', error)
    }

    if (decodedToken && decodedToken.userId) {
      user = await prisma.account.findUnique({
        where: {
          id: decodedToken.userId
        }
      })
    }
  }

  if (user) {
    res.locals.user = user
    next()
  } else {
    res.status(401).json({ error: 'invalid_token' })
  }
}

export { validate, authenticate }
