import { useRouter } from "next/router";
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

const blogDetails = ({ section }) => {
  // bootstrap
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const { blogDetails, isLoading } = useSelector((state) => state.blogState);
  console.log(blogDetails);

  const [rows, setRows] = React.useState(0);
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleUpdateClose = () => setOpenUpdate(false);
  const [instructions, setInstructions] = useState(blogDetails.blog_text);
  const [title, setTitle] = useState(blogDetails.title);
  const [keywords, setKeywords] = useState(blogDetails.keywords);

  const router = useRouter();
  const { blogId } = router.query;

  const handleInit = (evt, editor) => {
    // setLength(editor.getContent({ format: 'text' }).length);
  };
  const handleEntered = () => {
    setTimeout(() => setRows(80), 2000);
  };

  // const reload = () => window.location.reload();

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
          setOpenUpdate(false);
          setOpenBlog(false);
          setValue("active");
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
    padding: "20px",
    width: "70%",
  };

  const iconStyles = {
    marginRight: "5px",
    fontSize: "20px",
    cursor: "pointer",
  };

  const handlePublish = (id) => {
    publishBlog(dispatch, id);
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
        <div style={detailsStyles}>
          <h1>{blogId}:Blog Details</h1>
          <h3>{blogDetails.title}</h3>
          <p>{blogDetails.keywords}</p>
          <div dangerouslySetInnerHTML={{ __html: blogDetails.blog_text }} />
          <div className="buttons" style={{ marginTop: "20px" }}>
            <span
              style={{ marginRight: "30px", cursor: "pointer" }}
              onClick={() => handlePublish(blogId)}
            >
              <CheckOutlineIcon style={iconStyles} /> Publish
            </span>
            <span style={{ cursor: "pointer" }} onClick={handleShow} e>
              <EditIcon style={iconStyles} /> Edit
            </span>
          </div>
        </div>
      )}
      {/* <Modal
        open={openUpdate}
        onClose={handleUpdateClose}
        size="md"
        onEntered={handleEntered}
        onExited={() => {
          setRows(0);
        }}
      >
        <Modal.Header>
          <Modal.Title>Update Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {rows ? (
            <Box as="form" onSubmit={handleUpdateSubmit}>
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
              <Label htmlFor="Blog_content">Blog Content</Label>
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
            </Box>
          ) : (
            <div style={{ textAlign: "center" }}>
              <Loader size="md" />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleUpdateClose} appearance="subtle">
            Cancel
          </Button>
          <Button onClick={handleUpdateClose} appearance="primary">
            Ok
          </Button>
        </Modal.Footer>
      </Modal> */}

      {/* bootstrap modal */}
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
          <form>
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
    </>
  );
};

export default blogDetails;
