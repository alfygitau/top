export default function timedOutRequests(axiosConfig) {
  axiosConfig.interceptors.response.use(
    (response) => response,
    (error) => {
      if (!error.response && error.code === "ECONNABORTED") {
        const errObject = error.toJSON();
        const err = {
          response: {
            status: errObject.code,
            data: {
              error_message:
                "Failed to process the request at this time. Kindly try again.",
            },
          },
        };
        return Promise.reject(err);
      }
      return Promise.reject(error);
    }
  );
}
