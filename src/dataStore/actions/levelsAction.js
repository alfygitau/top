import axiosConfig from "../../config/axios";

import { GET_LEVELS, LEVEL_ERROR, LEVEL_SUCCESS } from "../dispatchTypes";

export const getLevels = (dispatch) => {
  dispatch({
    type: GET_LEVELS,
  });

  axiosConfig
    .get(`/levels`)
    .then((response) => {
      dispatch({
        type: LEVEL_SUCCESS,
        levels: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: LEVEL_ERROR,
        errorMessage: error.response.data.error_message,
      });
    })
    .catch(() => {
      dispatch({
        type: LEVEL_ERROR,
        errorMessage:
          "Lost connection to the server. Kindly check your internet connection",
      });
    });
};
