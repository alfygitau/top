import React from "react";
import { FiCheckCircle, FiPhoneCall, FiEdit } from "react-icons/fi";
import { FaListUl } from "react-icons/fa";
import { ImFileText2, ImFilePdf } from "react-icons/im";
import { BiRevision } from "react-icons/bi";
import { GoMail } from "react-icons/go";
import { Panel, Grid, Row, Col, List, Button } from "rsuite";
import Calculator from "./calculator";
import router from "next/router";

const Fags = () => {
  return (
    <div style={{ paddingTop: "80px" }}>
      <Grid>
        <Row>
          <Col xs={24} sm={16} md={16}>
            <Panel>
              <center>
                <h3>FAQs</h3>
              </center>
              <p style={{ fontSize: "15px", lineHeight: 2.5 }}>
                <h5>How long does it take to complete my assignment?</h5>
                We work with the deadline you provide. However, we make sure
                that we deliver the work on time so that you have enough time to
                review it.
                <h5>How do I place an order?</h5>
                It's simple. Just log in, and you will be automatically directed
                to the place order page. Read HOW IT WORKS page
                <h5>Can I get updates on my order?</h5>
                Yes. Our writers send drafts as often as the client needs them.
                This helps the client to be assured that we are working on their
                paper and that the writer is doing the right thing. In case the
                writer doesn't provide you with a draft after asking for it, you
                can contact the customer support team.
                <h5>What if the writer did not follow instructions?</h5>
                We strive to deliver the best quality work to our clients. In
                the case where a writer delivers bad quality work, the client
                has the right to reject the order and request for a refund for
                the money. However, you can only do this before 72 hours after
                the deadline or after downloading the paper.
                <h5>When can I contact you?</h5>
                We are available 24/7. Therefore you can always contact us at
                any time of the day, and we will promptly respond.
                <h5>Can I withdraw my money back to my PayPal account?</h5>
                Yes you can. You just need to send a withdraw request, and we
                will process it within 2 days.
                <h5>Do you provide a plagiarism reports for your papers?</h5>
                We provide FREE plagiarism reports to our customers. However,
                you must ask for it in the order instructions before we provide
                since we handle so many papers.
                <h5>What if a writer did my paper and I failed the paper?</h5>
                We handle such incidences on a case by case basis. You can
                report to us, and we will consider whether to refund or not,
                depending on how genuine your claim is. However, we recommend
                that you check your paper before releasing the funds to the
                writer to avoid such instances.
                <h5>What if my university discovers me?</h5>
                We protect your identity from everyone. In fact, not even your
                writer is aware of your name or where you are from. You can
                always be sure no one will ever know that you had someone help
                you with your homework.
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

export default Fags;
