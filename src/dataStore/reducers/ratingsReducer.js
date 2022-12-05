import { CREATE_USER_RATINGS, CREATE_USER_RATINGS_ERROR, CREATE_USER_RATINGS_SUCCESS, FILTER_USER_RATINGS, FILTER_USER_RATINGS_ERROR, FILTER_USER_RATINGS_SUCCESS } from "../dispatchTypes";

export const initialRatingsState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    ratings: [],
    rating: {}
}

export const ratingsReducers = (
    state = initialRatingsState,
    action
) => {
    switch (action.type) {
        case FILTER_USER_RATINGS: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case FILTER_USER_RATINGS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                ratings: action.ratings,
            };
        }
        case FILTER_USER_RATINGS_ERROR: {
            return {
                ...state,
                isError: true,
                isSuccess: false,
                isLoading: false,
                errorMessage: action.errorMessage,
            };
        }
        case CREATE_USER_RATINGS: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case CREATE_USER_RATINGS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                rating: action.rating,
            };
        }
        case CREATE_USER_RATINGS_ERROR: {
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