import { LOADING, SUCCESS, ERROR } from '../dispatchTypes';

export const initialCheckDetailsState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: '',
};

const checkDetailsReducer = (state, action) => {
  switch (action.type) {
    case LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };
    }
    case ERROR: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.errorMessage,
      };
    }
    default:
      return initialCheckDetailsState;
  }
};

export default checkDetailsReducer;
