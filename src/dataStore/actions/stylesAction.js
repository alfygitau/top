import axiosConfig from "../../config/axios";
import { GET_STYLES, STYLE_ERROR, STYLE_SUCCESS } from "../dispatchTypes";

export const getStyles = (dispatch) => {
  dispatch({
    type: GET_STYLES,
  });

  axiosConfig
    .get(`/styles`)
    .then((response) => {
      dispatch({
        type: STYLE_SUCCESS,
        styles: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: STYLE_ERROR,
        errorMessage: error.response.data.error_message,
      });
    })
    .catch(() => {
      dispatch({
        type: STYLE_ERROR,
        errorMessage:
          "Lost connection to the server. Kindly check your internet connection",
      });
    });
};
