/** @jsx jsx */
import axiosConfig from "../../config/axios";
import jwtdecode from "jwt-decode";
import { ERROR, LOADING, SUCCESS } from "../dispatchTypes";
import { Alert, Close, jsx } from "theme-ui";

export const loginUser = async (dispatch, bodyData) => {
  dispatch({
    type: LOADING,
  });
  try {
    return await axiosConfig.post("/sessions", bodyData).then((response) => {
      let userData = response.data;
      let userToken = response.headers["x-toprated-token"];
      const tokenInfo = jwtdecode(userToken);
      if (userToken && tokenInfo.user_id === userData.id) {
        localStorage.sessionID = tokenInfo.session_id;
        localStorage.currentUser = JSON.stringify(response.data);
        localStorage.admin = true;
        localStorage.token = userToken;
        localStorage.authToken = userToken;
      } else {
        <Alert>
          User Id did mot match
          <Close ml="auto" mr={-2} />
        </Alert>;
      }
      dispatch({
        type: SUCCESS,
      });

      return response;
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      errorMessage: error.response.data.message,
    });

    return error.response;
  }
};
