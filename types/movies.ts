export interface ISearch {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface ISearchResponse {
  Search: ISearch[]
  totalResults: string
  Response: string
}

export interface IRating {
  Source: string
  Value: string
}

export interface IMovieResponse {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: IRating[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}
