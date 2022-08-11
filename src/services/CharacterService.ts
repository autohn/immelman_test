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

export interface ICharacters {
  count: number;
  next: string;
  previous: string;
  results: Array<ICharacter>;
}

export const characterAPI = createApi({
  reducerPath: "characterAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api/" }),
  tagTypes: ["Character"],
  endpoints: (build) => ({
    GetCharacter: build.query<ICharacter, { characterid: string }>({
      query: ({ characterid }) => ({
        url: `/people/${characterid}`,
        /*         params: {}, */
      }),
      providesTags: (result) => ["Character"],
    }),
    SearchCharacters: build.query<ICharacters, { search: string }>({
      query: ({ search }) => ({
        url: `/people/?search=${search}`,
      }),
      providesTags: (result) => ["Character"],
    }),
  }),
});
