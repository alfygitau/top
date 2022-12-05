/** @jsx jsx */
import axiosConfig from "../../config/axios";
import jwtdecode from "jwt-decode";
import { LOADING, SUCCESS, ERROR } from "../dispatchTypes";

export const registerUser = async (dispatchRegisterUser, bodyData) => {
  dispatchRegisterUser({
    type: LOADING,
  });

  try {
    return await axiosConfig
      .post("/register", bodyData)
      .then((response) => {
        let userData = response.data;
        let userToken = response.headers["x-toprated-token"];
        const tokenInfo = jwtdecode(userToken);
        if (userToken && tokenInfo.user_id === userData.id) {
          localStorage.sessionID = tokenInfo.session_id;
          localStorage.currentUser = JSON.stringify(response.data);
          localStorage.token = userToken;
        }
        dispatchRegisterUser({
          type: SUCCESS,
        });
        return response;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          dispatchRegisterUser({
            type: ERROR,
            errorMessage:
              "Your session has been invalidated. Kindly login or verify your number again",
          });
        } else if (error.response.status === 409) {
          dispatchRegisterUser({
            type: ERROR,
            errorMessage:
              "Username has already been taken, kindly pick another one",
          });
        } else {
          dispatchRegisterUser({
            type: ERROR,
            errorMessage: error.response.data.error_message,
          });
        }
      })
      .catch(() => {
        dispatchRegisterUser({
          type: ERROR,
          errorMessage: "Failed to process request. Check internet connection",
        });
      });
  } catch (error) {
    dispatchRegisterUser({
      type: ERROR,
      errorMessage: "Something went wrong, try again later!",
    });
    return error.response;
  }
};
