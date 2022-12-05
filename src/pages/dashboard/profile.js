import React, { useEffect } from "react";
import Dashboard from "../../components/admin/dashboard";

const Profile = () => {
  useEffect(() => {
    try {
      JSON.parse(localStorage.currentUser);
    } catch (error) {
      localStorage.clear();
      window.location.replace("/user/login");
    }
  }, []);
  return <Dashboard page="dashboard" section="profile" />;
};

export default Profile;
