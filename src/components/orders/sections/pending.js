import React, { useState, useEffect } from "react";
import { Tag, Panel, Divider, Pagination, Button } from "rsuite";
import Link from "next/link";
import NoData from "assets/no-open.svg";
import { useDispatch, useSelector } from "react-redux";
import { formatDeadline } from "../../../utils/dates";
import {
  getPendingOrders,
  payFromWallet,
} from "dataStore/actions/ordersAction";
import { Box } from "theme-ui";
import { userWalletSummary } from "../../../dataStore/actions/walletAction";
import { useRouter } from "next/router";

const Pending = () => {
  const [activePage, setActivePage] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();
  const orderSelector = useSelector((state) => state.orderState);
  const {
    pending_orders: { orders: pending_orders, pagination },
  } = orderSelector;

  const per = 10;

  useEffect(() => {
    const { id: userId } = JSON.parse(localStorage.currentUser);
    getPendingOrders(dispatch, userId, activePage, per);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, activePage, per]);

  useEffect(() => {
    const { id: userID } = JSON.parse(localStorage.currentUser);
    userWalletSummary(dispatch, userID);
  }, [dispatch]);
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
        <h3>Pending Orders:</h3>
      </div>
      <Divider />
      <table style={styles.table}>
        <tr>
          <th style={styles.table.th}>ID</th>
          <th style={styles.table.th}>Order Number</th>
          <th style={styles.table.th}>Deadline</th>
          <th style={styles.table.th}>Subject</th>
          <th style={styles.table.th}>Type of Paper</th>
          <th style={styles.table.th}>Promo Code</th>
          <th style={styles.table.th}>Pages</th>
          <th style={styles.table.th}>Amount</th>
          <th style={styles.table.th}>Reserve Now</th>
        </tr>
        {pending_orders
          ?.filter((data) => data.paid !== true)
          .map((data) => (
            <tr>
              <td style={styles.table.td}>{data.id}</td>
              <td style={styles.table.td}>
                <center>
                  <Link href={`/dashboard/order/${data.id}`}>
                    <a>{data.order_number}</a>
                  </Link>
                </center>
              </td>
              <td style={styles.table.td}>{formatDeadline(data.deadline)}</td>
              <td style={styles.table.td}>
                {data.subject && data.subject.name}
              </td>
              <td style={styles.table.td}>{data.type && data.type.name}</td>
              <td style={styles.table.td}>
                <center>
                  <Tag color="orange">
                    {data.promocode === "" ? "none" : data.promocode}
                  </Tag>
                </center>
              </td>
              <td style={styles.table.td}>{data.page && data.page.name}</td>
              <td style={styles.table.td}>$ {data.amount.toFixed(2)}</td>
              <td style={styles.table.td}>
                <Box>
                  <Button
                    size="sm"
                    onClick={() => {
                      payFromWallet(dispatch, data.id).then((response) => {
                        if (response.status === 200) {
                          router.push("/dashboard/waiting-assign");
                        }
                      });
                    }}
                    color="green"
                    appearance="primary"
                  >
                    Reserve Now
                  </Button>
                </Box>
              </td>
            </tr>
          ))}
      </table>
      <br />
      {pending_orders && (
        <Pagination
          size="md"
          total={pagination.count}
          limit={per}
          activePage={activePage}
          onChangePage={(page) => setActivePage(page)}
        />
      )}
      {!pending_orders && (
        <div>
          <Panel>
            <div style={{ marginTop: "100px" }}>
              <center>
                <img src={NoData} alt="" />
                <h6>No Pending Orders</h6>
              </center>
            </div>
          </Panel>
        </div>
      )}
    </div>
  );
};

export default Pending;

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
