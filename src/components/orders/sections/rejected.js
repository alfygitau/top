import React, { useState, useEffect } from "react";
import { Panel, Tag, Divider, Pagination } from "rsuite";
import Link from "next/link";
import NoData from "assets/no-open.svg";
import { useDispatch, useSelector } from "react-redux";
import { formatDate, formatDeadline } from "../../../utils/dates";
import { getRejectedOrders } from "dataStore/actions/ordersAction";

const Rejected = () => {
  const [activePage, setActivePage] = useState(1);
  const [per, setPer] = useState(10);
  const dispatch = useDispatch();
  const orderSelector = useSelector((state) => state.orderState);
  const {
    isLoading,
    rejected_orders: { orders: rejected_orders, pagination },
  } = orderSelector;

  useEffect(() => {
    const { id: userId } = JSON.parse(localStorage.currentUser);
    getRejectedOrders(dispatch, userId, activePage, per);
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
        <h3>Rejected Orders</h3>
      </div>
      <Divider />
      <table style={styles.table}>
        <tr>
          <th style={styles.table.th}>ID</th>
          <th style={styles.table.th}>Order Number</th>
          <th style={styles.table.th}>Deadline</th>
          <th style={styles.table.th}>Type of paper</th>
          <th style={styles.table.th}>Promo Code</th>
          <th style={styles.table.th}>Created At</th>
          <th style={styles.table.th}>Amount</th>
        </tr>
        {rejected_orders?.map((data) => (
          <tr>
            <td style={styles.table.td}>{data.id}</td>
            <td style={styles.table.td}>
              <Link href={`/dashboard/order/rejected-orders/${data.id}`}>
                <a>{data.order_number}</a>
              </Link>
            </td>
            <td style={styles.table.td}>{formatDeadline(data.deadline)}</td>
            <td style={styles.table.td}>{data.type && data.type.name}</td>
            <td style={styles.table.td}>
              <center>
                <Tag color="orange">
                  {data.promocode === "" ? "none" : promocode}
                </Tag>
              </center>
            </td>
            <td style={styles.table.td}>{formatDate(data.created_at)}</td>
            <td style={styles.table.td}>$ {data.amount.toFixed(2)}</td>
          </tr>
        ))}
      </table>
      <br />
      {rejected_orders && (
        <Pagination
          size="md"
          total={pagination.count}
          limit={per}
          activePage={activePage}
          onChangePage={(page) => setActivePage(page)}
        />
      )}
      {!rejected_orders && (
        <div>
          <Panel>
            <div style={{ marginTop: "100px" }}>
              <center>
                <img src={NoData} alt="" />
                <h6>No Rejected Orders</h6>
              </center>
            </div>
          </Panel>
        </div>
      )}
    </div>
  );
};

export default Rejected;

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
