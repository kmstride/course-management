import { rootApi } from "./apiSlice";

const courseApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "/course/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["course"],
    }),
    getAllCourse: builder.query({
      query: ({ page, size }) => `/courses/all?page=${page}&size=${size}`,
      providesTags: ["course"],
    }),
    singleCourseById: builder.query({
      query: (id) => `/course/${id}`,
    }),
    courseByUser: builder.query({
      query: ({ page, size }) =>
        `/course/courseByUser?page=${page}&size=${size}`,
      providesTags: ["course"],
    }),
    countCourse: builder.query({
      query: () => "/course/count",
    }),
    countCourseByUser: builder.query({
      query: () => "/course/myPostsCount",
    }),
    updateCourseById: builder.mutation({
      query: ({ data, id }) => ({
        url: `/course/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["course"],
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/course/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["course"],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCourseQuery,
  useSingleCourseByIdQuery,
  useCourseByUserQuery,
  useCountCourseQuery,
  useCountCourseByUserQuery,
  useUpdateCourseByIdMutation,
  useDeleteCourseMutation
} = courseApi;
