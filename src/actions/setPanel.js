export const SET_PANEL_TYPE = "SET_PANEL_TYPE";

export function setPanel(paneltype) {
  return {
    type: SET_PANEL_TYPE,
    payload: paneltype
  };
}