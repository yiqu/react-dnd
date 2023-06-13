export interface Film {
  fireid: string;
  name: string;
  director: string;
  releaseDate: number;
}

export interface FireResult {
  [fireid: string]: Film;
}

export interface FilmsConfigState {
  recentSearches: string[];
}