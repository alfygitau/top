import axiosConfig from "../../config/axios";
import {
  CREATE_BLOG,
  CREATE_BLOGS_ERROR,
  CREATE_BLOGS_SUCCESS,
  DELETE_BLOG,
  DELETE_BLOG_ERROR,
  DELETE_BLOG_SUCCESS,
  GET_BLOGS,
  GET_BLOGS_ERROR,
  GET_BLOGS_SUCCESS,
  GET_BLOG,
  GET_BLOG_ERROR,
  GET_BLOG_SUCCESS,
  UPDATE_BLOG,
  UPDATE_BLOGS_ERROR,
  UPDATE_BLOGS_SUCCESS,
  FILTER_BLOG_ERROR,
  FILTER_BLOG,
  PUBLISH_BLOG,
  PUBLISH_BLOG_SUCCESS,
  PUBLISH_BLOG_ERROR,
} from "../dispatchTypes";

export const getBlogs = async (dispatch) => {
  try {
    dispatch({
      type: GET_BLOGS,
    });
    return await axiosConfig
      .get(`/top_articles?status=active`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        dispatch({
          type: GET_BLOGS_SUCCESS,
          blogs: response.data,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: GET_BLOGS_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const getBlog = async (dispatch, slug) => {
  try {
    dispatch({
      type: GET_BLOG,
    });
    return await axiosConfig
      .get(`top_articles/${slug}`, {
        headers: {
          "x-toprated-token": localStorage.token,
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: GET_BLOG_SUCCESS,
          blog: response.data,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: GET_BLOG_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const createBlog = async (dispatch, credentials) => {
  try {
    dispatch({
      type: CREATE_BLOG,
    });
    return await axiosConfig
      .post(`/top_articles`, credentials, {
        headers: {
          "x-toprated-token": localStorage.token,
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: CREATE_BLOGS_SUCCESS,
          blog: response.data,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: CREATE_BLOGS_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const deleteBlog = async (dispatch, articleID) => {
  try {
    dispatch({
      type: DELETE_BLOG,
    });
    return await axiosConfig
      .delete(`/top_articles/${articleID}`, {
        headers: {
          "x-toprated-token": localStorage.token,
        },
      })
      .then((response) => {
        dispatch({
          type: DELETE_BLOG_SUCCESS,
          blog: response.data,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: DELETE_BLOG_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};

export const updateBlog = async (dispatch, articleID, bodyData) => {
  try {
    dispatch({
      type: UPDATE_BLOG,
    });
    return await axiosConfig
      .put(`/top_articles/${articleID}`, bodyData, {
        headers: {
          "x-toprated-token": localStorage.token,
        },
      })
      .then((response) => {
        dispatch({
          type: UPDATE_BLOGS_SUCCESS,
          blog: response.data,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: UPDATE_BLOGS_ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};
export const filterBlog = async (dispatch, status) => {
  try {
    dispatch({
      type: FILTER_BLOG,
    });
    return await axiosConfig
      .get(`/top_articles?status=${status}`, {
        headers: {
          "x-toprated-token": localStorage.token,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_BLOGS_SUCCESS,
          blogs: response.data,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: FILTER_BLOG_ERROR,
      errorMessage: error.response?.data.message,
    });

    return error.response;
  }
};

export const publishBlog = async (dispatch, id) => {
  try {
    dispatch({
      type: PUBLISH_BLOG,
    });
    return await axiosConfig
      .put(`/top_articles/${id}/publish`, {
        headers: {
          "x-toprated-token": localStorage.token,
        },
      })
      .then((response) => {
        dispatch({
          type: PUBLISH_BLOG_SUCCESS,
          blog: response.data,
        });
        return response;
      });
  } catch (error) {
    dispatch({
      type: PUBLISH_BLOG_ERROR,
      errorMessage: error.response?.data.message,
    });

    return error.response;
  }
};
