import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { PrismaClient, account } from '.prisma/client'
import { movieFromPrisma } from '../types/converters'

import { getMovie } from './moviedb'

const prisma = new PrismaClient()

const saveFavorite = async (user: account, movieId: number) => {
  const favorite = await prisma.favorite.findUnique({
    where: {
      movieId_accountId: {
        accountId: user.id,
        movieId
      }
    }
  })

  if (!favorite) {
    let movie = await prisma.movie.findUnique({
      where: {
        id: movieId
      }
    })

    if (!movie) {
      const fetchedMovie = await getMovie(movieId)

      movie = await prisma.movie.create({
        data: {
          id: fetchedMovie.id,
          title: fetchedMovie.title,
          overview: fetchedMovie.overview,
          posterPath: fetchedMovie.posterPath,
          backdropPath: fetchedMovie.backdropPath
        }
      })
    }

    if (movie) {
      await prisma.favorite.create({
        data: {
          accountId: user.id,
          movieId
        }
      })
    }
  }
}

const deleteFavorite = async (user: account, movieId: number) => {
  try {
    await prisma.favorite.delete({
      where: {
        movieId_accountId: {
          accountId: user.id,
          movieId
        }
      }
    })
  } catch (error) {
    // Ignoring P2025 since it just means the favorite didn't exist
    if ((error as PrismaClientKnownRequestError).code !== 'P2025') {
      throw error
    }
  }
}

const getFavorite = async (user: account, movieId: number) => {
  const favorite = await prisma.favorite.findUnique({
    where: {
      movieId_accountId: {
        accountId: user.id,
        movieId
      }
    },
    include: {
      movie: true
    }
  })

  return favorite ? movieFromPrisma(favorite.movie) : null
}

const getAllFavorites = async (user: account) => {
  const favorites = await prisma.favorite.findMany({
    select: {
      movie: true
    },
    where: {
      accountId: user.id
    }
  })

  return favorites.map((value) => movieFromPrisma(value.movie))
}

export {
  saveFavorite, deleteFavorite, getFavorite, getAllFavorites
}
