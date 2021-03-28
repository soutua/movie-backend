export interface Movie {
    id: number
    title: string
    overview: string | null
    posterPath: string | null
    backdropPath: string | null
}

export interface MovieDbMovie {
    id: number
    title: string
    overview: string | null
    'poster_path': string | null
    'backdrop_path': string | null
}

export interface TokenData {
    userId: number
    username: string
}

export interface ImageConfig {
    baseUrl: string
    posterSizes: Array<string>
    backdropSizes: Array<string>
}

export interface MovieDbConfig {
    images: {
        'base_url': string
        'secure_base_url': string
        'backdrop_sizes': Array<string>
        'poster_sizes': Array<string>
    }
}
