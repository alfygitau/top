import React from "react";
import { FiCheckCircle, FiPhoneCall, FiEdit } from "react-icons/fi";
import { FaListUl } from "react-icons/fa";
import { ImFileText2, ImFilePdf } from "react-icons/im";
import { BiRevision } from "react-icons/bi";
import { GoMail } from "react-icons/go";
import { Panel, Grid, Row, Col, List, Button } from "rsuite";
import Calculator from "./calculator";
import router from "next/router";

const MoneyBackGuarantee = () => {
  return (
    <div style={{ paddingTop: "80px" }}>
      <Grid>
        <Row>
          <Col xs={24} sm={16} md={16}>
            <Panel>
              <center>
                <h3>Money-back Guarantee</h3>
              </center>
              <p style={{ fontSize: "15px", lineHeight: 2.5 }}>
                Are you afraid that you might lose money by paying for an essay
                that does not meet your expectations? You do not need to worry
                anymore. We have made sure to take care of this in our Money
                Back Guarantee policy. We are a legitimate company offering the
                best essay writing service to more than 1 million students from
                across the globe. Due to the trust that these clients have in
                us, we make sure we maintain the trust by giving the best
                services them and refunding when necessary.
                <h5>
                  There are several incidences where we are obliged to refund
                  back our customers’ money.
                </h5>
                <ul style={{ marginLeft: "35px" }}>
                  <li>
                    In the case the customer creates a duplicate order and
                    wishes to cancel one of the order, the customer can cancel
                    the order and claim a refund of the amount paid for the
                    order.
                  </li>
                  <li>
                    The customer can change his/her mind concerning an order for
                    which he/she has already reserved money. In this case, the
                    customer has the right to cancel the order and request a
                    refund. However, we recommend that the customer be careful
                    when placing an order such that he/she is sure about the
                    order to avoid cancellations.
                  </li>
                  <li>
                    If a customer cancels an order that had already been
                    assigned to a writer, we reserve the right to hold back some
                    money to compensate the writer for the time consumed working
                    on the order. This is in case the customer cancels the work
                    more than an hour after the writer has been assigned. If the
                    customer cancels the order after half of the time allocated
                    for the order is gone, he/she is entitled to a refund of not
                    more than 50% of the total order cost. We, therefore,
                    recommend that our customers confirm their order details
                    before assigning the order to the writer.
                  </li>
                  <li>
                    If the writer delivers low quality or plagiarized work to
                    the customer, the customer reserves the right to cancel the
                    order and request for a refund of the total order cost. We,
                    therefore, recommend that as a customer, you should check
                    and review the work delivered to you immediately after
                    downloading it and before releasing the funds to the writer.
                    Releasing the funds to the writer means that you have gone
                    through the work and that you are satisfied with it.
                    Therefore you confirm that you will not bring any other
                    claim regarding the quality of the work under the same
                    order. However, we allow customers to bring back some claims
                    at our own discretion, especially in cases where the writer
                    has plagiarized the work. All types of refund requests are
                    processed within 24 hours after requesting, except on
                    weekends. The refunds are made to your
                    www.topratedprofessors.com wallet.
                  </li>
                  <li>
                    If a customer deposits money in their wallet and wishes to
                    withdraw it without creating an order, we allow them to do
                    so. We take 2 working days to process such withdraw
                    requests.
                  </li>
                </ul>
              </p>
            </Panel>
          </Col>
          <Col xs={24} sm={8} md={8}>
            <Calculator />
            <div style={{ marginTop: "40px" }}>
              <Panel shaded>
                <center>
                  <h3>GET THESE FOR FREE</h3>
                </center>
                <List>
                  <List.Item style={{ fontSize: "18px" }}>
                    <FiCheckCircle
                      style={{ fontSize: "25px", color: "#fdaa8f" }}
                    />{" "}
                    Free Turnitin Plagiarism report
                  </List.Item>
                  <List.Item style={{ fontSize: "18px" }}>
                    <FaListUl style={{ fontSize: "25px", color: "#fdaa8f" }} />{" "}
                    Free work in progress drafts
                  </List.Item>
                  <List.Item style={{ fontSize: "18px" }}>
                    <BiRevision
                      style={{ fontSize: "25px", color: "#fdaa8f" }}
                    />{" "}
                    Free revisions for all orders
                  </List.Item>
                  <List.Item style={{ fontSize: "18px" }}>
                    <GoMail style={{ fontSize: "25px", color: "#fdaa8f" }} />{" "}
                    Free text/email updates
                  </List.Item>
                  <List.Item style={{ fontSize: "18px" }}>
                    <FiPhoneCall
                      style={{ fontSize: "25px", color: "#fdaa8f" }}
                    />{" "}
                    Free 24/7 VIP customer support
                  </List.Item>
                  <List.Item style={{ fontSize: "18px" }}>
                    <ImFileText2
                      style={{ fontSize: "25px", color: "#fdaa8f" }}
                    />{" "}
                    Free 1 page summary.
                  </List.Item>
                  <List.Item style={{ fontSize: "18px" }}>
                    <ImFilePdf style={{ fontSize: "25px", color: "#fdaa8f" }} />{" "}
                    Free cover page
                  </List.Item>
                  <List.Item style={{ fontSize: "18px" }}>
                    <FiEdit style={{ fontSize: "25px", color: "#fdaa8f" }} />{" "}
                    Free formatting for your work
                  </List.Item>
                </List>
              </Panel>
            </div>
            <div style={{ paddingTop: "50px" }}>
              <Button
                onClick={() =>
                  router.push("/dashboard/create_order", scroll(0, 0))
                }
                style={{
                  color: "white",
                  width: "100%",
                  backgroundColor: "#17c671",
                }}
              >
                Order Now
              </Button>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default MoneyBackGuarantee;
