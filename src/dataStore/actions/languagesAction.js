import axiosConfig from "../../config/axios";
import {
  GET_LANGUAGES,
  LANGUAGE_ERROR,
  LANGUAGE_SUCCESS,
} from "../dispatchTypes";

export const getLanguages = (dispatch) => {
  dispatch({
    type: GET_LANGUAGES,
  });

  axiosConfig
    .get(`/languages`)
    .then((response) => {
      dispatch({
        type: LANGUAGE_SUCCESS,
        languages: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: LANGUAGE_ERROR,
        errorMessage: error.response.data.error_message,
      });
    })
    .catch(() => {
      dispatch({
        type: LANGUAGE_ERROR,
        errorMessage:
          "Lost connection to the server. Kindly check your internet connection",
      });
    });
};
