import * as actions from "../actions/setStats";
export default (state, action) => {
  switch (action.type) {
    case "panel":
      return {
        panel: action.payload
      };
    case actions.GET_DATA_REQUESTED:
      return { ...state, isLoading: true };
    case actions.GET_DATA_DONE:
      return { ...state, isLoading: false, info: action.payload };
    case actions.GET_DATA_FAILED:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};
