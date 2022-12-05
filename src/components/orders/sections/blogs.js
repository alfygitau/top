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
import { Radio, RadioGroup, Form, Pagination } from "rsuite";
import TrashIcon from "@rsuite/icons/Trash";
import EditIcon from "@rsuite/icons/Edit";
import AddOutlineIcon from "@rsuite/icons/AddOutline";
import ModalContext from "../../helpers/ModalContext";
import VisibleIcon from "@rsuite/icons/Visible";
import BlogModal from "components/helpers/BlogModal";

const blogs = () => {
  const blogSelector = useSelector((state) => state.blogState);
  const { blogs, blog } = blogSelector;

  const dispatch = useDispatch();
  const [value, setValue] = useState("active");
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openBlog, setOpenBlog] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [updateID, setUpdateID] = useState("");
  const [blogDetails, setBlogDetails] = useState({
    title: "",
    blog_text: "",
    keywords: "",
  });
  const [updateDetails, setUpdateDetails] = useState({
    title: blog?.title,
    blog_text: blog?.blog_text,
    keywords: blog?.keywords,
  });

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const handleBlogClose = () => setOpenBlog(false);
  const handleOpenBlog = () => setOpenBlog(true);
  const handleUpdateClose = () => setOpenUpdate(false);
  const handleViewClose = () => setOpenView(false);

  const fetchBlog = (title) => {
    setOpenBlog(true);
    getBlog(dispatch, title);
  };

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

    console.log("blog_text", blog_text);

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
      console.log("Provide all required fields");
    }
  };

  const handleDeleteArticle = (article) => {
    deleteBlog(dispatch, article.id);
    getBlogs(dispatch);
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
    filterBlog(dispatch, value);
  }, [dispatch, value]);

  const blogNavbar = {
    display: "flex",
    marginTop: "20px",
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: "10px",
    height: "70px",
    width: "80%",
    justifyContent: "space-around",
  };

  const contentStyles = {
    padding: "30px",
    border: "1px solid rgb(247,247,250)",
    marginLeft: "40px",
    marginTop: "20px",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    width: "80%",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
  };

  const titleStyles = {
    color: "#FA8900",
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
      <div className="content">
        {blogs?.top_articles?.map((blog) => (
          <div className="bloging" style={contentStyles} id={blog.id}>
            <div className="blog">
              <h3 style={titleStyles}>{blog.title}</h3>
              <p>{blog.keywords}</p>
              <div dangerouslySetInnerHTML={{ __html: blog.blog_text }} />
            </div>
            {handleBlogCreator() ?? (
              <div className="options" style={optionStyles}>
                <TrashIcon
                  style={iconStyles}
                  onClick={() => handleDeleteArticle(blog)}
                />
                <VisibleIcon
                  style={iconStyles}
                  onClick={() => fetchBlog(`${blog.slug}`)}
                />
              </div>
            )}
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
        <ModalContext
          open={openUpdate}
          handleClose={handleUpdateClose}
          hadleClick={(e) => handleUpdateSubmit(e, updateID)}
          handleInputChange={handleInputChange}
          blog={updateDetails}
          button="Update"
          main_title="Update Blog"
          onEditorChange={handleInstructionsChange}
        />
        <BlogModal open={openBlog} handleClose={handleBlogClose} />
      </div>
    </div>
  );
};

export default blogs;
