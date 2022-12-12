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

const Blog = () => {
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [updateID, setUpdateID] = useState("");
  const [blogDetails, setBlogDetails] = useState({
    title: "",
    blog_text: "",
    keywords: "",
  });
  const blogSelector = useSelector((state) => state.blogState);
  const { blogs, blog } = blogSelector;
  const dispatch = useDispatch();

  const [updateDetails, setUpdateDetails] = useState({
    title: blog?.title,
    blog_text: blog?.blog_text,
    keywords: blog?.keywords,
  });

  const handleClose = () => setOpen(false);
  const handleUpdateClose = () => setOpenUpdate(false);
  const handleViewClose = () => setOpenView(false);

  const handleInputChange = (event) => {
    event.persist();
    setBlogDetails((details) => ({
      ...details,
      [event.target.name]: event.target.value,
    }));
  };

  const handleUpdateChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setUpdateDetails({
      ...updateDetails,
      [name]: value,
    });
  };

  const handleInstructionsChange = (value) => {
    setBlogDetails((details) => ({
      ...details,
      blog_text: value,
    }));
  };

  const handleUpdateSubmit = (event, articleID) => {
    event.persist();
    event.preventDefault();
    const bodyData = {
      title: updateDetails.title || blog.title,
      blog_text: updateDetails.blog_text || blog.blog_text,
      keywords: updateDetails.keywords || blog.keywords,
    };
    if (bodyData) {
      updateBlog(dispatch, articleID, bodyData).then((response) => {
        if (response.status === 200) {
          setOpenUpdate(false);
        }
      });
    } else {
      dispatch({
        type: "ERROR",
        errorMessage: "Make sure all the fields all filled",
      });
      if (errorMessage.errorMessage) {
        <Message type="error">Error</Message>;
      }
    }
  };

  const handleCreateArticle = (e) => {
    e.preventDefault();
    const { title, blog_text, keywords } = blogDetails;

    const bodyData = {
      title,
      blog_text,
      keywords,
    };
    if (
      bodyData.title !== "" &&
      bodyData.blog_text !== "" &&
      bodyData.keywords !== ""
    ) {
      createBlog(dispatch, bodyData).then((response) => {
        if (response.status === 200) getBlogs(dispatch);
        setOpen(false);
      });
    } else {
      dispatchCheckDetails({
        type: "ERROR",
        errorMessage: "Make sure all the fields all filled",
      });
    }
  };

  const handleDeleteArticle = (article) => {
    deleleBlog(dispatch, article.id);
  };

  const handleBlogCreator = () => {
    let blogCreator;
    if (typeof window !== "undefined") {
      // Perform localStorage action
      blogCreator = blogCreator = localStorage.currentUser.id === 7 || null;
    }
    return blogCreator;
  };

  useEffect(() => {
    getBlogs(dispatch);
  }, [dispatch]);

  const contentStyles = {
    padding: "30px",
    borderBottom: "1px solid rgb(218,230,242)",
    marginLeft: "40px",
    marginTop: "20px",
    width: "80%",
    display: "flex",
    justifyContent: "space-between",
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
        <h3>BLOGS</h3>
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
                        <div className={styles.bloging}>
                          <h3 style={titleStyles}>{blog.title}</h3>
                          <p>{blog.keywords}</p>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: blog.blog_text.slice(0, 250),
                            }}
                          />
                          <p style={{ fontStyle: "italic", color: "grey" }}>
                            POSTED ON {longEnUSFormatter.format(blog.createdAt)}
                          </p>
                        </div>
                        <Link href={`/dashboard/blogs/${blog.id}/`} passHref>
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
                    {/* {blogs.top_articles && (
                      <Pagination
                        size="md"
                        total={blogs.pagination.count}
                        limit={per}
                        activePage={activePage}
                        onChangePage={(page) => setActivePage(page)}
                      />
                    )} */}
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
