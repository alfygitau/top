import React, { useEffect } from "react";
import OrderCard from "./order-card";

const CompletedOrders = ({ section }) => {
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.currentUser);
    if (!currentUser) {
      router.push("/user/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div sx={styles.completed}>
      <OrderCard section={section} />
    </div>
  );
};

export default CompletedOrders;

const styles = {
  completed: {
    pt: ["10px", null, "10px"],
    pb: ["0px", null, "10px"],
  },
};
