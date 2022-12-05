import axiosConfig from "../../config/axios";
import {
  GET_ORDERS,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_ERROR,
  CREATE_ORDER,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
  GET_ORDER,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
  DELETE_ORDER,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_ERROR,
  UPDATE_ORDER,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_ERROR,
  GET_COMPLETED_ORDERS,
  GET_COMPLETED_ORDERS_SUCCESS,
  GET_COMPLETED_ORDERS_ERROR,
  GET_APPROVED_ORDERS,
  GET_APPROVED_ORDERS_SUCCESS,
  GET_APPROVED_ORDERS_ERROR,
  GET_REJECTED_ORDERS,
  GET_REJECTED_ORDERS_SUCCESS,
  GET_REJECTED_ORDERS_ERROR,
  GET_CANCELLED_ORDERS,
  GET_CANCELLED_ORDERS_SUCCESS,
  GET_CANCELLED_ORDERS_ERROR,
  GET_PENDING_ORDERS,
  GET_PENDING_ORDERS_SUCCESS,
  GET_PENDING_ORDERS_ERROR,
  GET_ACTIVE_ORDERS,
  GET_ACTIVE_ORDERS_SUCCESS,
  GET_ACTIVE_ORDERS_ERROR,
  GET_WAITING_ASSIGN_ORDERS,
  GET_WAITING_ASSIGN_ORDERS_SUCCESS,
  GET_WAITING_ASSIGN_ORDERS_ERROR,
  GET_USER_COUNT_SUMMARY,
  GET_USER_COUNT_SUMMARY_SUCCESS,
  GET_USER_COUNT_SUMMARY_ERROR,
  FILE_UPLOADING,
  FILE_UPLOADING_SUCCESS,
  FILE_UPLOADING_ERROR,
  ORDER_FILES,
  ORDER_FILES_SUCCESS,
  ORDER_FILES_ERROR,
  DELETE_ORDER_FILES,
  DELETE_ORDER_FILES_SUCCESS,
  DELETE_ORDER_FILES_ERROR,
  GET_CANCELLED_REASONS,
  GET_CANCELLED_REASONS_SUCCESS,
  GET_CANCELLED_REASONS_ERROR,
  GET_REJECT_REASONS,
  GET_REJECT_REASONS_SUCCESS,
  GET_REJECT_REASONS_ERROR,
  CANCEL_ORDER,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_ERROR,
  ORDER_REVISION,
  ORDER_REVISION_SUCCESS,
  ORDER_REVISION_ERROR,
  REJECT_ORDER,
  REJECT_ORDER_SUCCESS,
  REJECT_ORDER_ERROR,
  APPROVE_ORDER,
  APPROVE_ORDER_SUCCESS,
  APPROVE_ORDER_ERROR,
  PAY_FROM_WALLET,
  PAY_FROM_WALLET_SUCCESS,
  PAY_FROM_WALLET_ERROR,
  GET_REVISION_ORDERS,
  GET_REVISION_ORDERS_SUCCESS,
  GET_REVISION_ORDERS_ERROR,
  RE_SUBMIT_ORDER,
  RE_SUBMIT_ORDER_SUCCESS,
  RE_SUBMIT_ORDER_ERROR,
} from "../dispatchTypes";

export const getOrders = async (dispatch, userId, page, per) => {
  dispatch({
    type: GET_ORDERS,
  });
  try {
    return await axiosConfig
      .get(`/users/${userId}/orders?page=${page}&per=${per}`, {
        headers: {
          "x-toprated-token": localStorage.token,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_ORDERS_SUCCESS,
          orders: response.data,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: GET_ORDERS_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const getCompletedOrders = async (dispatch, userId, page, per) => {
  dispatch({
    type: GET_COMPLETED_ORDERS,
  });
  try {
    return await axiosConfig
      .get(
        `/users/${userId}/orders?page=${page}&per=${per}&completed_status=true`,
        {
          headers: {
            "x-toprated-token": localStorage.token,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: GET_COMPLETED_ORDERS_SUCCESS,
          completed_orders: response.data,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: GET_COMPLETED_ORDERS_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const getApprovedOrders = async (dispatch, userId, page, per) => {
  dispatch({
    type: GET_APPROVED_ORDERS,
  });
  try {
    return await axiosConfig
      .get(
        `/users/${userId}/orders?page=${page}&per=${per}&approval_status=true`,
        {
          headers: {
            "x-toprated-token": localStorage.token,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: GET_APPROVED_ORDERS_SUCCESS,
          approved_orders: response.data,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: GET_APPROVED_ORDERS_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const getRejectedOrders = async (dispatch, userId, page, per) => {
  dispatch({
    type: GET_REJECTED_ORDERS,
  });
  try {
    return await axiosConfig
      .get(
        `/users/${userId}/orders?page=${page}&per=${per}&rejected_status=true`,
        {
          headers: {
            "x-toprated-token": localStorage.token,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: GET_REJECTED_ORDERS_SUCCESS,
          rejected_orders: response.data,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: GET_REJECTED_ORDERS_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const getCancelledOrders = async (dispatch, userId, page, per) => {
  dispatch({
    type: GET_CANCELLED_ORDERS,
  });
  try {
    return await axiosConfig
      .get(
        `/users/${userId}/orders?page=${page}&per=${per}&cancelled_status=true`,
        {
          headers: {
            "x-toprated-token": localStorage.token,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: GET_CANCELLED_ORDERS_SUCCESS,
          cancelled_orders: response.data,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: GET_CANCELLED_ORDERS_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const getPendingOrders = async (dispatch, userId, page, per) => {
  dispatch({
    type: GET_PENDING_ORDERS,
  });
  try {
    return await axiosConfig
      .get(
        `/users/${userId}/orders?page=${page}&per=${per}&pending_status=true`,
        {
          headers: {
            "x-toprated-token": localStorage.token,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: GET_PENDING_ORDERS_SUCCESS,
          pending_orders: response.data,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: GET_PENDING_ORDERS_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const getWaitingAssignOrders = async (dispatch, userId, page, per) => {
  dispatch({
    type: GET_WAITING_ASSIGN_ORDERS,
  });
  try {
    return await axiosConfig
      .get(
        `/users/${userId}/orders?page=${page}&per=${per}&available_status=true`,
        {
          headers: {
            "x-toprated-token": localStorage.token,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: GET_WAITING_ASSIGN_ORDERS_SUCCESS,
          waiting_assign: response.data,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: GET_WAITING_ASSIGN_ORDERS_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const getActiveOrders = async (dispatch, userId, page, per) => {
  dispatch({
    type: GET_ACTIVE_ORDERS,
  });
  try {
    return await axiosConfig
      .get(
        `/users/${userId}/orders?page=${page}&per=${per}&active_status=true`,
        {
          headers: {
            "x-toprated-token": localStorage.token,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: GET_ACTIVE_ORDERS_SUCCESS,
          active_orders: response.data,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: GET_ACTIVE_ORDERS_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const getRevisionOrders = async (dispatch, userId, page, per) => {
  dispatch({
    type: GET_REVISION_ORDERS,
  });
  try {
    return await axiosConfig
      .get(
        `/users/${userId}/orders?page=${page}&per=${per}&revision_status=true`,
        {
          headers: {
            "x-toprated-token": localStorage.token,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: GET_REVISION_ORDERS_SUCCESS,
          revision_orders: response.data,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: GET_REVISION_ORDERS_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const createOrders = async (dispatch, credentials) => {
  dispatch({
    type: CREATE_ORDER,
  });
  try {
    return await axiosConfig
      .post(`/orders`, credentials, {
        headers: {
          "x-toprated-token": localStorage.token,
        },
      })
      .then((response) => {
        dispatch({
          type: CREATE_ORDER_SUCCESS,
          order: response.data,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const getOrder = async (dispatch, orderID) => {
  dispatch({
    type: GET_ORDER,
  });
  try {
    return await axiosConfig
      .get(`/orders/${orderID}`, {
        headers: {
          "x-toprated-token": localStorage.token,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: response.data,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: GET_ORDER_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const deleleOrder = async (dispatch, orderID) => {
  dispatch({
    type: DELETE_ORDER,
  });
  try {
    return await axiosConfig
      .delete(`/orders/${orderID}`, {
        headers: {
          "x-toprated-token": localStorage.token,
        },
      })
      .then((response) => {
        dispatch({
          type: DELETE_ORDER_SUCCESS,
          order: response.data,
          orderId: orderID,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const updateOrder = async (dispatch, orderID, bodyData) => {
  dispatch({
    type: UPDATE_ORDER,
  });
  try {
    return await axiosConfig
      .put(`/orders/${orderID}`, bodyData, {
        headers: {
          "x-toprated-token": localStorage.token,
        },
      })
      .then((response) => {
        dispatch({
          type: UPDATE_ORDER_SUCCESS,
          order: response.data,
          orderId: orderID,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const userCountOrderSummary = async (dispatch, userID) => {
  dispatch({
    type: GET_USER_COUNT_SUMMARY,
  });
  try {
    return await axiosConfig
      .get(`/users/${userID}/order_count`, {
        headers: {
          "x-toprated-token": localStorage.token,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_USER_COUNT_SUMMARY_SUCCESS,
          user_order_count_summary: response.data,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: GET_USER_COUNT_SUMMARY_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const fileUpload = async (dispatch, uploadedFiles) => {
  dispatch({
    type: FILE_UPLOADING,
  });
  try {
    return await axiosConfig
      .post("/files", uploadedFiles, {
        headers: {
          "x-toprated-token": localStorage.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        dispatch({
          type: FILE_UPLOADING_SUCCESS,
          uploaded_file: response.data,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: FILE_UPLOADING_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const getOrderfiles = async (dispatch, orderID) => {
  dispatch({
    type: ORDER_FILES,
  });
  try {
    return await axiosConfig
      .get(`/orders/${orderID}/files`, {
        headers: {
          "x-toprated-token": localStorage.token,
        },
      })
      .then((response) => {
        dispatch({
          type: ORDER_FILES_SUCCESS,
          order_files: response.data,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: ORDER_FILES_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const deleteOrderFile = async (dispatch, fileID) => {
  dispatch({
    type: DELETE_ORDER_FILES,
  });
  try {
    return await axiosConfig
      .delete(`/files/${fileID}`, {
        headers: {
          "x-toprated-token": localStorage.token,
        },
      })
      .then((response) => {
        dispatch({
          type: DELETE_ORDER_FILES_SUCCESS,
          order_file: response.data,
          fileID: fileID,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FILES_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const getCancelReasons = async (dispatch) => {
  dispatch({
    type: GET_CANCELLED_REASONS,
  });
  try {
    return await axiosConfig
      .get(`/cancel_reasons`, {
        headers: {
          "x-toprated-token": localStorage.token,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_CANCELLED_REASONS_SUCCESS,
          cancelled_reasons: response.data,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: GET_CANCELLED_REASONS_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const getRejectReasons = async (dispatch) => {
  dispatch({
    type: GET_REJECT_REASONS,
  });
  try {
    return await axiosConfig
      .get(`/reject_reasons`, {
        headers: {
          "x-toprated-token": localStorage.token,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_REJECT_REASONS_SUCCESS,
          reject_reasons: response.data,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: GET_REJECT_REASONS_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const cancelOrder = async (dispatch, orderID, bodyData) => {
  dispatch({
    type: CANCEL_ORDER,
  });
  try {
    return await axiosConfig
      .put(`/orders/${orderID}/cancel`, bodyData, {
        headers: {
          "x-toprated-token": localStorage.token,
        },
      })
      .then((response) => {
        dispatch({
          type: CANCEL_ORDER_SUCCESS,
          cancelled_order: response.data,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: CANCEL_ORDER_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const orderRevision = async (dispatch, orderID, bodyData) => {
  dispatch({
    type: ORDER_REVISION,
  });
  try {
    return await axiosConfig
      .put(`/orders/${orderID}/revision`, bodyData, {
        headers: {
          "x-toprated-token": localStorage.token,
        },
      })
      .then((response) => {
        dispatch({
          type: ORDER_REVISION_SUCCESS,
          revision_order: response.data,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: ORDER_REVISION_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const rejectOrder = async (dispatch, orderID, bodyData) => {
  dispatch({
    type: REJECT_ORDER,
  });
  try {
    return await axiosConfig
      .put(`/orders/${orderID}/reject`, bodyData, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "x-toprated-token": localStorage.token,
        },
      })
      .then((response) => {
        dispatch({
          type: REJECT_ORDER_SUCCESS,
          rejected_order: response.data,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: REJECT_ORDER_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};
export const approveOrder = async (dispatch, orderID, bodyData) => {
  dispatch({
    type: APPROVE_ORDER,
  });
  try {
    return await axiosConfig
      .put(`/orders/${orderID}/approve`, bodyData, {
        headers: {
          "x-toprated-token": localStorage.token,
        },
      })
      .then((response) => {
        dispatch({
          type: APPROVE_ORDER_SUCCESS,
          approved_order: response.data,
        });
        console.log(response);
        return response;
      });
  } catch (error) {
    dispatch({
      type: APPROVE_ORDER_ERROR,
      errorMessage: error.response,
    });

    return error.response;
  }
};

export const payFromWallet = async (dispatch, orderID) => {
  dispatch({
    type: PAY_FROM_WALLET,
  });
  try {
    return await axiosConfig
      .put(
        `/orders/${orderID}/withdraw`,
        {},
        {
          headers: {
            "x-toprated-token": localStorage.token,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: PAY_FROM_WALLET_SUCCESS,
          paid_from_wallet_order: response.data,
        });
        console.log(response);
        return response;
      });
  } catch (error) {
    dispatch({
      type: PAY_FROM_WALLET_ERROR,
      errorMessage: error.response,
    });

    return error.response;
  }
};

export const reSubmitOrder = async (dispatch, orderID) => {
  dispatch({
    type: RE_SUBMIT_ORDER,
  });
  try {
    return await axiosConfig
      .put(
        `/orders/${orderID}/resubmit`,
        {},
        {
          headers: {
            "x-toprated-token": localStorage.token,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: RE_SUBMIT_ORDER_SUCCESS,
          re_submitted_order: response.data,
        });
        console.log(response);
        return response;
      });
  } catch (error) {
    dispatch({
      type: RE_SUBMIT_ORDER_ERROR,
      errorMessage: error.response,
    });

    return error.response;
  }
};
