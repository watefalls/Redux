import { createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import { setError } from "./errors";

const initialState = { entities: [], isLoading: true };

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    recived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      );
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload,
      };
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    taskRequested(state) {
      state.isLoading = true;
    },
    taskRequestedFailed(state) {
      state.isLoading = false;
    },
    taskCreate(state, action) {
      state.entities.unshift(action.payload);
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const {
  update,
  remove,
  recived,
  taskRequested,
  taskRequestedFailed,
  taskCreate,
} = actions;

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.fetch();
    dispatch(recived(data));
  } catch (error) {
    dispatch(taskRequestedFailed());
    dispatch(setError(error.message));
  }
};

export const CreateTask = () => async (dispatch) => {
  try {
    const data = await todosService.create({
      title: `You created new task `,
      completed: false,
    });
    dispatch(taskCreate(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const completeTask = (id) => (dispatch) => {
  dispatch(update({ id, completed: true }));
};

export function titleChange(id) {
  return update({ id, title: `New title for ${id}` });
}

export function taskRemove(id) {
  return remove({ id });
}

export const getTasks = () => (state) => state.tasks.entities;
export const getTaskLoadingStatus = () => (state) => state.tasks.isLoading;

export default taskReducer;
