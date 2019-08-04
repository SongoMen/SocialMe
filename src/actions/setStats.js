export const GET_DATA_REQUESTED = "GET_DATA_REQUESTED";
export const GET_DATA_DONE = "GET_DATA_DONE";
export const GET_DATA_FAILED = "GET_DATA_FAILED";

export function getDataRequested() {
  return {
    type: "GET_DATA_REQUESTED"
  };
}

export function getDataDone(data) {
  return {
    type: "GET_DATA_DONE",
    payload: data
  };
}

export function getDataFailed(error) {
  return {
    type: "GET_DATA_FAILED",
    payload: error
  };
}

export function getData(token) {
  return dispatch => {
    // set state to "loading"

    fetch(`https://api.instagram.com/v1/users/self/?access_token=${token}`)
      .then(res => res.json())
      .then(result => {
        if (result.data.counts.followed_by !== undefined)
          dispatch(getDataDone(result.data.counts.followed_by));
      })
      .catch(error => {
        // set state for error
        dispatch(getDataFailed(error));
      });
  };
}
