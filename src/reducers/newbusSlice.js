import { createSlice } from "@reduxjs/toolkit";

const newbusStateInit = {
    alert1: 'test',
};

const newbusSlice = createSlice({
    name: "newbusState",
    initialState: newbusStateInit,
    reducers: {
        testing(state, action) {
            state.alert1 = 'Changed'
        },
    },
});

export const { testing } = newbusSlice.actions;

export default newbusSlice.reducer;