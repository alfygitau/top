import axiosConfig from "../../config/axios";
import { GET_SERVICES, SERVICE_ERROR, SERVICE_SUCCESS } from "../dispatchTypes";

export const getServices = (dispatch) => {
  dispatch({
    type: GET_SERVICES,
  });

  axiosConfig
    .get(`/services`)
    .then((response) => {
      dispatch({
        type: SERVICE_SUCCESS,
        services: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: SERVICE_ERROR,
        errorMessage: error.response.data.error_message,
      });
    })
    .catch(() => {
      dispatch({
        type: SERVICE_ERROR,
        errorMessage:
          "Lost connection to the server. Kindly check your internet connection",
      });
    });
};
