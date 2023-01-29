import React, { useState, useEffect } from "react";
import { Tag, Panel, Divider, Pagination, Button } from "rsuite";
import Link from "next/link";
import NoData from "assets/no-open.svg";
import { useDispatch, useSelector } from "react-redux";
import { formatDeadline } from "../../../utils/dates";
import Modal from "react-bootstrap/Modal";
import {
  getPendingOrders,
  payFromWallet,
} from "dataStore/actions/ordersAction";
import { Box } from "theme-ui";
import {
  makePayment,
  userWalletSummary,
} from "../../../dataStore/actions/walletAction";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

const Pending = () => {
  const [activePage, setActivePage] = useState(1);
  const [reserveOpen, setReserveOpen] = useState(false);
  const handleReserveOpen = () => setReserveOpen(true);
  const handleReserveClose = () => setReserveOpen(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const orderSelector = useSelector((state) => state.orderState);
  const {
    pending_orders: { orders: pending_orders, pagination },
  } = orderSelector;

  const reserveSelector = useSelector((state) => state.orderState);
  const { errorMessage: walletError } = reserveSelector;

  const openWalletModal = (wholeOrder) => {
    setReserveOpen(true);
    console.log(wholeOrder);
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "walletOrderNumber",
        JSON.stringify(wholeOrder.order_number)
      );
      localStorage.setItem(
        "walletOrderAmount",
        JSON.stringify(wholeOrder.amount)
      );
      localStorage.setItem("walletOrderId", JSON.stringify(wholeOrder.id));
    }
  };

  const per = 10;

  // const valuesFromStorage = () => {
  //   if (typeof window !== "undefined") {
  //     let order_number = JSON.parse(localStorage.walletOrderNumber);
  //     let amount = JSON.parse(localStorage.walletOrderAmount);
  //     let orderId = JSON.parse(localStorage.walletOrderId);
  //     return { order_number, amount, orderId };
  //   }
  // };

  const handleReserveOrder = () => {
    const { id: userID } = JSON.parse(localStorage.currentUser);
    const order_number = JSON.parse(localStorage.walletOrderNumber);
    const amount = JSON.parse(localStorage.walletOrderAmount);
    const bodyData = {
      order_number: order_number,
      order_amount: amount,
      user_id: userID,
    };
    makePayment(dispatch, bodyData).then((response) => {
      const links = response.data.links[1].href;
      console.log(links);
      localStorage.setItem("link", JSON.stringify(links));
      if (response.status === 200) {
        router.push(links);
      } else if (response.status !== 200) {
        dispatch({
          type: "MAKE_PAYMENT_ERROR",
          errorMessage: "There was an error while making payment",
        });
      }
    });
  };

  const handleReserveFromWallet = () => {
    const orderId = JSON.parse(localStorage.walletOrderId);
    payFromWallet(dispatch, orderId).then((response) => {
      if (response.status === 200) {
        toast.success("Paid from wallet successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
        router.push("/dashboard/waiting-assign");
      } else {
        dispatch({
          type: "MAKE_PAYMENT_ERROR",
          errorMessage: walletError?.data.error_message,
        });
        toast.error(walletError?.data.error_message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    });
  };

  useEffect(() => {
    const { id: userId } = JSON.parse(localStorage.currentUser);
    getPendingOrders(dispatch, userId, activePage, per);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, activePage, per]);

  useEffect(() => {
    const { id: userID } = JSON.parse(localStorage.currentUser);
    userWalletSummary(dispatch, userID);
  }, [dispatch]);

  // const { order_number, amount, orderId } = valuesFromStorage();

  return (
    <>
      <ToastContainer />
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
              <>
                <tr>
                  <td style={styles.table.td}>{data.id}</td>
                  <td style={styles.table.td}>
                    <center>
                      <Link href={`/dashboard/order/${data.id}`}>
                        <a>{data.order_number}</a>
                      </Link>
                    </center>
                  </td>
                  <td style={styles.table.td}>
                    {formatDeadline(data.deadline)}
                  </td>
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
                        onClick={() => openWalletModal(data)}
                        color="green"
                        appearance="primary"
                      >
                        Reserve Now
                      </Button>
                    </Box>
                  </td>
                </tr>
              </>
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
      <Modal show={reserveOpen} onHide={handleReserveClose} size="lg" centered>
        {/* {isLoading && <BoxLoading />} */}
        <Modal.Header>
          <Modal.Title>
            <h5>Reserve Payment</h5>
          </Modal.Title>
          <Divider />
        </Modal.Header>
        <Modal.Body>
          <p style={{ fontSize: "18px" }}>
            Choose one of the options to reserve payment for the order
          </p>
          {/* <p>Order - {order_number}</p> */}
          {/* <p>Amount - ${amount}</p> */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "40px",
            }}
          >
            <Button
              color="green"
              appearance="primary"
              onClick={handleReserveFromWallet}
            >
              Reserve from your Wallet
            </Button>
            <Button
              color="cyan"
              appearance="primary"
              onClick={handleReserveOrder}
            >
              Reserve with Paypal
            </Button>
          </div>
        </Modal.Body>
        <Divider />
        <Modal.Footer>
          <Button onClick={handleReserveClose} appearance="ghost">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
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
