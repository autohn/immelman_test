import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export interface ICharacter {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: Date;
  edited: Date;
  url: string;
}

export const characterdetailAPI = createApi({
  reducerPath: "filmdetailAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api/" }),
  tagTypes: ["Film"],
  endpoints: (build) => ({
    fetchAllFilms: build.query<ICharacter, { characterid: string }>({
      query: ({ characterid }) => ({
        url: `/people/${characterid}`,
        params: {},
      }),
      providesTags: (result) => ["Film"],
    }),
  }),
});

export const charactersearchAPI = createApi({
  reducerPath: "filmdetailAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api/" }),
  tagTypes: ["Film"],
  endpoints: (build) => ({
    fetchAllFilms: build.query<ICharacter, { characterid: string }>({
      query: ({ characterid }) => ({
        url: `/people${characterid}`,
        params: {},
      }),
      providesTags: (result) => ["Film"],
    }),
  }),
});
