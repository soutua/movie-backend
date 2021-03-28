import { movie as PrismaMovie } from '.prisma/client'
import {
  ImageConfig, Movie, MovieDbConfig, MovieDbMovie
} from './types'

const movieFromMovieDb = (movie: MovieDbMovie): Movie => ({
  id: movie.id,
  title: movie.title,
  overview: movie.overview,
  posterPath: movie.poster_path,
  backdropPath: movie.backdrop_path
})

const movieFromPrisma = (movie: PrismaMovie): Movie => ({
  id: movie.id,
  title: movie.title,
  overview: movie.overview,
  posterPath: movie.posterPath,
  backdropPath: movie.backdropPath
})

const imageConfigFromMovieDbConfig = (config: MovieDbConfig): ImageConfig => ({
  baseUrl: config.images.secure_base_url,
  posterSizes: config.images.poster_sizes,
  backdropSizes: config.images.backdrop_sizes
})

export { movieFromMovieDb, movieFromPrisma, imageConfigFromMovieDbConfig }
