import bcrypt from 'bcrypt'
import { sign, Secret } from 'jsonwebtoken'
import prisma from '../utils/prisma'
import config from '../utils/config'
import { TokenData } from '../types/types'

const register = async (username: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  await prisma.account.create({
    data: {
      username,
      password: hashedPassword
    }
  })
}

const login = async (username: string, password: string) => {
  const account = await prisma.account.findUnique({
    where: {
      username
    }
  })

  let token = null

  if (account && await bcrypt.compare(password, account.password)) {
    const tokenData: TokenData = {
      userId: account.id,
      username: account.username
    }

    token = sign(tokenData, config.TOKEN_SECRET as Secret)
  }

  return token
}

export { register, login }
