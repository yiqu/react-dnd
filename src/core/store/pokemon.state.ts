import * as yup from "yup";

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
  region: string;
}

export interface UpdatePokemon {
  id: string;
  name: string;
  region: string;
  index: number;
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
  name: '',
  id: '',
  region: ''
};

export const PokemonSchema = yup.object({
  id: yup.number().required('Pokemon ID is required').min(1),
  name: yup.string().trim().required('Name is required').min(2, 'Name has to be at least 2 characters'),
  region: yup.string().oneOf(REGIONS).required('Region is required')
});