import {
    CREATE_MESSAGE, CREATE_MESSAGE_ERROR,
    CREATE_MESSAGE_SUCCESS,
    LIST_MESSAGES,
    LIST_MESSAGES_ERROR,
    LIST_MESSAGES_SUCCESS
} from "../dispatchTypes";

export const initialMessageState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    messages: [],
    message:{}
}

export const messagesReducers = (
    state = initialMessageState,
    action
) => {
    switch (action.type) {
        case LIST_MESSAGES: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case LIST_MESSAGES_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                messages: action.messages,
            };
        }
        case LIST_MESSAGES_ERROR: {
            return {
                ...state,
                isError: true,
                isSuccess: false,
                isLoading: false,
                errorMessage: action.errorMessage,
            };
        }
        case CREATE_MESSAGE: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case CREATE_MESSAGE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                message: action.message,
            };
        }
        case CREATE_MESSAGE_ERROR: {
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