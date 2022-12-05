import React from "react";
import OrderCard from "./order-card";

const Blog = ({ section }) => {
  return (
    <div sx={styles.completed}>
      <OrderCard section={section} />
    </div>
  );
};

export default Blog;

const styles = {
  completed: {
    pt: ["10px", null, "10px"],
    pb: ["0px", null, "10px"],
    px: ["0px", null, "10px"],
  },
};
