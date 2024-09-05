// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { HomeData, RelatedUser, user } from "../interfaces/interfaces";

// export const api = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
//   endpoints: (builder) => ({
//     getUsers: builder.query<user[], void>({
//       query: () => "user/find-all",
//     }),
//     getHomesByUser: builder.query<HomeData[], { user: string; page: number }>({
//       query: ({ user, page }) => `home/find-by-user?user=${user}&page=${page}`,
//     }),
//     getRelatedUsers: builder.query<user[], string>({
//       query: (streetAddress) => `user/find-by-home?streetAddress=${streetAddress}`,
//     }),
//     updateHomeUsers: builder.mutation<
//       { message: string },
//       { users: string[]; street_address: string }
//     >({
//       query: (body) => ({
//         url: "home/update-users",
//         method: "POST",
//         body,
//       }),
//     }),
//   }),
// });

// export const {
//   useGetUsersQuery,
//   useGetHomesByUserQuery,
//   useGetRelatedUsersQuery,
//   useUpdateHomeUsersMutation,
// } = api;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HomeData, RelatedUser, user } from "../interfaces/interfaces";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["User", "Home"], // Define tag types
  endpoints: (builder) => ({
    getUsers: builder.query<user[], void>({
      query: () => "user/find-all",
      providesTags: ["User"], // Provides User tag
    }),
    getHomesByUser: builder.query<HomeData[], { user: string; page: number }>({
      query: ({ user, page }) => `home/find-by-user?user=${user}&page=${page}`,
      providesTags: (result, error, { user }) => [{ type: "Home", id: user }], // Provides Home tag with user id
    }),
    getRelatedUsers: builder.query<user[], string>({
      query: (streetAddress) => `user/find-by-home?streetAddress=${streetAddress}`,
      providesTags: (result, error, streetAddress) => [{ type: "Home", id: streetAddress }], // Provides Home tag with streetAddress
    }),
    updateHomeUsers: builder.mutation<
      { message: string },
      { users: string[]; street_address: string }
    >({
      query: (body) => ({
        url: "home/update-users",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { street_address }) => [
        { type: "Home", id: street_address }, // Invalidate Home tag with street_address
      ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetHomesByUserQuery,
  useGetRelatedUsersQuery,
  useUpdateHomeUsersMutation,
} = api;
