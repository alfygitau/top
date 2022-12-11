import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Placeholder, Loader } from "rsuite";
import EditIcon from "@rsuite/icons/Edit";
import CheckOutlineIcon from "@rsuite/icons/CheckOutline";
import ModalContext from "./ModalContext";
import { Box, Input, Label } from "theme-ui";
import { publishBlog, updateBlog } from "dataStore/actions/blogAction";
import { Editor } from "@tinymce/tinymce-react";

const BlogModal = ({ open, handleClose, setValue, setOpenBlog }) => {
  const dispatch = useDispatch();
  const [rows, setRows] = React.useState(0);
  const [openUpdate, setOpenUpdate] = useState(false);
  const { blogDetails } = useSelector((state) => state.blogState);
  const handleUpdateClose = () => setOpenUpdate(false);
  const [instructions, setInstructions] = useState(blogDetails.blog_text);

  const [updateDetails, setUpdateDetails] = useState({
    title: blogDetails.title,
    keywords: blogDetails.keywords,
  });

  const handleInit = (evt, editor) => {
    // setLength(editor.getContent({ format: 'text' }).length);
  };

  const handleInstructionsChange = (value, editor) => {
    setInstructions(value);
  };

  const handleUpdateChange = (event) => {
    event.persist();
    event.preventDefault();
    let name = event.target.name;
    let value = event.target.value;
    setUpdateDetails({
      ...updateDetails,
      [name]: value,
    });
  };

  const handleUpdateSubmit = async (event, articleID) => {
    event.persist();
    event.preventDefault();
    const bodyData = {
      title: updateDetails.title,
      blog_text: instructions,
      keywords: updateDetails.keywords,
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

  const handlePublishBlog = (blogId) => {
    publishBlog(dispatch, blogId);
    setOpenUpdate(false);
    setOpenBlog(false);
    setValue("active");
  };

  const handleEntered = () => {
    setTimeout(() => setRows(80), 2000);
  };

  const blogStyles = {
    width: "85%",
    margin: "auto",
    height: "70%",
  };

  const iconStyles = {
    marginRight: "5px",
    fontSize: "20px",
    cursor: "pointer",
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        style={blogStyles}
        overflow={true}
        onEntered={handleEntered}
        onExited={() => {
          setRows(0);
        }}
      >
        <Modal.Header>
          {rows ? (
            <Modal.Title>
              {blogDetails.id}:{blogDetails.title}
            </Modal.Title>
          ) : (
            <Placeholder.Paragraph />
          )}
        </Modal.Header>
        <Modal.Body>
          {rows ? (
            <>
              <p>{blogDetails.keywords}</p>
              <div
                dangerouslySetInnerHTML={{ __html: blogDetails.blog_text }}
              />
            </>
          ) : (
            <div style={{ textAlign: "center" }}>
              <Loader size="md" />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="buttons">
            <span
              style={{ marginRight: "20px", cursor: "pointer" }}
              onClick={() => setOpenUpdate(true)}
            >
              <EditIcon style={iconStyles} /> Edit
            </span>
            {blogDetails.status === "pending" && (
              <span
                onClick={() => handlePublishBlog(blogDetails.id)}
                style={{ cursor: "pointer" }}
              >
                <CheckOutlineIcon style={iconStyles} />
                Publish Blog
              </span>
            )}
          </div>
          <div className="btn">
            <Button onClick={handleClose} appearance="primary">
              Ok
            </Button>
            <Button onClick={handleClose} appearance="subtle">
              Cancel
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      <Modal
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
                value={updateDetails.title}
                onChange={handleUpdateChange}
              />
              <Label htmlFor="keywords">Blog Keywords</Label>
              <Input
                id="keywords"
                name="keywords"
                value={updateDetails.keywords}
                onChange={handleUpdateChange}
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
      </Modal>
    </>
  );
};

export default BlogModal;
