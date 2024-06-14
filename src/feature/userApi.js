import { rootApi } from "./apiSlice";

const userApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    regUserData: builder.mutation({
      query: (data) => ({
        url: "user/updateUserData",
        method: "PUT",
        body: data,
      }),
    }),
    login:builder.mutation({
      query: (data) => ({
        url: "user/login",
        method: "POST",
        body: data,
      }),
    }),
    googleLogin: builder.mutation({
      query: (data) => ({
        url: "auth/googleSignIn",
        method: "PUT",
        body: data,
      }),
    }),
    loggedIn: builder.query({
      query: () => "auth/loggedIn",
      providesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "auth/update",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useRegUserDataMutation,
  useLoginMutation,
  useGoogleLoginMutation,
  useLoggedInQuery,
  useUpdateUserMutation,
} = userApi;
