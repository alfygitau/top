import {GET_LANGUAGES, LANGUAGE_ERROR, LANGUAGE_SUCCESS} from "../dispatchTypes";

export const initialLanguagesState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    languages: [],
}

export const languagesReducers = (
    state = initialLanguagesState,
    action
) => {
    switch (action.type) {
        case GET_LANGUAGES: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case LANGUAGE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                languages: action.languages,
            };
        }
        case LANGUAGE_ERROR: {
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