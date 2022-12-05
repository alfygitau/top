import axiosConfig from "../../config/axios";
import {
  CREATE_MESSAGE,
  CREATE_MESSAGE_ERROR,
  CREATE_MESSAGE_SUCCESS,
  LIST_MESSAGES,
  LIST_MESSAGES_ERROR,
  LIST_MESSAGES_SUCCESS,
} from "dataStore/dispatchTypes";

export const filterMessages = async (dispatch, order_number) => {
  dispatch({
    type: LIST_MESSAGES,
  });
  try {
    return await axiosConfig
      .get(`/orders/${order_number}/messages`, {
        headers: {
          "x-toprated-token": localStorage.token,
        },
      })
      .then((response) => {
        dispatch({
          type: LIST_MESSAGES_SUCCESS,
          messages: response.data,
        });
        console.log(response);
        return response;
      });
  } catch (error) {
    dispatch({
      type: LIST_MESSAGES_ERROR,
      errorMessage: error.response,
    });

    return error.response;
  }
};

export const createMessage = async (dispatch, message) => {
  dispatch({
    type: CREATE_MESSAGE,
  });
  try {
    return await axiosConfig
      .post("/messages", message, {
        headers: {
          "x-toprated-token": localStorage.token,
        },
      })
      .then((response) => {
        dispatch({
          type: CREATE_MESSAGE_SUCCESS,
          message: response.data,
        });
        console.log(response);
        return response;
      });
  } catch (error) {
    dispatch({
      type: CREATE_MESSAGE_ERROR,
      errorMessage: error.response,
    });

    return error.response;
  }
};
