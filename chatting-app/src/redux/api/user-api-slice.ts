import { BASE_URL } from "../constants";
import { apiSlice } from "./api-slice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/api/v1/auth/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/api/v1/auth/register`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${BASE_URL}/api/v1/auth/logout`,
        method: "POST",
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: `${BASE_URL}/api/v1/auth/users`,
        method: "GET",
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: `${BASE_URL}/api/v1/auth/me`,
        method: "GET",
      }),
    }),
    getUserById: builder.query({
      query: (id: string) => ({
        url: `${BASE_URL}/api/v1/auth/user/${id}`,
        method: "GET",
      }),
    }),
    searchUser: builder.query({
      query: (keyword) => ({
        url: `${BASE_URL}/api/v1/auth/search/users`,
        method: "GET",
        params: {
          q: keyword,
          take: 10,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetUsersQuery,
  useGetProfileQuery,
  useGetUserByIdQuery,
  useSearchUserQuery,
} = userApiSlice;
