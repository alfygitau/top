import {GET_LEVELS, LEVEL_ERROR, LEVEL_SUCCESS} from "../dispatchTypes";

export const initialLevelsState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    levels: [],
}

export const levelsReducers = (
    state = initialLevelsState,
    action
) => {
    switch (action.type) {
        case GET_LEVELS: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case LEVEL_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                levels: action.levels,
            };
        }
        case LEVEL_ERROR: {
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