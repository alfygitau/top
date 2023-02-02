import React, { useState, useEffect } from "react";
import { Tag, Panel, Divider, Pagination } from "rsuite";
import Link from "next/link";
import { useRouter } from "next/router";
import NoData from "assets/no-open.svg";
import { useDispatch, useSelector } from "react-redux";
import { formatDeadline } from "../../../utils/dates";
import {
  getCancelledOrders,
  reSubmitOrder,
} from "dataStore/actions/ordersAction";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "rsuite";

const Cancelled = () => {
  const [activePage, setActivePage] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();
  const per = 10;
  const orderSelector = useSelector((state) => state.orderState);
  const {
    isLoading,
    cancelled_orders: { orders: cancelled_orders, pagination },
  } = orderSelector;

  const handleOrderResubmit = (orderID) => {
    reSubmitOrder(dispatch, orderID).then((response) => {
      if (response.status === 200) {
        toast.success("Order re-submitted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        router.push("/dashboard/pending");
      }
    });
  };

  useEffect(() => {
    const { id: userId } = JSON.parse(localStorage.currentUser);
    getCancelledOrders(dispatch, userId, activePage, per);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, activePage, per]);
  return (
    <div style={{ marginLeft: "10px", marginRight: "10px" }}>
      <ToastContainer />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "10px",
          marginRight: "20px",
        }}
      >
        <h3>Cancelled Orders</h3>
      </div>
      <Divider />
      <table style={styles.table}>
        <tr>
          <th style={styles.table.th}>ID</th>
          <th style={styles.table.th}>Order Number</th>
          <th style={styles.table.th}>Subject</th>
          <th style={styles.table.th}>Type of Paper</th>
          <th style={styles.table.th}>Deadline</th>
          <th style={styles.table.th}>Pages</th>
          <th style={styles.table.th}>Amount</th>
          <th style={styles.table.th}>Re-submit</th>
        </tr>
        {cancelled_orders?.map((data) => (
          <tr>
            <td style={styles.table.td}>{data.id}</td>
            <td style={styles.table.td}>
              <Link href={`/dashboard/order/cancelled/${data.id}`}>
                <a>{data.order_number}</a>
              </Link>
            </td>
            <td style={styles.table.td}>{data.subject && data.subject.name}</td>
            <td style={styles.table.td}>{data.type && data.type.name}</td>
            <td style={styles.table.td}>{formatDeadline(data.deadline)}</td>
            <td style={styles.table.td}>{data.page && data.page.name}</td>
            <td style={styles.table.td}>$ {data.amount.toFixed(2)}</td>
            <td style={styles.table.td}>
              <Button
                onClick={() => handleOrderResubmit(data.id)}
                color="blue"
                appearance="primary"
              >
                Re-Submit
              </Button>
            </td>
          </tr>
        ))}
      </table>
      <br />
      {cancelled_orders && (
        <Pagination
          size="md"
          total={pagination.count}
          limit={per}
          activePage={activePage}
          onChangePage={(page) => setActivePage(page)}
        />
      )}
      {!cancelled_orders && (
        <div>
          <Panel>
            <div style={{ marginTop: "100px" }}>
              <center>
                <img src={NoData} alt="" />
                <h6>No Cancelled Orders</h6>
              </center>
            </div>
          </Panel>
        </div>
      )}
    </div>
  );
};

export default Cancelled;

const styles = {
  table: {
    fontFamily: "Quicksand, sans-serif",
    borderCollapse: "collapse",
    width: "100%",
    fontSize: "16px",
    td: {
      border: "1px solid #dddddd",
      textAlign: "left",
      padding: "8px",
    },
    th: {
      border: "1px solid #dddddd",
      textAlign: "left",
      padding: "8px",
      background: "#fdaa8f",
    },
  },
};
