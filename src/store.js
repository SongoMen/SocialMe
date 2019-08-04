import { createStore } from "redux";
import dashboardReducer from "./reducers/dashboardReducer";

function configureStore(state = { load: true }) {
  return createStore(dashboardReducer,state);
}

export default configureStore;