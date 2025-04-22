export interface Media {
  id: number;
  title?: string;
  name?: string;
  media_type: string;
  overview?: string;
  poster_path?: string;
  backdrop_path?: string;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
  genres?: { id: number; name: string }[];
  runtime?: number;
  number_of_seasons?: number;
  seasons?: Season[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Cast {
  id: number;
  name: string;
  character?: string;
  profile_path?: string;
}

export interface Season {
  id: number;
  name?: string;
  season_number: number;
  episodes?: Episode[];
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  episode_number: number;
  still_path?: string;
  air_date?: string;
}

export interface StreamingSource {
  id: number;
  url: string;
  quality: string;
  provider: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}