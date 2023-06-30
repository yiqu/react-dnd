export interface Region {
  id: string;
  pokemons: Pokemon[];
}

export interface Pokemon {
  id: number;
  name: string;
  sprite: string;
}

export interface NewPokemon {
  id: string;
  name: string;
}

export interface FireResult {
  [fireid: string]: Region;
}

export interface PokemonConfigState {
  recentSearches: string[];
  allowCrossRegionDrag: boolean;
}

export interface RegionList {
  regions: string[];
}

export const REGIONS = ["kanto", "johto", "hoenn"];

export const DEFAULT_NEW_POKEMON: NewPokemon = {
  name: 'Pikachu',
  id: '25',
};