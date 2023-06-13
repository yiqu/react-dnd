import { createApi, fetchBaseQuery, TagDescription } from '@reduxjs/toolkit/query/react';
import { BASE_FIREBASE_URL } from '../../../src/shared/api/endpoints';
import { Film, FireResult } from './films.state';

export const filmsPath = "movies.json";

export const filmsTag = "Films";

export const filmsApi = createApi({
  reducerPath: 'films',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_FIREBASE_URL
  }),
  tagTypes: [filmsTag],
  endpoints: (builder) => ({
    fetchFilms: builder.query<Film[], void>({
      query: (_: void) => {
        return {
          url: `${filmsPath}`,
          method: 'GET'
        };
      },
      transformResponse: (response: FireResult, _meta, _args: void) => {
        const keys = Object.keys(response);
        const result: Film[] = [];
        keys.forEach((key) => {
          result.push({
            fireid: key,
            director: response[key].director,
            name: response[key].name,
            releaseDate: response[key].releaseDate
          });
        });
        return result;
      },
      providesTags: (result, _error, _args, _meta) => {
        const tags: TagDescription<"Films">[] = [];
        result?.forEach((res: Film) => {
          tags.push({type: filmsTag, id: res.fireid});
        });
        tags.push(filmsTag);
        return tags;
      }
    }),

  })
});


export const { useFetchFilmsQuery } = filmsApi;