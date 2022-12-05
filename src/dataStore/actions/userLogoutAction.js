import axiosConfig from "../../config/axios";

import { LOADING, SUCCESS, ERROR } from "../dispatchTypes";

export const logoutUser = (dispatchLogoutUser, sessionID) => {
  dispatchLogoutUser({
    type: LOADING,
  });

  try {
    axiosConfig
      .post(`/sessions/${sessionID}`, {
        headers: {
          "X-TOPRATED-TOKEN": localStorage.token,
        },
      })
      .then((response) => {
        localStorage.activeUser = JSON.stringify({
          user: response.data,
        });
        dispatchLogoutUser({
          type: SUCCESS,
        });
      })
      .catch((error) => {
        dispatchLogoutUser({
          type: ERROR,
          errorMessage: error.response.data.error_message,
        });
      })
      .catch(() => {
        dispatchLogoutUser({
          type: ERROR,
          errorMessage: "Failed to process request. Check internet connection",
        });
      });
  } catch (error) {
    dispatchLogoutUser({
      type: ERROR,
      errorMessage: "Something went wrong, try again later!",
    });
  }
};
