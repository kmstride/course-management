import { configureStore } from "@reduxjs/toolkit";
import rootSlice from "../feature/rootSlice";
import { rootApi } from "../feature/apiSlice";

export default configureStore({
  reducer: {
    auth: rootSlice,
    [rootApi.reducerPath]: rootApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootApi.middleware),
});
