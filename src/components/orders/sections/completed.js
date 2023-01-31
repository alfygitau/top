import React, { useState, useEffect } from "react";
import { Tag, Panel, Divider, Pagination } from "rsuite";
import Link from "next/link";
import NoData from "assets/no-open.svg";
import { useDispatch, useSelector } from "react-redux";
import { formatDate, formatDeadline } from "../../../utils/dates";
import {
  getCompletedOrderFiles,
  getCompletedOrders,
} from "dataStore/actions/ordersAction";

const Completed = () => {
  const [activePage, setActivePage] = useState(1);
  const [per, setPer] = useState(10);
  const dispatch = useDispatch();
  const orderSelector = useSelector((state) => state.orderState);
  const {
    isLoading,
    completed_orders: { orders: completed_orders, pagination },
    errorMessage,
  } = orderSelector;

  useEffect(() => {
    const { id: userId } = JSON.parse(localStorage.currentUser);
    getCompletedOrders(dispatch, userId, activePage, per);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, activePage, per]);

  const fetchOrderFiles = (id) => {
    getCompletedOrderFiles(dispatch, id);
    localStorage.setItem("completedId", JSON.stringify(id));
  };

  return (
    <div style={{ marginLeft: "10px", marginRight: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "10px",
          marginRight: "20px",
        }}
      >
        <h3>Completed Orders:</h3>
      </div>
      <Divider />
      <table style={styles.table}>
        <tr>
          <th style={styles.table.th}>ID</th>
          <th style={styles.table.th}>Order Number</th>
          <th style={styles.table.th}>Deadline</th>
          <th style={styles.table.th}>Subject</th>
          <th style={styles.table.th}>Type of Paper</th>
          <th style={styles.table.th}>Pages</th>
          <th style={styles.table.th}>Amount</th>
          <th style={styles.table.th}>Status</th>
        </tr>
        {completed_orders?.map((data) => (
          <tr>
            <td style={styles.table.td}>{data.id}</td>
            <td style={styles.table.td}>
              <Link href={`/dashboard/order/completed/${data.id}`}>
                <a onClick={() => fetchOrderFiles(data.id)}>
                  {data.order_number}
                </a>
              </Link>
            </td>
            <td style={styles.table.td}>{formatDeadline(data.deadline)}</td>
            <td style={styles.table.td}>
              <center>
                <div style={{ color: "green" }}>
                  {data.subject && data.subject.name}
                </div>
              </center>
            </td>
            <td style={styles.table.td}>{data.type && data.type.name}</td>
            <td style={styles.table.td}>{data.page && data.page.name}</td>
            <td style={styles.table.td}>$ {data.amount.toFixed(2)}</td>
            <td style={styles.table.td}>
              <Tag
                color={
                  data.status === "approved"
                    ? "green"
                    : data.status === "completed"
                    ? "blue"
                    : data.status === "rejected"
                    ? "orange"
                    : data.status === "cancelled"
                    ? "red"
                    : ""
                }
              >
                {data.status}
              </Tag>
            </td>
          </tr>
        ))}
      </table>
      <br />
      {completed_orders && (
        <Pagination
          size="md"
          total={pagination.count}
          limit={per}
          activePage={activePage}
          onChangePage={(page) => setActivePage(page)}
        />
      )}
      {!completed_orders && (
        <div>
          <Panel>
            <div style={{ marginTop: "100px" }}>
              <center>
                <img src={NoData} alt="" />
                <h6>You have no Completed Orders</h6>
              </center>
            </div>
          </Panel>
        </div>
      )}
    </div>
  );
};

export default Completed;

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
