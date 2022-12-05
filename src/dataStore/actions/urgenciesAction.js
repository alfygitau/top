import axiosConfig from "../../config/axios";
import {
  GET_URGENCY,
  GET_URGENCY_ERROR,
  GET_URGENCY_SUCCESS,
} from "../dispatchTypes";

export const getUrgencies = (dispatch) => {
  dispatch({
    type: GET_URGENCY,
  });

  axiosConfig
    .get(`/urgencies`)
    .then((response) => {
      dispatch({
        type: GET_URGENCY_SUCCESS,
        urgencies: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_URGENCY_ERROR,
        errorMessage: error.response.data.error_message,
      });
    })
    .catch(() => {
      dispatch({
        type: GET_URGENCY_ERROR,
        errorMessage:
          "Lost connection to the server. Kindly check your internet connection",
      });
    });
};
