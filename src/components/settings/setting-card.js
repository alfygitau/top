import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Panel, Row, Col, Grid, Avatar, Table, Divider, Tag } from "rsuite";
import { Box } from "theme-ui";
import Link from "next/link";
import { formatDate, formatDeadline } from "../../utils/dates";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrders,
  userCountOrderSummary,
} from "../../dataStore/actions/ordersAction";

const SettingCard = ({ section }) => {
  const [user, setUser] = React.useState({});
  const [activePage, setActivePage] = React.useState(1);
  const [per, setPer] = React.useState(5);
  const dispatch = useDispatch();
  const orderSelector = useSelector((state) => state.orderState);
  const {
    isLoading,
    orders: { orders: all_orders },
  } = orderSelector;
  const { user_order_count_summary } = orderSelector;
  const { all_orders_count, approved_orders_count, paid_orders_count } =
    user_order_count_summary;

  useEffect(() => {
    const { id: userId } = JSON.parse(localStorage.currentUser);
    getOrders(dispatch, userId, activePage, per);
    userCountOrderSummary(dispatch, userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, activePage, per]);

  useEffect(() => {
    const value = localStorage.currentUser;
    const user = value ? JSON.parse(value) : undefined;
    setUser(user);
  }, []);
  return (
    <Box>
      <Head>
        <title>Settings</title>
        <link
          href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Box sx={{ mt: "10px", mx: "10px" }}>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", mx: "20px" }}
        >
          <h3>My profile:</h3>
        </Box>
        <Divider />
        <Box>
          <Grid fluid>
            <Row className="show-grid" gutter={24}>
              <Col xs={24} sm={24} md={12}>
                <Panel
                  shaded
                  style={{
                    background: "whitesmoke",
                    height: "100px",
                    marginBottom: "20px",
                  }}
                >
                  <Grid fluid>
                    <Row>
                      <Col xs={6}>
                        <Avatar
                          size="lg"
                          circle
                          style={{
                            background:
                              "linear-gradient(to left, #17c671, #fdaa8f)",
                          }}
                        >
                          TRP
                        </Avatar>
                      </Col>
                      <Col xs={18}>
                        <center>
                          <h6>
                            {user.username} <br />
                            {user.email} <br />
                            Member since: {formatDate(user.created_at)}
                          </h6>
                        </center>
                      </Col>
                    </Row>
                  </Grid>
                </Panel>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Panel
                  shaded
                  style={{ background: "whitesmoke", height: "100px" }}
                >
                  <Grid fluid>
                    <Row>
                      <Col xs={8} style={{ borderRight: "1px solid black" }}>
                        <center>
                          <h6>
                            {all_orders_count} <br />
                            All Orders
                          </h6>
                        </center>
                      </Col>
                      <Col xs={8} style={{ borderRight: "1px solid black" }}>
                        <center>
                          <h6>
                            {approved_orders_count} <br />
                            Approved Orders
                          </h6>
                        </center>
                      </Col>
                      <Col xs={8}>
                        <center>
                          <h6>
                            {paid_orders_count} <br />
                            Paid Orders
                          </h6>
                        </center>
                      </Col>
                    </Row>
                  </Grid>
                </Panel>
              </Col>
            </Row>
          </Grid>
        </Box>
        <br />
        <Panel shaded>
          <h5>Last Orders created</h5>
          <table style={styles.table}>
            <tr>
              <th style={styles.table.th}>ID</th>
              <th style={styles.table.th}>Order Number</th>
              <th style={styles.table.th}>Type of Paper</th>
              <th style={styles.table.th}>Deadline</th>
              <th style={styles.table.th}>Status</th>
              <th style={styles.table.th}>Amount</th>
            </tr>
            {all_orders?.slice(0, 5).map((data) => (
              <tr>
                <td style={styles.table.td}>{data.id}</td>
                <td style={styles.table.td}>
                  <Link href={`/dashboard/order/${data.id}`}>
                    <a>{data.order_number}</a>
                  </Link>
                </td>
                <td style={styles.table.td}>{data.type && data.type.name}</td>
                <td style={styles.table.td}>{formatDeadline(data.deadline)}</td>
                <td style={styles.table.td}>
                  <center>
                    <Tag
                      color={
                        data.status === "approved"
                          ? "green"
                          : data.status === "pending"
                          ? "red"
                          : "blue"
                      }
                    >
                      {data.status}
                    </Tag>
                  </center>
                </td>
                <td style={styles.table.td}>$ {data.amount.toFixed(2)}</td>
              </tr>
            ))}
          </table>
          <br />
        </Panel>
      </Box>
    </Box>
  );
};

export default SettingCard;

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
