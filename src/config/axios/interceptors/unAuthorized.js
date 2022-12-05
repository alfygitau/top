export default function unAuthorizedInterceptor(axiosConfig) {
  axiosConfig.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        let token = localStorage.token;
        localStorage.clear();
        if (token) {
          localStorage.token = token;
        }
        window.location.replace("/user/login");
      }

      return Promise.reject(error);
    }
  );
}
