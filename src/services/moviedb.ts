import axios from 'axios'
import config from '../utils/config'
import { movieFromMovieDb, imageConfigFromMovieDbConfig } from '../types/converters'

const baseUrl = 'https://api.themoviedb.org/3'

const searchMovies = async (query: string) => {
  const response = await axios.get(`${baseUrl}/search/movie`, {
    params: {
      api_key: config.MOVIEDB_API_KEY,
      query
    }
  })

  return response.data.results.map(movieFromMovieDb)
}

const getCategory = async (category: string) => {
  const response = await axios.get(`${baseUrl}/movie/${category}`, {
    params: {
      api_key: config.MOVIEDB_API_KEY
    }
  })

  return response.data.results.map(movieFromMovieDb)
}

const getMovie = async (movieId: number) => {
  const response = await axios.get(`${baseUrl}/movie/${movieId}`, {
    params: {
      api_key: config.MOVIEDB_API_KEY
    }
  })

  return movieFromMovieDb(response.data)
}

const getImageConfig = async () => {
  const response = await axios.get(`${baseUrl}/configuration`, {
    params: {
      api_key: config.MOVIEDB_API_KEY
    }
  })

  return imageConfigFromMovieDbConfig(response.data)
}

export { searchMovies, getCategory, getMovie, getImageConfig }
