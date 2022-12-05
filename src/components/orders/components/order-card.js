import React from "react"
import { Box } from "theme-ui";
import Completed from "../sections/completed";
import Approved from "../sections/approved";
import CreateOrder from "../sections/create-order";
import AllOrders from "../sections/all-orders";
import Rejected from "../sections/rejected";
import Cancelled from "../sections/cancelled";
import Pending from "../sections/pending";
import WaitingAssign from "../sections/waiting-assign";
import Revision from "../sections/revision";
import Blog from "../sections/blogs";


const OrderCard = ({ section }) => {
  return (
    <Box>
      {section === "completed" && <Completed />}
      {section === "approved" && <Approved />}
      {section === "all-orders" && <AllOrders />}
      {section === "rejected" && <Rejected />}
      {section === "cancelled" && <Cancelled />}
      {section === "revision" && <Revision />}
      {section === "pending" && <Pending />}
      {section === "waiting-assign" && <WaitingAssign />}
      {section === "create_order" && <CreateOrder />}
      {section === "blogs" && <Blog />}
    </Box>
  );
};
export default OrderCard;
