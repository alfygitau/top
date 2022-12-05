import React from "react";
import { FiCheckCircle, FiPhoneCall, FiEdit } from "react-icons/fi";
import { FaListUl } from "react-icons/fa";
import { ImFileText2, ImFilePdf } from "react-icons/im";
import { BiRevision } from "react-icons/bi";
import { GoMail } from "react-icons/go";
import { Panel, Grid, Row, Col, List, Button } from "rsuite";
import Calculator from "./calculator";
import Link from "next/link";
import router from "next/router";

const PrivacyPolicy = () => {
  return (
    <div style={{ paddingTop: "80px" }}>
      <Grid>
        <Row>
          <Col xs={24} sm={16} md={16}>
            <Panel>
              <center>
                <h3>Privacy Policy</h3>
              </center>
              <p style={{ fontSize: "15px", lineHeight: 2.5 }}>
                At Topratedprofessors.com , accessible from
                Topratedprofessors.com , one of our main priorities is the
                privacy of our visitors. This Privacy Policy document contains
                types of information that is collected and recorded by
                Topratedprofessors.com and how we use it.
                <h5>Log Files</h5>
                Topratedprofessors.com follows a standard procedure of using log
                files. These files log visitors when they visit websites. All
                hosting companies do this and a part of hosting services'
                analytics. The information collected by log files include
                internet protocol (IP) addresses, browser type, Internet Service
                Provider (ISP), date and time stamp, referring/exit pages, and
                possibly the number of clicks. These are not linked to any
                information that is personally identifiable. The purpose of the
                information is for analyzing trends, administering the site,
                tracking users' movement on the website, and gathering
                demographic information.
                <h5>Cookies and Web Beacons</h5>
                Like any other website, Topratedprofessors.com uses 'cookies'.
                These cookies are used to store information including visitors'
                preferences, and the pages on the website that the visitor
                accessed or visited. The information is used to optimize the
                users' experience by customizing our web page content based on
                visitors' browser type and/or other information.
                <h5>Privacy Policies</h5>
                You may consult this list to find the Privacy Policy for each of
                the advertising partners of Topratedprofessors.com .
                <br />
                Third-party ad servers or ad networks uses technologies like
                cookies, JavaScript, or Web Beacons that are used in their
                respective advertisements and links that appear on
                Topratedprofessors.com , which are sent directly to users'
                browser. They automatically receive your IP address when this
                occurs. These technologies are used to measure the effectiveness
                of their advertising campaigns and/or to personalize the
                advertising content that you see on websites that you visit.
                <br />
                Note that Topratedprofessors.com has no access to or control
                over these cookies that are used by third-party advertisers.
                <h5>Third Party Privacy Policies</h5>
                Topratedprofessors.com 's Privacy Policy does not apply to other
                advertisers or websites. Thus, we are advising you to consult
                the respective Privacy Policies of these third-party ad servers
                for more detailed information. It may include their practices
                and instructions about how to opt-out of certain options. You
                may find a complete list of these Privacy Policies and their
                links here: Privacy Policy Links. You can choose to disable
                cookies through your individual browser options. To know more
                detailed information about cookie management with specific web
                browsers, it can be found at the browsers' respective websites.
                What Are Cookies?
                <h5>Children's Information</h5>
                Another part of our priority is adding protection for children
                while using the internet. We encourage parents and guardians to
                observe, participate in, and/or monitor and guide their online
                activity. Topratedprofessors.com does not knowingly collect any
                Personal Identifiable Information from children under the age of
                13. If you think that your child provided this kind of
                information on our website, we strongly encourage you to contact
                us immediately and we will do our best efforts to promptly
                remove such information from our records.
                <h5>Online Privacy Policy Only</h5>
                This Privacy Policy applies only to our online activities and is
                valid for visitors to our website with regards to the
                information that they shared and/or collect in
                Topratedprofessors.com . This policy is not applicable to any
                information collected offline or via channels other than this
                website.
                <h5>Consent</h5>
                By using our website, you hereby consent to our Privacy Policy
                and agree to its Terms and Conditions. Try us today, and we
                promise quality work. Get the maximum value for your money with{" "}
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

export default PrivacyPolicy;
