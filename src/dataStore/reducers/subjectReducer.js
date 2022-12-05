import {GET_SUBJECT_ERROR, GET_SUBJECT_SUCCESS, GET_SUBJECTS} from "../dispatchTypes";

export const initialSubjectsState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    subjects: [],
}

export const subjectsReducers = (
    state = initialSubjectsState,
    action
) => {
    switch (action.type) {
        case GET_SUBJECTS: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case GET_SUBJECT_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                subjects: action.subjects,
            };
        }
        case GET_SUBJECT_ERROR: {
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