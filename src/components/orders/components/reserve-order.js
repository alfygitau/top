import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Row, Col, Button, Panel, Message } from "rsuite";
import {
  getOrder,
  payFromWallet,
} from "../../../dataStore/actions/ordersAction";
import { BoxLoading } from "react-loadingg";
import { Editor } from "@tinymce/tinymce-react";
import { formatDeadline } from "../../../utils/dates";
import { ToastContainer, toast } from "react-toastify";

const ReserveOrder = () => {
  const orderSelector = useSelector((state) => state.orderState);
  const {
    isLoading: orderLoading,
    errorMessage,
    order: {
      id: orderId,
      order_number,
      topic,
      phone,
      deadline,
      service,
      user,
      type,
      style,
      source,
      subject,
      language,
      page,
      level,
      spacing,
      urgency,
      amount,
      instructions,
    },
  } = orderSelector;
  const walletSelector = useSelector((state) => state.orderState);
  const { errorMessage: walletError } = walletSelector;
  const router = useRouter();
  const { reserveID } = router.query;
  const dispatch = useDispatch();

  const handleReserveFromWallet = () => {
    payFromWallet(dispatch, orderId).then((response) => {
      if (response.status === 200) {
        toast.success("Paid from wallet successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
        router.push("/dashboard/waiting-assign");
      } else {
        dispatch({
          type: "MAKE_PAYMENT_ERROR",
          errorMessage: walletError.data.error_message,
        });
        toast.error(walletError.data.error_message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    });
  };

  React.useEffect(() => {
    getOrder(dispatch, reserveID);
  }, [dispatch, reserveID]);
  return (
    <div>
      <Panel>
        {orderLoading && <BoxLoading />}
        <br />
        <ToastContainer />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Reserve Order/Pay for the order</h3>
          <Button
            onClick={handleReserveFromWallet}
            color="blue"
            appearance="primary"
          >
            Pay from Wallet
          </Button>
          <Button
            color="blue"
            appearance="primary"
            onClick={() => router.push("/dashboard/wallet")}
          >
            Deposit to Paypal
          </Button>
        </div>
        <br />
        <Grid fluid>
          <Row>
            <Col xs={24}>
              <div
                style={{
                  background: "#fdaa8f",
                  height: "40px",
                  padding: "10px",
                }}
              >
                <h5>Order #{order_number}</h5>
              </div>
              <table style={styles.table}>
                <tr style={{ borderRadius: "10px" }}>
                  <td style={styles.table.td}>
                    <strong>Order Number</strong>
                  </td>
                  <td style={styles.table.tdx}>{order_number}</td>
                  <td style={styles.table.td}>
                    <b>Subject</b>
                  </td>
                  <td style={styles.table.td}>{subject && subject.name}</td>
                </tr>
                <tr>
                  <td style={styles.table.td}>
                    <strong>Client</strong>
                  </td>
                  <td style={styles.table.tdx}>{user && user.username}</td>
                  <td style={styles.table.td}>
                    <b>Style</b>
                  </td>
                  <td style={styles.table.td}>{style && style.name}</td>
                </tr>
                <tr>
                  <td style={styles.table.td}>
                    <b>Service</b>
                  </td>
                  <td style={styles.table.td}>{service && service.name}</td>
                  <td style={styles.table.td}>
                    <b>Language</b>
                  </td>
                  <td style={styles.table.td}>{language && language.name}</td>
                </tr>
                <tr>
                  <td style={styles.table.td}>
                    <b>Sources</b>
                  </td>
                  <td style={styles.table.td}>{source && source.name}</td>
                  <td style={styles.table.td}>
                    <b>Phone</b>
                  </td>
                  <td style={styles.table.td}>{phone}</td>
                </tr>
                <tr>
                  <td style={styles.table.td}>
                    <b>Type of Paper</b>
                  </td>
                  <td style={styles.table.td}>{type && type.name}</td>
                  <td style={styles.table.td}>
                    <b>Topic</b>
                  </td>
                  <td style={styles.table.td}>{topic}</td>
                </tr>
                <tr>
                  <td style={styles.table.td}>
                    <b>Spacing</b>
                  </td>
                  <td style={styles.table.td}>{spacing && spacing.name}</td>
                  <td style={styles.table.td}>
                    <b>Deadline</b>
                  </td>
                  <td style={styles.table.td}>{formatDeadline(deadline)}</td>
                </tr>
                <tr>
                  <td style={styles.table.td}>
                    <b>Urgency</b>
                  </td>
                  <td style={styles.table.td}>{urgency && urgency.name}</td>
                  <td style={styles.table.td}>
                    <b>Amount</b>
                  </td>
                  <td style={styles.table.td}>
                    ${amount && amount.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td style={styles.table.td}>
                    <b>Pages</b>
                  </td>
                  <td style={styles.table.td}>{page && page.name}</td>
                  <td style={styles.table.td}>
                    <b>Level</b>
                  </td>
                  <td style={styles.table.td}>{level && level.name}</td>
                </tr>
              </table>
              <div className="instructions" style={{ marginTop: "20px" }}>
                <p style={{ textDecoration: "underline" }}>
                  Order Instructions
                </p>
                <div
                  style={{
                    border: "1px solid grey",
                    padding: "10px 20px",
                    borderRadius: "10px",
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: instructions }} />
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </Panel>
    </div>
  );
};

export default ReserveOrder;
const styles = {
  table: {
    borderCollapse: "collapse",
    width: "100%",
    td: {
      fontFamily: "Quicksand, sans-serif",
      border: "1px solid #dddddd",
      textAlign: "left",
      fontSize: "16px",
      padding: "5px",
    },
    tdx: {
      fontFamily: "Quicksand, sans-serif",
      border: "1px solid #dddddd",
      textAlign: "left",
      fontSize: "16px",
      padding: "5px",
      color: "#333333",
    },
  },
};
