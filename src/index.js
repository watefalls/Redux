import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import configureStore from "./store/store";
import {
  titleChange,
  taskRemove,
  completeTask,
  getTasks,
  getTaskLoadingStatus,
  loadTasks,
  CreateTask,
} from "./store/task";
import { getErrors } from "./store/errors";

const store = configureStore();

const App = () => {
  const state = useSelector(getTasks());
  const loading = useSelector(getTaskLoadingStatus());
  const error = useSelector(getErrors());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  const changeTitle = (taskId) => {
    dispatch(titleChange(taskId));
  };

  const removeTask = (taskId) => {
    dispatch(taskRemove(taskId));
  };

  if (loading) {
    return <h1>Loading...</h1>;
  } else if (error) {
    return <p>{error}</p>;
  }

  console.log(state);
  return (
    <>
      <h1>App</h1>
      <button onClick={() => dispatch(CreateTask())}>Create new task</button>
      <ul>
        {state.map((el, index) => (
          <li key={index}>
            <p style={{ textTransform: "uppercase" }}>{el.title}</p>
            <p>
              Status <strong>{`${el.completed}`}</strong>
            </p>
            <button onClick={() => dispatch(completeTask(el.id))}>
              Completed
            </button>
            <button onClick={() => changeTitle(el.id)}>Change title</button>
            <button onClick={() => removeTask(el.id)}>Delete</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
