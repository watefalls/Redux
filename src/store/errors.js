import { createSlice } from "@reduxjs/toolkit";
const initialState = { entities: [] };

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    set(state, action) {
      state.entities.push(action.payload);
    },
  },
});

const { actions, reducer: errorReducer } = errorSlice;
const { set } = actions;

export const setError = (message) => (dispath) => {
  dispath(set(message));
};

export const getErrors = () => (state) => state.errors.entities[0];

export default errorReducer;
