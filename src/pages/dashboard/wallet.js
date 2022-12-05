import React, { useEffect } from "react";
import Dashboard from "../../components/admin/dashboard";

const Rejected = () => {
  useEffect(() => {
    try {
      JSON.parse(localStorage.currentUser);
    } catch (error) {
      localStorage.clear();
      window.location.replace("/user/login");
    }
  }, []);
  return <Dashboard page="dashboard" section="wallet" />;
};

export default Rejected;
