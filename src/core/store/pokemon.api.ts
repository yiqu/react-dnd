import { createApi, fetchBaseQuery, TagDescription } from '@reduxjs/toolkit/query/react';
import { BASE_FIREBASE_URL } from '../../shared/api/endpoints';
import { Pokemon, Region } from './pokemon.state';
import { PatchCollection } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import { current } from 'immer';


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

    updateRegions: builder.mutation<string[], string[]>({
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
        console.log(patchArgs);

        const cacheList = pokemonApi.util.selectInvalidatedBy(apiActions.getState(), [{ type: RegionTag, id: 'ALL' }]);
        const patchResults: PatchCollection[] = [];

        cacheList.forEach((cache) => {
          if (cache.endpointName === "fetchRegionList") {
            const patchResult = apiActions.dispatch(
              pokemonApi.util.updateQueryData('fetchRegionList', cache.originalArgs, (draft) => {
                console.log(current(draft))
                Object.assign(draft, patchArgs)
              })
            )
          }
        });
      }
    })

  })
});


export const { useFetchRegionListQuery, useFetchPokemonsByRegionQuery, useUpdateRegionsMutation } = pokemonApi;