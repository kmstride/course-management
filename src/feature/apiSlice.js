import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rootApi= createApi({
    reducerPath: "rootApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `https://course-management-server-406y.onrender.com/api/v1/`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState()?.auth?.token?.payload;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ["user", "course"],
    endpoints: (builder) => ({})
});