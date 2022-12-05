import React from "react";
import { FiCheckCircle, FiPhoneCall, FiEdit } from "react-icons/fi";
import { FaListUl } from "react-icons/fa";
import { ImFileText2, ImFilePdf } from "react-icons/im";
import { BiRevision } from "react-icons/bi";
import { GoMail } from "react-icons/go";
import { Panel, Grid, Row, Col, List, Button } from "rsuite";
import Calculator from "./calculator";
import router from "next/router";

const HomepageReviews = () => {
  return (
    <div style={{ paddingTop: "80px" }}>
      <Grid>
        <Row>
          <Col xs={24} sm={16} md={16}>
            <Panel>
              <center>
                <h3>About Us</h3>
              </center>
              <p style={{ lineHeight: 2.5 }}>
                Many times you are not able to complete your assignment, due to
                various reasons. Sometimes, you might not have the time to do
                the assignment due to other commitments that you have to attend
                to. Other times you could just be too tired to work on your
                paper. Do not be worried. We, doctorateessays.com, will help you
                get that grade that you’ve always wanted. We are a professional
                company that offers professional essay writing services to
                customers from across the globe. Our essay writers are from
                native English speaking countries such as the USA, Ireland,
                Canada, UK and Australia. They write the best essays to our
                customers at a very affordable price. With over ten years in the
                industry, doctorateessays.com promises to give the best paper
                writing service to you. Our support representatives are
                available 24 hours a day to always make sure that they help you
                whenever you want to order an essay. Our writers are trained to
                write your custom essay following the exact instruction you give
                them and therefore guaranteeing the best quality essays. When
                you urgently need someone to help you complete your essay, and
                you visit our site, you can keep all your worries aside and wait
                for the essay. With over 200 qualified writers, we can guarantee
                you that we will deliver top quality work on time. We also make
                sure to check the work for plagiarism since our work I always
                100% unique. The team of professional essay writers is always on
                standby to work on all orders that you place with us regardless
                of the deadlines. Since its start in 2003, doctorateessays.com
                has completed over 800,000 essays with an average completion
                rate of 93.4%. We strive to maintain high-quality services to
                our customers who entrust us with their assignments. Our
                customer reviews are a proof that we indeed meet their
                expectations and that they are always ready to use our service
                whenever need be. Most of the customers have also referred their
                friends to doctorateessays.com for our quality work. Just place
                an order with us today, sit back and relax. We will deliver 100%
                UNIQUE and QUALITY work ON TIME. Worry no more,
                doctorateessays.com got you covered.
                <h5>Vision</h5>
                To be the one site that gives clients 100% value for money by
                offering the best essay writing services across the globe.
                <h5>Mission</h5>
                Our mission is to make sure that students have enough time to
                participate in other school activities by offering to help them
                complete their tasks on time while at the same time maintaining
                high-quality work that will improve their grades.
                <h5>Our Core Values</h5>
                We are a team that is devoted and guided by the following five
                core values. Quality Work 100% Uniqueness Timely Delivery Zero
                Grammar Errors Professional Customer Support
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

export default HomepageReviews;
