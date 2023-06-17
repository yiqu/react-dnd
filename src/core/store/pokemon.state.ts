export interface Region {
  id: string;
  pokemons: Pokemon[];
}

export interface Pokemon {
  id: number;
  name: string;
  sprite: string;
}

export interface FireResult {
  [fireid: string]: Region;
}

export interface PokemonConfigState {
  recentSearches: string[];
}

export interface RegionList {
  regions: string[];
}