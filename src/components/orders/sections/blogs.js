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

const blogs = () => {
  const blogSelector = useSelector((state) => state.blogState);
  const { blogs } = blogSelector;
  const [rows, setRows] = useState(0);

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
      });
    } else {
      console.log("Provide all required fields");
    }
  };

  const handleDeleteArticle = (article) => {
    deleteBlog(dispatch, article.id);
    setValue("deleted");
    getBlogs(dispatch);
  };

  useEffect(() => {
    filterBlog(dispatch, value);
  }, [dispatch, value]);

  const blogNavbar = {
    display: "flex",
    marginTop: "20px",
    // marginRight: "auto",
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
    marginTop: "20px",
    // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    width: "80%",
    // borderRadius: "10px",
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
      <div className="content" style={{ marginBottom: "40px" }}>
        {blogs?.top_articles?.map((blog) => (
          <div className="bloging" style={contentStyles} key={blog.id}>
            <div className="blog">
              <h3 style={titleStyles}>{blog.title}</h3>
              <p>{blog.keywords}</p>
              <p
                dangerouslySetInnerHTML={{
                  __html: blog.blog_text.slice(0, 200),
                }}
              />
              <p style={{ fontStyle: "italic", color: "grey" }}>
                POSTED ON {longEnUSFormatter.format(blog.createdAt)}
              </p>
            </div>
            <div className="options" style={optionStyles}>
              {blog.status !== "deleted" && (
                <TrashIcon
                  style={iconStyles}
                  onClick={() => handleDeleteArticle(blog)}
                />
              )}
              <Link href={`/dashboard/blogs/${blog.id}/`} passHref>
                <VisibleIcon
                  style={iconStyles}
                  onClick={() => fetchBlog(blog.slug)}
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="modal">
        <ModalContext
          open={open}
          handleClose={handleClose}
          hadleClick={handleCreateArticle}
          handleInputChange={handleInputChange}
          blog={blogDetails}
          button="Create"
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
