import {GET_SOURCES, SOURCE_ERROR, SOURCE_SUCCESS} from "../dispatchTypes";

export const initialSourcesState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    sources: [],
}

export const sourcesReducers = (
    state = initialSourcesState,
    action
) => {
    switch (action.type) {
        case GET_SOURCES: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case SOURCE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                sources: action.sources,
            };
        }
        case SOURCE_ERROR: {
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