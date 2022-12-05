import React, { useState, useEffect } from "react";
import { Tag, Panel, Divider, Pagination } from "rsuite";
import { useRouter } from "next/router";
import Link from "next/link";
import NoData from "assets/no-open.svg";
import { useDispatch, useSelector } from "react-redux";
import { formatDate, formatDeadline } from "../../../utils/dates";
import { getActiveOrders } from "dataStore/actions/ordersAction";

const InProgress = () => {
  const [activePage, setActivePage] = useState(1);
  const [per, setPer] = useState(10);
  const router = useRouter();
  const dispatch = useDispatch();
  const orderSelector = useSelector((state) => state.orderState);
  const {
    isLoading,
    active_orders: { orders: active_orders, pagination },
  } = orderSelector;

  useEffect(() => {
    const { id: userId } = JSON.parse(localStorage.currentUser);
    getActiveOrders(dispatch, userId, activePage, per);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, activePage, per]);

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
        <h3>In-Progress/Active Orders:</h3>
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
        </tr>
        {active_orders?.map((data) => (
          <tr>
            <td style={styles.table.td}>{data.id}</td>
            <td style={styles.table.td}>
              <Link href={`/dashboard/order/inprogress/${data.id}`}>
                <a>{data.order_number}</a>
              </Link>
            </td>
            <td style={styles.table.td}>{formatDeadline(data.deadline)}</td>
            <td style={styles.table.td}>{data.subject && data.subject.name}</td>
            <td style={styles.table.td}>
              <center>{data.type && data.type.name}</center>
            </td>
            <td style={styles.table.td}>{data.page && data.page.name}</td>
            <td style={styles.table.td}>$ {data.amount.toFixed(2)}</td>
          </tr>
        ))}
      </table>
      <br />
      {active_orders && (
        <Pagination
          size="md"
          total={pagination.count}
          limit={per}
          activePage={activePage}
          onChangePage={(page) => setActivePage(page)}
        />
      )}
      {!active_orders && (
        <div>
          <Panel>
            <div style={{ marginTop: "100px" }}>
              <center>
                <img src={NoData} alt="" />
                <h6>No Orders in progress/Active Orders</h6>
              </center>
            </div>
          </Panel>
        </div>
      )}
    </div>
  );
};

export default InProgress;

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
