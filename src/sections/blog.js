import React, { useEffect, useState } from "react";
import { FiCheckCircle, FiPhoneCall, FiEdit } from "react-icons/fi";
import { FaListUl } from "react-icons/fa";
import { ImFileText2, ImFilePdf } from "react-icons/im";
import { BiRevision } from "react-icons/bi";
import { GoMail } from "react-icons/go";
import { Panel, Grid, Row, Col, List, Modal } from "rsuite";
import { Button } from "theme-ui";
import Calculator from "./calculator";
import router from "next/router";
import Image from "../assets/banner-thumb.png";
import { BsBook } from "react-icons/bs";
import moment from "moment";
import bloggy from "../assets/blog/blog.jpg";
import {
  createBlog,
  getBlogs,
  deleteBlog,
  getBlog,
  updateBlog,
} from "dataStore/actions/blogAction";
import { useDispatch, useSelector } from "react-redux";
import ModalContext from "../components/helpers/ModalContext";
import styles from "../styles/Blog.module.css";
import Link from "next/link";

let baseUrl = "https://toprated.s3.eu-central-1.amazonaws.com";

const Blog = () => {
  const blogSelector = useSelector((state) => state.blogState);
  const { blogs } = blogSelector;
  const dispatch = useDispatch();

  useEffect(() => {
    getBlogs(dispatch);
  }, [dispatch]);

  const fetchBlog = (title) => {
    getBlog(dispatch, title);
    localStorage.setItem("slug", title);
  };

  const contentStyles = {
    padding: "30px",
    borderBottom: "1px solid rgb(218,230,242)",
    marginLeft: "40px",
    marginTop: "20px",
    width: "80%",
    display: "flex",
  };

  const titleStyles = {
    color: "black",
    fontSize: "20px",
    textTransform: "capitalize",
  };
  const optionStyles = {
    display: "flex",
    alignItems: "center",
  };

  const iconStyles = {
    marginRight: "15px",
    fontSize: "20px",
    cursor: "pointer",
  };

  const longEnUSFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div style={{ paddingTop: "80px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        <h3 style={{ marginLeft: "80px" }}>BLOGS</h3>
      </div>
      <Grid fluid>
        <Row>
          <Col xs={24} sm={16} md={16}>
            <Grid fluid>
              <Row gutter={16}>
                <Col xs={24}>
                  <Panel>
                    {blogs.top_articles?.map((blog) => (
                      <div
                        style={contentStyles}
                        key={blog.id}
                        className={styles.content}
                      >
                        <div
                          className={styles.bloging}
                          style={{ display: "flex" }}
                        >
                          <div
                            style={{
                              marginRight: "10px",
                              border: "1px solid rgb(218,230,242)",
                              display: "flex",
                              flex: "1",
                              height: "180px",
                            }}
                          >
                            <img
                              src={
                                blog.assets?.length > 0
                                  ? `${baseUrl}/${blog.assets[0].key}`
                                  : bloggy
                              }
                              alt="blog"
                              height="100%"
                              width="100%"
                              className={styles.image}
                              style={{ backgroundSize: "cover" }}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flex: "2",
                              flexDirection: "column",
                            }}
                          >
                            <h3 style={titleStyles}>{blog.title}</h3>
                            <div className={styles.paragraph}>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: blog.blog_text,
                                }}
                              />
                            </div>
                            <p
                              style={{
                                fontStyle: "italic",
                                color: "grey",
                                marginTop: "10px",
                              }}
                            >
                              POSTED ON &nbsp;
                              {blog.status === "active"
                                ? moment(blog.published_at).format(
                                    "MMMM Do YYYY, h:mm:ss a"
                                  )
                                : moment(blog.created_at).format(
                                    "MMMM Do YYYY, h:mm:ss a"
                                  )}
                            </p>
                          </div>
                        </div>
                        <Link href={`/header/blog/${blog.id}/`} passHref>
                          <div
                            className={styles.middle}
                            onClick={() => fetchBlog(blog.slug)}
                          >
                            <div className={styles.text}>
                              <BsBook /> &nbsp; Read More....
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </Panel>
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

export default Blog;
