import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICategory } from "../helpers/interfaces";

type CategoriesResponse = ICategory[];

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  tagTypes: ["categories"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://notebook-api-zaklaxd.herokuapp.com/api/",
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesResponse, void>({
      query: () => "categories",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "categories" as const,
                _id,
              })),
              { type: "categories", id: "LIST" },
            ]
          : [{ type: "categories", id: "LIST" }],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
