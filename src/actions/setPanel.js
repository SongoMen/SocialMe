export const SET_PANEL_TYPE = "SET_PANEL_TYPE";
export const SET_ACCOUNT_TYPE = "SET_ACCOUNT_TYPE";
export const SET_ACCES_TOKEN = "SET_ACCES_TOKEN";
export const SET_USERNAME = "SET_USERNAME";

export function setPanel(paneltype) {
  return {
    type: SET_PANEL_TYPE,
    payload: paneltype
  };
}

export function setType(data) {
  return {
    type: SET_ACCOUNT_TYPE,
    payload: data
  };
}

export function setAcces(token) {
  return {
    type: SET_ACCES_TOKEN,
    payload: token
  };
}

export function setUser(name) {
  return {
    type: SET_USERNAME,
    payload: name
  };
}