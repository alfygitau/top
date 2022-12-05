import {GET_PAGES, PAGE_ERROR, PAGE_SUCCESS} from "../dispatchTypes";

export const initialPagesState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    pages: [],
}

export const pagesReducers = (
    state = initialPagesState,
    action
) => {
    switch (action.type) {
        case GET_PAGES: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case PAGE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                pages: action.pages,
            };
        }
        case PAGE_ERROR: {
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