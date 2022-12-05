import React, { useEffect, useReducer } from "react";
import Dashboard from "../../components/admin/dashboard";
import checkDetailsReducer, {
  initialCheckDetailsState,
} from "../../dataStore/reducers/checkDetailsReducer";

const AllOrders = () => {
  const [checkDetailsData, dispatchCheckDetails] = useReducer(
    checkDetailsReducer,
    initialCheckDetailsState
  );
  useEffect(() => {
    try {
      checkDetailsData.token;
    } catch (error) {
      localStorage.clear();
      dispatchCheckDetails({
        type: "ERROR",
        errorMessage: "No token Provided",
      });
      window.location.replace("/user/login");
    }
  }, []);
  return <Dashboard page="dashboard" section="all-orders" />;
};

export default AllOrders;
