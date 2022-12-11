import { Router, useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Loader } from "rsuite";
import EditIcon from "@rsuite/icons/Edit";
import CheckOutlineIcon from "@rsuite/icons/CheckOutline";
import { publishBlog, updateBlog } from "dataStore/actions/blogAction";
import { useDispatch } from "react-redux";
// import { Modal, Button, Placeholder } from "rsuite";
import { Editor } from "@tinymce/tinymce-react";
import { Box, Input, Label } from "theme-ui";

// bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const blogDetails = ({ section }) => {
  // bootstrap
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [published, setPublished] = useState(false);

  const dispatch = useDispatch();
  const { blogDetails, isLoading } = useSelector((state) => state.blogState);
  console.log(blogDetails);

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

  const detailsStyles = {
    display: "flex",
    flexDirection: "column",
    padding: "40px",
    width: "70%",
  };

  const iconStyles = {
    marginRight: "5px",
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

  return (
    <>
      {isLoading ? (
        <Loader size="md" />
      ) : (
        <div style={{ display: "flex" }}>
          <div style={detailsStyles}>
            <div
              className="preview"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h3>
                {blogDetails.id}:{blogDetails.title}
              </h3>
            </div>
            <p>{blogDetails.keywords}</p>
            <div dangerouslySetInnerHTML={{ __html: blogDetails.blog_text }} />
            <p>POSTED ON {blogDetails.createdAt}</p>
          </div>
          <div className="buttons" style={{ marginTop: "20px" }}>
            <p>Blog Options</p>
            {blogDetails.status !== "active" && !published ? (
              <span
                style={{ marginRight: "30px", cursor: "pointer" }}
                onClick={() => handlePublish(blogDetails.id)}
              >
                <CheckOutlineIcon style={iconStyles} /> Publish
              </span>
            ) : (
              <span
                style={{
                  marginRight: "20px",
                  backgroundColor: "rgb(76,176,51)",
                  borderRadius: "10px",
                  padding: "7px",
                }}
              >
                Published
              </span>
            )}
            <span style={{ cursor: "pointer" }} onClick={handleShow} e>
              <EditIcon style={iconStyles} /> Edit
            </span>
          </div>
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
          <Modal.Title>Modal heading</Modal.Title>
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
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default blogDetails;
