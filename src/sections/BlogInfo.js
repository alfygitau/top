import React from "react";
import { Panel, Grid, Row, Col, List, Modal, Loader } from "rsuite";
import Calculator from "./calculator";
import { FiCheckCircle, FiPhoneCall, FiEdit } from "react-icons/fi";
import { FaListUl } from "react-icons/fa";
import { ImFileText2, ImFilePdf } from "react-icons/im";
import { BiRevision } from "react-icons/bi";
import { GoMail } from "react-icons/go";
import { Button } from "theme-ui";
import { useSelector } from "react-redux";

const BlogInfo = () => {
  const { blogDetails, isLoading } = useSelector((state) => state.blogState);

  const longEnUSFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const detailsStyles = {
    display: "flex",
    flexDirection: "column",
    padding: "40px",
    width: "100%",
  };

  return (
    <div style={{ paddingTop: "80px" }}>
      <Grid fluid>
        <Row>
          <Col xs={24} sm={16} md={16}>
            <Grid fluid>
              <Row gutter={16}>
                <Col xs={24}>
                  <>
                    {isLoading ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Loader size="md" />
                      </div>
                    ) : (
                      <div style={{ display: "flex" }}>
                        <div style={detailsStyles}>
                          <div
                            className="preview"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <h3>
                              {blogDetails.id}:{blogDetails.title}
                            </h3>
                          </div>
                          <p>{blogDetails.keywords}</p>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: blogDetails.blog_text,
                            }}
                          />
                          <p style={{ fontStyle: "italic" }}>
                            POSTED ON{" "}
                            {longEnUSFormatter.format(blogDetails.createdAt)}
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                </Col>
              </Row>
            </Grid>
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

export default BlogInfo;
