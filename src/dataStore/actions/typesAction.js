import axiosConfig from "../../config/axios";
import { GET_TYPE_ERROR, GET_TYPE_SUCCESS, GET_TYPES } from "../dispatchTypes";

export const getTypes = (dispatch) => {
  dispatch({
    type: GET_TYPES,
  });

  axiosConfig
    .get(`/types`)
    .then((response) => {
      dispatch({
        type: GET_TYPE_SUCCESS,
        types: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_TYPE_ERROR,
        errorMessage: error.response.data.error_message,
      });
    })
    .catch(() => {
      dispatch({
        type: GET_TYPE_ERROR,
        errorMessage:
          "Lost connection to the server. Kindly check your internet connection",
      });
    });
};
