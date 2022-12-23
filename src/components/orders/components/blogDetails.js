import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Loader } from "rsuite";
import { Panel, Placeholder, ButtonGroup } from "rsuite";
import EditIcon from "@rsuite/icons/Edit";
import CheckOutlineIcon from "@rsuite/icons/CheckOutline";
import Card from "react-bootstrap/Card";
import tick from "../../../assets/blog/tick.webp";
import blogg from "../../../assets/blog/blog.png";
import { Carousel } from "rsuite";
import AttachmentIcon from "@rsuite/icons/Attachment";
import styles from "../../../styles/Blog.module.css";
import {
  deleteBlog,
  deleteBlogFile,
  getBlog,
  publishBlog,
  updateBlog,
  UploadBlogImages,
} from "dataStore/actions/blogAction";
import { useDispatch } from "react-redux";
import TrashIcon from "@rsuite/icons/Trash";
import { Editor } from "@tinymce/tinymce-react";
import { Box, Input, Label } from "theme-ui";
import moment from "moment";

// bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Stack } from "react-bootstrap";

let baseUrl = "https://toprated.s3.eu-central-1.amazonaws.com";

const blogDetails = ({ section }) => {
  // bootstrap
  const [show, setShow] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const inputRef = useRef();

  const handleClose = () => setShow(false);
  const handleCloseUpload = () => setShowUpload(false);

  const handleShow = () => setShow(true);
  const [published, setPublished] = useState(false);

  const dispatch = useDispatch();
  const { blogDetails, isLoading } = useSelector((state) => state.blogState);

  const [instructions, setInstructions] = useState(blogDetails.blog_text);
  const [title, setTitle] = useState(blogDetails.title);
  const [keywords, setKeywords] = useState(blogDetails.keywords);

  const router = useRouter();

  const handleInit = (evt, editor) => {
    // setLength(editor.getContent({ format: 'text' }).length);
  };

  const handleInstructionsChange = (value, editor) => {
    setInstructions(value);
  };

  const handleUpdateSubmit = async (event, articleID) => {
    event.persist();
    event.preventDefault();
    const bodyData = {
      title: title,
      blog_text: instructions,
      keywords: keywords,
    };
    if (bodyData) {
      await updateBlog(dispatch, articleID, bodyData).then((response) => {
        if (response.status === 200) {
          setShow(false);
          router.push("/dashboard/blogs");
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

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });

  const handleUploadImages = (e) => {
    setShowUpload(true);
    e.preventDefault();
    let newArr = inputRef.current.files;
    for (let i = 0; i < newArr.length; i++) {
      handleFileUploadChange(newArr[i]);
    }
  };

  const handleFileUploadChange = async (file) => {
    try {
      const fileBase64 = await toBase64(file);
      const objectData = {
        top_article_id: blogDetails.id,
        uploaded_files: [
          {
            content_type: file.type,
            filename: file.name,
            data: fileBase64,
          },
        ],
      };
      await UploadBlogImages(dispatch, objectData).then((response) => {
        console.log(response);
        if (response.status === 201) {
          getBlog(dispatch, blogDetails.slug);
          toast.success("File uploaded Successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setShowUpload(false);
        }
      });
    } catch (error) {
      toast.error("File not uploaded Successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const detailsStyles = {
    display: "flex",
    flexDirection: "column",
    padding: "40px",
    width: "70%",
    fontFamily: "Quicksand",
  };

  const iconStyles = {
    marginRight: "2px",
    fontSize: "20px",
    cursor: "pointer",
  };

  const handlePublish = (id) => {
    publishBlog(dispatch, id);
    // router.push("/dashboard/blogs");
    toast.success("New blog published");
    setPublished(true);
  };

  const handleExit = () => {
    setTitle("");
    setInstructions("");
    setKeywords("");
  };

  const showData = () => {
    setTitle(blogDetails.title);
    setKeywords(blogDetails.keywords);
    setInstructions(blogDetails.blog_text);
  };

  const handleDeleteArticle = (id) => {
    deleteBlog(dispatch, id);
    toast("Article Deleted");
    router.push("/dashboard/blogs");
  };

  const handleDeleteBlogFile = async (blogId, fileId) => {
    await deleteBlogFile(dispatch, blogId, fileId);
    setShowUpload(false);
    await getBlog(dispatch, blogDetails.slug);
  };

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Quicksand",
          }}
        >
          <Loader size="md" />
        </div>
      ) : (
        <div style={{ display: "flex" }} className={styles.fonts}>
          <Panel
            shaded
            style={{
              marginLeft: "40px",
              marginRight: "40px",
              marginTop: "10px",
              zIndex: "-1",
              width: "80%",
            }}
          >
            <p style={{ fontSize: "24px", fontWeight: "600" }}>
              {blogDetails.title}
            </p>
            {blogDetails?.assets?.length > 0 ? (
              <Carousel
                autoplay
                style={{
                  zIndex: "-1",
                  float: "left",
                  margin: "10px",
                  width: "50%",
                  height: "300px",
                }}
              >
                {blogDetails?.assets?.map((asset) => (
                  <img key={asset.id} src={`${baseUrl}/${asset.key}`} />
                ))}
              </Carousel>
            ) : (
              <div>
                <img
                  src={blogg}
                  alt="blog"
                  height="300"
                  width="50%"
                  style={{ float: "left", margin: "10px" }}
                />
              </div>
            )}

            <p style={{ fontStyle: "italic" }}>
              POSTED ON &nbsp;
              {moment(blogDetails.created_at).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            <div dangerouslySetInnerHTML={{ __html: blogDetails.blog_text }} />
          </Panel>
          <Panel
            bordered
            shaded
            style={{
              width: "10%",
              height: "500px",
              backgroundColor: "#fff",
              display: "flex",
              marginTop: "10px",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowUpload(true)}
                >
                  <AttachmentIcon style={iconStyles} /> Add/remove images
                </span>
                {blogDetails.status !== "active" && !published ? (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handlePublish(blogDetails.id)}
                  >
                    <CheckOutlineIcon style={iconStyles} /> Publish
                  </span>
                ) : (
                  <span>
                    <img src={tick} alt="new" height="20px" /> &nbsp; Published
                  </span>
                )}
                <span style={{ cursor: "pointer" }} onClick={handleShow}>
                  <EditIcon style={iconStyles} /> Edit
                </span>
                {blogDetails.status !== "deleted" && (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteArticle(blogDetails.id)}
                  >
                    <TrashIcon style={iconStyles} /> Delete
                  </span>
                )}
              </div>
            </div>
          </Panel>
        </div>
      )}
      <Modal
        centered
        size="lg"
        show={show}
        onHide={handleClose}
        onExited={handleExit}
        onShow={showData}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => handleUpdateSubmit(e, blogDetails.id)}>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <Label htmlFor="keywords">Blog Keywords</Label>
            <Input
              id="keywords"
              name="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
            <Editor
              apiKey="jm5weuex99fz17qyiv457ia53e6ignpzdupkd8vpszcywnoo"
              value={instructions}
              onInit={handleInit}
              init={{
                height: 250,
                language: "en_US",
                menubar: false,
                plugins: [
                  "advlist autolink lists link image",
                  "charmap print preview anchor help",
                  "searchreplace visualblocks code",
                  "insertdatetime media table paste wordcount",
                ],
                toolbar:
                  "link | undo redo | formatselect | bold italic | \
                                              alignleft aligncenter alignright | \
                                              bullist numlist outdent indent | help",
              }}
              onEditorChange={handleInstructionsChange}
            />
            <Button type="submit" style={{ marginTop: "10px" }}>
              Update Blog
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showUpload} onHide={handleCloseUpload} size="lg" centered>
        <Modal.Header>Upload/remove images</Modal.Header>
        <Modal.Body>
          <p style={{ textDecoration: "underline" }}>Images/Uploads</p>
          {blogDetails?.assets?.map((asset) => (
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", flex: "7" }}>
                <li>{asset.filename}</li>
              </div>
              <div
                style={{
                  display: "flex",
                  flex: "2",
                  marginBottom: "15px",
                  justifyContent: "flex-end",
                }}
              >
                <TrashIcon
                  style={iconStyles}
                  onClick={() => handleDeleteBlogFile(blogDetails.id, asset.id)}
                />
              </div>
            </div>
          ))}
          <p style={{ textDecoration: "underline" }}>Upload multiple images</p>
          <form onSubmit={(e) => handleUploadImages(e, blogDetails.id)}>
            <input type="file" multiple ref={inputRef} />
            <Button
              appearance="primary"
              type="submit"
              style={{ marginTop: "10px" }}
            >
              Upload
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseUpload} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default blogDetails;
