import axiosConfig from "../../config/axios";
import { GET_SOURCES, SOURCE_ERROR, SOURCE_SUCCESS } from "../dispatchTypes";

export const getSources = (dispatch) => {
  dispatch({
    type: GET_SOURCES,
  });

  axiosConfig
    .get(`/sources`)
    .then((response) => {
      dispatch({
        type: SOURCE_SUCCESS,
        sources: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: SOURCE_ERROR,
        errorMessage: error.response.data.error_message,
      });
    })
    .catch(() => {
      dispatch({
        type: SOURCE_ERROR,
        errorMessage:
          "Lost connection to the server. Kindly check your internet connection",
      });
    });
};
