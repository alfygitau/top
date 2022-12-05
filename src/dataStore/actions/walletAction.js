import axiosConfig from "../../config/axios";
import {
  EXECUTE_PAYMENT,
  EXECUTE_PAYMENT_SUCCESS,
  EXECUTE_PAYMENT_ERROR,
  MAKE_PAYMENT,
  MAKE_PAYMENT_SUCCESS,
  MAKE_PAYMENT_ERROR,
  GET_USER_WALLET_SUMMARY,
  GET_USER_WALLET_SUMMARY_SUCCESS,
  GET_USER_WALLET_SUMMARY_ERROR,
  FILTER_WALLET_TRANSACTIONS,
  FILTER_WALLET_TRANSACTIONS_SUCCESS,
  FILTER_WALLET_TRANSACTIONS_ERROR,
} from "../dispatchTypes";

export const userWalletSummary = async (dispatch, userID) => {
  dispatch({
    type: GET_USER_WALLET_SUMMARY,
  });
  try {
    return await axiosConfig
      .get(`/users/${userID}/wallet_summary`, {
        headers: {
          "x-toprated-token": localStorage.token,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_USER_WALLET_SUMMARY_SUCCESS,
          user_wallet_summary: response.data,
        });

        return response;
      });
  } catch (error) {
    dispatch({
      type: GET_USER_WALLET_SUMMARY_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};
export const makePayment = async (dispatch, bodyData) => {
  dispatch({
    type: MAKE_PAYMENT,
  });
  try {
    return await axiosConfig
      .post("/make_payment", bodyData, {
        headers: {
          "x-toprated-token": localStorage.token,
        },
      })
      .then((response) => {
        dispatch({
          type: MAKE_PAYMENT_SUCCESS,
        });

        return response;
      });
  } catch (error) {
    dispatch({
      type: MAKE_PAYMENT_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const executePayment = async (dispatch, userID, paymentId, PayerID) => {
  dispatch({
    type: EXECUTE_PAYMENT,
  });
  try {
    return await axiosConfig
      .get(
        `/users/${userID}/paypal_success_callback?paymentId=${paymentId}&PayerID=${PayerID}`,
        {
          headers: {
            "x-toprated-token": localStorage.token,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: EXECUTE_PAYMENT_SUCCESS,
          results: response.data,
        });

        return response;
      });
  } catch (error) {
    dispatch({
      type: EXECUTE_PAYMENT_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const filterWalletTransactions = async (dispatch, userID, per, page) => {
  dispatch({
    type: FILTER_WALLET_TRANSACTIONS,
  });
  try {
    return await axiosConfig
      .get(`/users/${userID}/wallet_transactions?page=${page}&per=${per}`, {
        headers: {
          "x-toprated-token": localStorage.token,
        },
      })
      .then((response) => {
        dispatch({
          type: FILTER_WALLET_TRANSACTIONS_SUCCESS,
          wallet_transactions: response.data,
        });

        return response;
      });
  } catch (error) {
    dispatch({
      type: FILTER_WALLET_TRANSACTIONS_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};
