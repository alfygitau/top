import {GET_STYLES, STYLE_ERROR, STYLE_SUCCESS} from "../dispatchTypes";

export const initialStylesState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    styles: [],
}

export const stylesReducers = (
    state = initialStylesState,
    action
) => {
    switch (action.type) {
        case GET_STYLES: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case STYLE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                styles: action.styles,
            };
        }
        case STYLE_ERROR: {
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