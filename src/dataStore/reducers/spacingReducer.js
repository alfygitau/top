import {GET_SPACING, SPACING_ERROR, SPACING_SUCCESS} from "../dispatchTypes";

export const initialSpacingState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    spacings: [],
}

export const spacingReducers = (
    state = initialSpacingState,
    action
) => {
    switch (action.type) {
        case GET_SPACING: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case SPACING_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                spacings: action.spacings,
            };
        }
        case SPACING_ERROR: {
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