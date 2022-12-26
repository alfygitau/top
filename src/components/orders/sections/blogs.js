import {
  createBlog,
  deleteBlog,
  filterBlog,
  getBlog,
  getBlogs,
} from "dataStore/actions/blogAction";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Radio, RadioGroup, Form, Divider } from "rsuite";
import TrashIcon from "@rsuite/icons/Trash";
import AddOutlineIcon from "@rsuite/icons/AddOutline";
import ModalContext from "../../helpers/ModalContext";
import VisibleIcon from "@rsuite/icons/Visible";
import BlogModal from "components/helpers/BlogModal";
import Link from "next/link";
import styles from "../../../styles/Blog.module.css";
import { BsBook } from "react-icons/bs";
import moment from "moment";
import bloggy from "../../../assets/blog/blog.png";
import { Button, Modal } from "react-bootstrap";
import { useRouter } from "next/router";

let baseUrl = "https://toprated.s3.eu-central-1.amazonaws.com";

const blogs = () => {
  const blogSelector = useSelector((state) => state.blogState);
  const { blogs } = blogSelector;
  const [rows, setRows] = useState(0);
  const router = useRouter();

  const dispatch = useDispatch();
  const [value, setValue] = useState("active");
  const [open, setOpen] = useState(false);
  const [openBlog, setOpenBlog] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [updateID, setUpdateID] = useState("");
  const [blogDetails, setBlogDetails] = useState({
    title: "",
    blog_text: "",
    keywords: "",
  });

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const handleBlogClose = () => setOpenBlog(false);
  const handleOpenBlog = () => setOpenBlog(true);
  const handleViewClose = () => setOpenView(false);

  const fetchBlog = (title) => {
    getBlog(dispatch, title);
    localStorage.setItem("slug", title);
  };

  const handleInputChange = (event) => {
    event.persist();
    setBlogDetails((details) => ({
      ...details,
      [event.target?.name]: event.target?.value,
    }));
  };

  const handleInstructionsChange = (value) => {
    setBlogDetails((details) => ({
      ...details,
      blog_text: value,
    }));
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
        setValue("active");
        setBlogDetails({
          title: "",
          blog_text: "",
          keywords: "",
        });
        setOpenBlog(true);
      });
    } else {
      console.log("Provide all required fields");
    }
  };

  useEffect(() => {
    filterBlog(dispatch, value);
  }, [dispatch, value]);

  const blogNavbar = {
    display: "flex",
    marginTop: "20px",
    marginLeft: "60px",
    marginBottom: "10px",
    height: "70px",
    width: "80%",
    justifyContent: "space-around",
    alignItems: "center",
    border: "1px solid rgb(218,230,242)",
  };

  const contentStyles = {
    padding: "30px",
    borderBottom: "1px solid rgb(218,230,242)",
    marginLeft: "40px",
    marginRight: "10px",
    marginTop: "20px",
    display: "flex",
    fontSize: "14px",
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

  const categoriesStyles = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
  };

  const linkStyles = {
    textDecoration: "none",
  };

  const longEnUSFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <div style={blogNavbar} className="blog-navbar">
        <h4>All Blogs</h4>
        <div onClick={() => setOpen(true)}>
          <AddOutlineIcon style={iconStyles} />
          <span style={{ cursor: "pointer" }}>Create Blog</span>
        </div>

        <div className="select">
          <span style={{ marginRight: "20px" }}>Filter by status</span>
          <Form.Group controlId="radioList">
            <RadioGroup
              name="radioList"
              inline
              appearance="picker"
              defaultValue="active"
              value={value}
              onChange={setValue}
            >
              <Radio value="active">Active Blogs</Radio>
              <Radio value="pending">Pending Blogs</Radio>
              <Radio value="deleted">Deleted Blogs</Radio>
            </RadioGroup>
          </Form.Group>
        </div>
      </div>
      <div>
        <div className="all-content" style={{ display: "flex" }}>
          <div style={{ marginBottom: "40px", width: "60%" }}>
            {blogs?.top_articles?.map((blog) => (
              <div
                style={contentStyles}
                key={blog.id}
                className={styles.content}
              >
                <div className={styles.bloging} style={{ display: "flex" }}>
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
                        style={{ lineHeight: "2" }}
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
          </div>
          <div
            style={{
              width: "30%",
              border: "1px solid rgb(218,230,242)",
              height: "60vh",
              marginRight: "auto",
              marginLeft: "auto",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <h5>CATEGORIES</h5>
            <div style={categoriesStyles}>
              <h6 href="#">TopRated samples</h6>
              <a href="#" style={linkStyles}>
                Essay samples
              </a>
              <a href="#" style={linkStyles}>
                Research Paper samples
              </a>
              <a href="#" style={linkStyles}>
                Book Review Samples
              </a>
            </div>
            <div style={categoriesStyles}>
              <h6>TopRated Topics</h6>
              <a href="#" style={linkStyles}>
                Essay topics
              </a>
              <a href="#" style={linkStyles}>
                Research Paper topics
              </a>
              <a href="#" style={linkStyles}>
                Speech/presentation topics
              </a>
            </div>
            <div style={categoriesStyles}>
              <h6>TopRated Writing Guides</h6>
              <a href="#" style={linkStyles}>
                Essay writing
              </a>
              <a href="#" style={linkStyles}>
                Academic writing
              </a>
              <a href="#" style={linkStyles}>
                Research paper writing
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="modal">
        <ModalContext
          open={open}
          handleClose={handleClose}
          hadleClick={handleCreateArticle}
          handleInputChange={handleInputChange}
          blog={blogDetails}
          button="Create Blog"
          main_title="Create Blog"
          onEditorChange={handleInstructionsChange}
        />
        <BlogModal
          open={openBlog}
          handleClose={handleBlogClose}
          setValue={setValue}
          setOpenBlog={setOpenBlog}
        />
      </div>
    </div>
  );
};

export default blogs;
