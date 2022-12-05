import {GET_URGENCY, GET_URGENCY_ERROR, GET_URGENCY_SUCCESS} from "../dispatchTypes";

export const initialUrgenciesState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    urgencies: [],
}

export const urgenciesReducers = (
    state = initialUrgenciesState,
    action
) => {
    switch (action.type) {
        case GET_URGENCY: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case GET_URGENCY_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                urgencies: action.urgencies,
            };
        }
        case GET_URGENCY_ERROR: {
            return {
                ...state,
                isError: true,
                isSuccess: false,
                isLoading: false,
                errorMessage: action.errorMessage,
            };
        }
        default:
            return state
    }

};