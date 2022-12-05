import {
  CREATE_ORDER,
  CREATE_ORDER_ERROR,
  CREATE_ORDER_SUCCESS,
  GET_ORDER,
  GET_ORDER_ERROR,
  GET_ORDER_SUCCESS,
  GET_ORDERS,
  GET_ORDERS_ERROR,
  GET_ORDERS_SUCCESS,
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

export const initialOrdersState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: "",
  orders: {
    orders: [],
    pagination: {},
  },
  completed_orders: {
    orders: [],
    pagination: {},
  },
  approved_orders: {
    orders: [],
    pagination: {},
  },
  rejected_orders: {
    orders: [],
    pagination: {},
  },
  cancelled_orders: {
    orders: [],
    pagination: {},
  },
  pending_orders: {
    orders: [],
    pagination: {},
  },
  active_orders: {
    orders: [],
    pagination: {},
  },
  revision_orders: {
    orders: [],
    pagination: {},
  },
  waiting_assign: {
    orders: [],
    pagination: {},
  },
  order: {},
  uploaded_files: [],
  uploaded_file: [],
  order_files: [],
  order_file: {},
  user_order_count_summary: {},
  cancelled_reasons: [],
  reject_reasons: [],
  rejected_order: {},
  revision_order: {},
  cancelled_order: {},
  approved_order: {},
  paid_from_wallet_order: {},
  re_submitted_order: {},
};

export const ordersReducers = (state = initialOrdersState, action) => {
  switch (action.type) {
    case GET_ORDERS: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case GET_ORDERS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        orders: action.orders,
      };
    }
    case GET_ORDERS_ERROR: {
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case GET_COMPLETED_ORDERS: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case GET_COMPLETED_ORDERS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        completed_orders: action.completed_orders,
      };
    }
    case GET_COMPLETED_ORDERS_ERROR: {
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case GET_APPROVED_ORDERS: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case GET_APPROVED_ORDERS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        approved_orders: action.approved_orders,
      };
    }
    case GET_APPROVED_ORDERS_ERROR: {
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case GET_REJECTED_ORDERS: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case GET_REJECTED_ORDERS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        rejected_orders: action.rejected_orders,
      };
    }
    case GET_REJECTED_ORDERS_ERROR: {
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case GET_CANCELLED_ORDERS: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case GET_CANCELLED_ORDERS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        cancelled_orders: action.cancelled_orders,
      };
    }
    case GET_CANCELLED_ORDERS_ERROR: {
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case GET_PENDING_ORDERS: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case GET_PENDING_ORDERS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        pending_orders: action.pending_orders,
      };
    }
    case GET_PENDING_ORDERS_ERROR: {
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case GET_ACTIVE_ORDERS: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case GET_ACTIVE_ORDERS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        active_orders: action.active_orders,
      };
    }
    case GET_ACTIVE_ORDERS_ERROR: {
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case GET_REVISION_ORDERS: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case GET_REVISION_ORDERS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        revision_orders: action.revision_orders,
      };
    }
    case GET_REVISION_ORDERS_ERROR: {
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case GET_WAITING_ASSIGN_ORDERS: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case GET_WAITING_ASSIGN_ORDERS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        waiting_assign: action.waiting_assign,
      };
    }
    case GET_WAITING_ASSIGN_ORDERS_ERROR: {
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case GET_ORDER: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        order: action.order,
      };
    }
    case GET_ORDER_ERROR: {
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case CREATE_ORDER: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        order: action.order,
      };
    }
    case CREATE_ORDER_ERROR: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case DELETE_ORDER: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case DELETE_ORDER_SUCCESS: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        order: action.order,
        orders: state.orders.orders.filter(
          (item) => item.id !== action.orderId
        ),
      };
    }
    case DELETE_ORDER_ERROR: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case UPDATE_ORDER: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case UPDATE_ORDER_SUCCESS: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        order: action.order,
      };
    }
    case UPDATE_ORDER_ERROR: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case GET_USER_COUNT_SUMMARY: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case GET_USER_COUNT_SUMMARY_SUCCESS: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        user_order_count_summary: action.user_order_count_summary,
      };
    }
    case GET_USER_COUNT_SUMMARY_ERROR: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case FILE_UPLOADING: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case FILE_UPLOADING_SUCCESS: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        uploaded_file: action.uploaded_file,
      };
    }
    case FILE_UPLOADING_ERROR: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case ORDER_FILES: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case ORDER_FILES_SUCCESS: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        order_files: action.order_files,
      };
    }
    case ORDER_FILES_ERROR: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case DELETE_ORDER_FILES: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case DELETE_ORDER_FILES_SUCCESS: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        order_files: state.order_files.filter(
          (item) => item.id !== action.fileID
        ),
        order_file: action.order_file,
      };
    }
    case DELETE_ORDER_FILES_ERROR: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case GET_CANCELLED_REASONS: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case GET_CANCELLED_REASONS_SUCCESS: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        cancelled_reasons: action.cancelled_reasons,
      };
    }
    case GET_CANCELLED_REASONS_ERROR: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case GET_REJECT_REASONS: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case GET_REJECT_REASONS_SUCCESS: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        reject_reasons: action.reject_reasons,
      };
    }
    case GET_REJECT_REASONS_ERROR: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case CANCEL_ORDER: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case CANCEL_ORDER_SUCCESS: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        cancelled_order: action.cancelled_order,
      };
    }
    case CANCEL_ORDER_ERROR: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case ORDER_REVISION: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case ORDER_REVISION_SUCCESS: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        revision_order: action.revision_order,
      };
    }
    case ORDER_REVISION_ERROR: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case APPROVE_ORDER: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case APPROVE_ORDER_SUCCESS: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        approved_order: action.approved_order,
      };
    }
    case APPROVE_ORDER_ERROR: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case REJECT_ORDER: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case REJECT_ORDER_SUCCESS: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        rejected_order: action.rejected_order,
      };
    }
    case REJECT_ORDER_ERROR: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case PAY_FROM_WALLET: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case PAY_FROM_WALLET_SUCCESS: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        paid_from_wallet_order: action.paid_from_wallet_order,
      };
    }
    case PAY_FROM_WALLET_ERROR: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case RE_SUBMIT_ORDER: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case RE_SUBMIT_ORDER_SUCCESS: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        re_submitted_order: action.re_submitted_order,
      };
    }
    case RE_SUBMIT_ORDER_ERROR: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    default:
      return state;
  }
};
