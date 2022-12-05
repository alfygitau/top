import {
    GET_TYPE_ERROR,
    GET_TYPE_SUCCESS,
    GET_TYPES
} from "../dispatchTypes";

export const initialTypesState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    types: [],
}

export const typesReducers = (
    state = initialTypesState,
    action
) => {
    switch (action.type) {
        case GET_TYPES: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case GET_TYPE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                types: action.types,
            };
        }
        case GET_TYPE_ERROR: {
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