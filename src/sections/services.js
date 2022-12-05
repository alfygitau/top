import React from "react";
import { FiCheckCircle, FiPhoneCall, FiEdit } from "react-icons/fi";
import { FaListUl } from "react-icons/fa";
import { ImFileText2, ImFilePdf } from "react-icons/im";
import { BiRevision } from "react-icons/bi";
import { GoMail } from "react-icons/go";
import { Panel, Grid, Row, Col, List, Button } from "rsuite";
import Calculator from "./calculator";
import router from "next/router";
import Link from "next/link";

const Services = () => {
  return (
    <div style={{ paddingTop: "80px" }}>
      <Grid>
        <Row>
          <Col xs={24} sm={16} md={16}>
            <Panel>
              <center>
                <h3>Services</h3>
              </center>
              <p style={{ fontSize: "15px", lineHeight: 2.5 }}>
                Are you running out of time? Do you feel the task is too tough
                for you to handle? Are your hands all full that you can't get
                the time to handle your class assignment at the same time? We
                are here for you. We handle all kind of papers across all fields
                of study. Our professional freelance writers have a vast
                experience that will guarantee quality work. We also promise to
                deliver the work on time regardless of how tight the deadline
                might be. Whenever you come to us like "Someone, please help me
                complete my assignment, I'm running out of time and Ideas," we
                promise to hear your call and come to your help. Our
                professional writers hold PhDs in various fields and depending
                on the level of writing you need, we will do exactly that. We
                offer essay help services to students across the globe, and our
                custom essays have helped more than one million students to
                achieve their academic goals. Some students come to us like “I
                need someone to write my project/research proposal, essay, lab
                report, admission essay, etc. Can someone please write it for
                me?” We always are there for such students. We receive referrals
                from students who have seen a significant improvement in their
                grades as a result of using our services. The sweeter part about
                all this is that the services are at a low price as compared to
                other websites that try to offer the same services.
                <br />
                <h5>Our services include but not limited to the following:</h5>
                <ol style={{ marginLeft: "50px" }}>
                  <li>Term Paper Writing</li>
                  <li>Essay Writing Service</li>
                  <li>Research Paper writing</li>
                  <li> Lab report writing</li>
                  <li>Admission essay writing</li>
                  <li>Custom Essay Writing</li>
                  <li>Dissertation writing service</li>
                  <li>Personal statement writing</li>
                  <li>Book Reviews and Reports</li>
                  <li>Business Plan writing</li>
                  <li>Editing and Proofreading services</li>
                  <li>Statistical projects</li>
                </ol>
                Try us today, and we promise quality work. Get the maximum value
                for your money with{" "}
                <Link href="/">
                  <a>TopRatedProfessors.com</a>
                </Link>
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
                onClick={() => {
                  router.push("/dashboard/create_order");
                  scroll(0, 0);
                }}
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

export default Services;
