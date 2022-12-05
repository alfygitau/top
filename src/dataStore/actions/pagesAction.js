import axiosConfig from "../../config/axios";
import { GET_PAGES, PAGE_ERROR, PAGE_SUCCESS } from "../dispatchTypes";

export const getPages = (dispatch) => {
  dispatch({
    type: GET_PAGES,
  });

  axiosConfig
    .get(`/pages`)
    .then((response) => {
      dispatch({
        type: PAGE_SUCCESS,
        pages: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: PAGE_ERROR,
        errorMessage: error.response.data.error_message,
      });
    })
    .catch(() => {
      dispatch({
        type: PAGE_ERROR,
        errorMessage:
          "Lost connection to the server. Kindly check your internet connection",
      });
    });
};
