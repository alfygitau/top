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
  FILTER_BLOG_SUCCESS,
  FILTER_BLOG_ERROR,
  FILTER_BLOG,
  PUBLISH_BLOG,
  PUBLISH_BLOG_SUCCESS,
  PUBLISH_BLOG_ERROR,
  IMAGE_UPLOADING,
  IMAGE_UPLOADING_SUCCESS,
  IMAGE_UPLOADING_ERROR,
  DELETE_BLOG_FILES,
  DELETE_BLOG_FILES_SUCCESS,
  DELETE_BLOG_FILES_ERROR,
} from "../dispatchTypes";

export const initialBlogState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: "",
  successMessage: "",
  blogs: [],
  createdBlog: {},
  blogDetails: {},
  deletedBlog: {},
  updatedBlog: {},
  publishedBlog: {},
  assets: [],
  images: [],
  deletedBlogFile:[]
};

export const blogReducers = (state = initialBlogState, action) => {
  switch (action.type) {
    case GET_BLOGS: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case GET_BLOGS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        blogs: action.blogs,
      };
    }
    case GET_BLOGS_ERROR: {
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case GET_BLOG: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case GET_BLOG_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        blogDetails: action.blog,
      };
    }
    case GET_BLOG_ERROR: {
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case CREATE_BLOG: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case CREATE_BLOGS_SUCCESS: {
      console.log(action.blog);
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        createdBlog: action.blog,
      };
    }
    case CREATE_BLOGS_ERROR: {
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case UPDATE_BLOG: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case UPDATE_BLOGS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        updatedBlog: action.blog,
      };
    }
    case UPDATE_BLOGS_ERROR: {
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case DELETE_BLOG: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case DELETE_BLOG_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        deletedBlog: action.blog,
      };
    }
    case DELETE_BLOG_ERROR: {
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case FILTER_BLOG: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case FILTER_BLOG_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        blogs: action.blogs,
      };
    }
    case FILTER_BLOG_ERROR: {
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case PUBLISH_BLOG: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case PUBLISH_BLOG_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        publishedBlog: action.blog,
      };
    }
    case PUBLISH_BLOG_ERROR: {
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case IMAGE_UPLOADING: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case IMAGE_UPLOADING_SUCCESS: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        assets: action.uploaded_file,
      };
    }
    case IMAGE_UPLOADING_ERROR: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    case DELETE_BLOG_FILES: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case DELETE_BLOG_FILES_SUCCESS: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        deletedBlogFile: action.uploaded_file,
      };
    }
    case DELETE_BLOG_FILES_ERROR: {
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    }
    default:
      return state;
  }
};
