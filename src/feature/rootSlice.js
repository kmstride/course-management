import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
    name: "rootSlice",
    initialState: {
        token: null
    },
    reducers: {
        setToken: (state, token) =>{
            state.token = token
        }
    }
});

export const {setToken} = rootSlice.actions;
export default rootSlice.reducer;