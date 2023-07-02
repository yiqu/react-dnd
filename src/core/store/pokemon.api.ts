import { createApi, fetchBaseQuery, TagDescription } from '@reduxjs/toolkit/query/react';
import { BASE_FIREBASE_URL, BASE_POKEMON_SPRITE_URL } from '../../shared/api/endpoints';
import { Pokemon, Region, UpdatePokemon } from './pokemon.state';
import { PatchCollection } from '@reduxjs/toolkit/dist/query/core/buildThunks';

export const basePath = "react-dnd";

export const RegionTag = "Region";
export const PokemonTag = "Pokemon";

export const pokemonApi = createApi({
  reducerPath: 'pokemons',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_FIREBASE_URL + basePath
  }),
  tagTypes: [RegionTag, PokemonTag],
  endpoints: (builder) => ({
    fetchRegionList: builder.query<string[], void>({
      query: (_: void) => {
        return {
          url: `regions.json`,
          method: 'GET'
        };
      },
      transformResponse: (response: string[], _meta, _args: void) => {
        return response;
      },
      providesTags: (result, _error, _args, _meta) => {
        const tags: TagDescription<"Region">[] = [];
        if (result) {
          result.forEach((region: string) => {
            tags.push({
              type: RegionTag,
              id: region
            });
          });
        }
        return [{type: RegionTag, id: 'ALL'}, ...tags];
      }
    }),

    fetchPokemonsByRegion: builder.query<Region, string>({
      query: (regionId: string) => {
        return {
          url: `${regionId}.json`,
          method: 'GET'
        };
      },
      transformResponse: (response: Region, _meta, _args: string) => {
        return response;
      },
      providesTags: (result, _error, args, _meta) => {
        const tags: TagDescription<"Pokemon">[] = [];
        if (result) {
          const pokemons: Pokemon[] = result.pokemons;
          pokemons.forEach((pokemon: Pokemon) => {
            tags.push({
              type: PokemonTag,
              id: pokemon.id
            });
          });
        }
        return [
          { type: RegionTag, id: 'ALL' },
          { type: PokemonTag, id: `${args.toLocaleLowerCase()}` }, 
          ...tags
        ];
      }
    }),

    // Optimistic AND Pessimistic update. Both
    updateRegionsList: builder.mutation<string[], string[]>({
      query: (args: string[]) => {
        return {
          url: `regions.json`,
          method: 'PUT',
          body: args
        };
      },
      invalidatesTags: (result, error, args, meta) => {
        return [];
      },
      async onQueryStarted(patchArgs: string[], apiActions) {

        const cacheList = pokemonApi.util.selectInvalidatedBy(apiActions.getState(), [{ type: RegionTag, id: 'ALL' }]);
        const patchResults: PatchCollection[] = [];

        cacheList.forEach((cache) => {
          if (cache.endpointName === "fetchRegionList") {
            const patchResult = apiActions.dispatch(
              pokemonApi.util.updateQueryData('fetchRegionList', cache.originalArgs, (draft) => {
                Object.assign(draft, patchArgs);
              })
            );
            patchResults.push(patchResult);
          }
        });

        try {
          const updatedRegions = await apiActions.queryFulfilled;
          // Update item in cache list with call response
          cacheList.forEach((cache) => {
            if (cache.endpointName === "fetchRegionList") {
              apiActions.dispatch(
                pokemonApi.util.updateQueryData('fetchRegionList', cache.originalArgs, (draft) => {
                  Object.assign(draft, updatedRegions.data);
                })
              );
            }
            
          });
        } catch {
          patchResults.forEach((pr) => {
            pr.undo();
          });
          apiActions.dispatch(pokemonApi.util.invalidateTags([{type: RegionTag, id: 'ALL'}]));
        }
      }
    }),

    // Optimistic update
    updatePokemonOrderByRegion: builder.mutation<Region, Region>({
      query: (args: Region) => {
        return {
          url: `${args.id}.json`,
          method: 'PUT',
          body: args
        };
      },
      invalidatesTags: (result, error, args, meta) => {
        return [];
      },
      async onQueryStarted(patchArgs: Region, apiActions) {
        const cacheList = pokemonApi.util.selectInvalidatedBy(apiActions.getState(), [{ type: PokemonTag, id: patchArgs.id }]);
        const patchResults: PatchCollection[] = [];

        cacheList.forEach((cache) => {
          if (cache.endpointName === "fetchPokemonsByRegion") {
            const patchResult = apiActions.dispatch(
              pokemonApi.util.updateQueryData('fetchPokemonsByRegion', cache.originalArgs, (draft) => {
                Object.assign(draft, patchArgs);
              })
            );
            patchResults.push(patchResult);
          }
        });

        try {
          await apiActions.queryFulfilled;
        } catch {
          patchResults.forEach((pr) => {
            pr.undo();
          });
          apiActions.dispatch(pokemonApi.util.invalidateTags([{ type: PokemonTag, id: patchArgs.id }]));
        }
      }
    }),

    updatePokemon: builder.mutation<Pokemon, UpdatePokemon>({
      query: (args: UpdatePokemon) => {
        return {
          url: `${args.region}/pokemons/${args.index}.json`,
          method: 'PUT',
          body: args
        };
      }
    }),

    addPokemon: builder.mutation<Pokemon, UpdatePokemon>({
      query: (args: UpdatePokemon) => {
        const pokemonToAdd: Pokemon = {
          id: +args.id,
          name: args.name,
          sprite: `${BASE_POKEMON_SPRITE_URL}${args.id}.png`
        };
        return {
          url: `${args.region}/pokemons/${args.index}.json`,
          method: 'PUT',
          body: pokemonToAdd
        };
      },
      invalidatesTags: (result, error, args, meta) => {
        return [];
      },
      async onQueryStarted(patchArgs: UpdatePokemon, apiActions) {
        const cacheList = pokemonApi.util.selectInvalidatedBy(apiActions.getState(), [{ type: PokemonTag, id: patchArgs.region }]);
        const patchResults: PatchCollection[] = [];

        cacheList.forEach((cache) => {
          if (cache.endpointName === "fetchPokemonsByRegion") {
            const patchResult = apiActions.dispatch(
              pokemonApi.util.updateQueryData('fetchPokemonsByRegion', cache.originalArgs, (draft) => {
                draft.pokemons.push({
                  id: +patchArgs.id,
                  name: patchArgs.name,
                  sprite: `${BASE_POKEMON_SPRITE_URL}${patchArgs.id}.png`
                });
              })
            );
            patchResults.push(patchResult);
          }
        });

        try {
          await apiActions.queryFulfilled;
        } catch {
          patchResults.forEach((pr) => {
            pr.undo();
          });
          apiActions.dispatch(pokemonApi.util.invalidateTags([{ type: PokemonTag, id: patchArgs.id }]));
        }
      }
    })

  })
});


export const { useFetchRegionListQuery, useFetchPokemonsByRegionQuery, useUpdateRegionsListMutation,
  useUpdatePokemonOrderByRegionMutation, useAddPokemonMutation } = pokemonApi;