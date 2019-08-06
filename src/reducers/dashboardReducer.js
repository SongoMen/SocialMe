import * as actions from "../actions/setStats";
import * as panelactions from "../actions/setPanel";

export default (state, action) => {
  switch (action.type) {
    case panelactions.SET_PANEL_TYPE:
      return { ...state, panel: action.payload };
    case panelactions.SET_ACCES_TOKEN:
      return { ...state, token: action.payload };
    case panelactions.SET_ACCOUNT_TYPE:
        return { ...state, type: action.payload };
      case panelactions.SET_USERNAME:
          return { ...state, name: action.payload };
    case actions.GET_DATA_REQUESTED:
      return { ...state, isError: false, isLoading: true };
    case actions.GET_DATA_DONE_FACEBOOK:
      return { ...state, isError: false, isLoading: false, facebookInfo: action.payload };
    case actions.GET_DATA_DONE_INSTAGRAM:
      return { ...state, isError: false, isLoading: false, instagramInfo: action.payload };
    case actions.GET_DATA_FAILED:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};
