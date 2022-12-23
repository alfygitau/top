import React, { useEffect } from "react";
import { Panel, Grid, Row, Col, List, Modal, Loader, Carousel } from "rsuite";
import Calculator from "./calculator";
import { FiCheckCircle, FiPhoneCall, FiEdit } from "react-icons/fi";
import { FaListUl } from "react-icons/fa";
import { ImFileText2, ImFilePdf } from "react-icons/im";
import { BiRevision } from "react-icons/bi";
import { GoMail } from "react-icons/go";
import { Button } from "theme-ui";
import { useSelector } from "react-redux";
import blog from "../assets/blog/blog.png";
import moment from "moment";
import styles from "../styles/Blog.module.css";
import { useDispatch } from "react-redux";
import { getBlog } from "dataStore/actions/blogAction";

let baseUrl = "https://toprated.s3.eu-central-1.amazonaws.com";

const BlogInfo = () => {
  const dispatch = useDispatch();
  const { blogDetails, isLoading } = useSelector((state) => state.blogState);

  const detailsStyles = {
    display: "flex",
    flexDirection: "column",
    padding: "40px",
    width: "100%",
  };

  const slugFromStorage = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("slug");
    }
  };

  let res = slugFromStorage();
  useEffect(() => {
    getBlog(dispatch, res);
  }, [dispatch, res]);

  return (
    <div style={{ paddingTop: "80px" }} className={styles.fonts}>
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
                      <div style={{ position: "relative" }}>
                        <Panel
                          shaded
                          style={{
                            marginLeft: "40px",
                            marginRight: "40px",
                            marginTop: "10px",
                            marginBottom: "20px",
                            zIndex: "-1",
                          }}
                        >
                          <p style={{ fontSize: "24px", fontWeight: "600" }}>
                            {blogDetails.title}
                          </p>
                          {blogDetails?.assets?.length > 1 && (
                            <Carousel
                              autoplay
                              style={{
                                zIndex: "-1",
                                float: "left",
                                margin: "10px",
                                width: "50%",
                                height: "300px",
                                border: "1px solid rgb(218,230,242)",
                                borderRadius: "10px",
                              }}
                            >
                              {blogDetails?.assets?.map((asset) => (
                                <img
                                  key={asset.id}
                                  src={`${baseUrl}/${asset.key}`}
                                />
                              ))}
                            </Carousel>
                          )}
                          {blogDetails?.assets?.length < 1 && (
                            <div>
                              <img
                                src={blogg}
                                alt="blog"
                                height="300"
                                width="50%"
                                style={{
                                  float: "left",
                                  margin: "10px",
                                  border: "1px solid rgb(218,230,242)",
                                  borderRadius: "10px",
                                }}
                              />
                            </div>
                          )}
                          {blogDetails?.assets?.length === 1 && (
                            <div>
                              <img
                                height="300"
                                width="50%"
                                style={{
                                  float: "left",
                                  margin: "10px",
                                  border: "1px solid rgb(218,230,242)",
                                  borderRadius: "10px",
                                }}
                                src={`${baseUrl}/${blogDetails.assets[0].key}`}
                              />
                            </div>
                          )}

                          <p style={{ fontStyle: "italic" }}>
                            POSTED ON &nbsp;
                            {moment(blogDetails.created_at).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </p>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: blogDetails.blog_text,
                            }}
                          />
                        </Panel>
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
