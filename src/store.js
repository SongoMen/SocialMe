import { createStore, applyMiddleware } from "redux";
import dashboardReducer from "./reducers/dashboardReducer";
import thunk from "redux-thunk";

function configureStore(state = { panel: "instagram" }) {
  return createStore(
    dashboardReducer,
    { isLoading: true, isError: false, info: [],panel:"instagram" },
    applyMiddleware(thunk)
  );
}

export default configureStore;
