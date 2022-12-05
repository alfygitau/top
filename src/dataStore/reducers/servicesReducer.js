import {GET_SERVICES, SERVICE_ERROR, SERVICE_SUCCESS} from "../dispatchTypes";

export const initialServicesState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    errorMessage: '',
    services: [],
}

export const servicesReducers = (
    state = initialServicesState,
    action
) => {
    switch (action.type) {
        case GET_SERVICES: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case SERVICE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                services: action.services,
            };
        }
        case SERVICE_ERROR: {
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