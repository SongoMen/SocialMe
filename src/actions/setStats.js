export const GET_DATA_REQUESTED = "GET_DATA_REQUESTED";
export const GET_DATA_DONE_INSTAGRAM = "GET_DATA_DONE_INSTAGRAM";
export const GET_DATA_DONE_FACEBOOK = "GET_DATA_DONE_FACEBOOK";
export const GET_DATA_FAILED = "GET_DATA_FAILED";

export function getDataRequested() {
  return {
    type: "GET_DATA_REQUESTED"
  };
}

export function getDataDoneInstagram(data) {
  return {
    type: GET_DATA_DONE_INSTAGRAM,
    payload: data
  };
}

export function getDataDoneFacebook(data) {
  return {
    type: GET_DATA_DONE_FACEBOOK,
    payload: data
  };
}

export function getDataFailed(error) {
  return {
    type: "GET_DATA_FAILED",
    payload: error
  };
}

export function getDataInstagram(token) {
  return dispatch => {
    // set state to "loading"
    dispatch(getDataRequested());
    fetch(`https://api.instagram.com/v1/users/self/?access_token=${token}`)
      .then(res => res.json())
      .then(result => {
        if (result.data.counts.followed_by !== undefined)
          dispatch(getDataDoneInstagram(result.data.counts.followed_by));
      })
      .catch(error => {
        // set state for error
        dispatch(getDataFailed(error));
      });
  };
}

export function getDataFacebook(token) {
  console.log(token);
  return dispatch => {
    // set state to "loading"
    dispatch(getDataRequested());
    fetch(
      `https://graph.facebook.com/v4.0/1867667820166462?fields=insights.metric(page_fans,page_impressions,page_actions_post_reactions_total)&access_token=${token}&debug=all&format=json&method=get&pretty=0&suppress_http_code=1&transport=cors`
    )
      .then(res => res.json())
      .then(result => {
        if (result.insights !== undefined)
          dispatch(getDataDoneFacebook(result.insights.data[0].values));
        else dispatch(getDataFailed("err"));
      })
      .catch(error => {
        // set state for error
        dispatch(getDataFailed(error));
      });
  };
}
