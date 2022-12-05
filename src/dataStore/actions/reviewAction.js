import axiosConfig from "config/axios";
import {
  CREATE_USER_RATINGS,
  CREATE_USER_RATINGS_ERROR,
  CREATE_USER_RATINGS_SUCCESS,
  FILTER_USER_RATINGS,
  FILTER_USER_RATINGS_ERROR,
  FILTER_USER_RATINGS_SUCCESS,
} from "dataStore/dispatchTypes";

export const filterRatings = async (dispatch) => {
  dispatch({
    type: FILTER_USER_RATINGS,
  });
  try {
    return await axiosConfig.get(`/ratings`).then((response) => {
      dispatch({
        type: FILTER_USER_RATINGS_SUCCESS,
        ratings: response.data,
      });
      return response;
    });
  } catch (error) {
    dispatch({
      type: FILTER_USER_RATINGS_ERROR,
      errorMessage: error.response,
    });

    return error.response;
  }
};

export const createRatings = async (dispatch, rating) => {
  dispatch({
    type: CREATE_USER_RATINGS,
  });
  try {
    return await axiosConfig
      .post("/ratings", rating, {
        headers: {
          "x-toprated-token": localStorage.token,
        },
      })
      .then((response) => {
        dispatch({
          type: CREATE_USER_RATINGS_SUCCESS,
          rating: response.data,
        });
        console.log(response);
        return response;
      });
  } catch (error) {
    dispatch({
      type: CREATE_USER_RATINGS_ERROR,
      errorMessage: error.response,
    });

    return error.response;
  }
};
