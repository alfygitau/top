import axios from "axios";

import internetConnectionInterceptor from "./interceptors/internetConnection";
import unAuthorizedInterceptor from "./interceptors/unAuthorized";
import timedOutRequestsInterceptor from "./interceptors/timedOutRequests";

const axiosConfig = axios;

axiosConfig.defaults.headers = {
  "Content-Type": "application/json",
};

axiosConfig.defaults.baseURL = `${process.env.NEXT_PUBLIC_TOPRATED_API_URL}/`;

internetConnectionInterceptor(axiosConfig);
unAuthorizedInterceptor(axiosConfig);
timedOutRequestsInterceptor(axiosConfig);

export default axiosConfig;
