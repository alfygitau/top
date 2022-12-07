import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Placeholder, Loader } from "rsuite";
import EditIcon from "@rsuite/icons/Edit";
import ModalContext from "./ModalContext";
import { publishBlog, updateBlog } from "dataStore/actions/blogAction";

const BlogModal = ({ open, handleClose, setValue, setOpenBlog, rows }) => {
  const dispatch = useDispatch();
  const [openUpdate, setOpenUpdate] = useState(false);
  const { blogDetails, isLoading, isSuccess } = useSelector(
    (state) => state.blogState
  );
  console.log("single blog", blogDetails);
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
    console.log(value);
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
  };

  const blogStyles = {
    width: "80%",
    margin: "auto",
    height: "70%",
  };

  const iconStyles = {
    marginRight: "15px",
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
      >
        <Modal.Header>
          <Modal.Title>
            {blogDetails.id}:{blogDetails.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{blogDetails.keywords}</p>
          <div dangerouslySetInnerHTML={{ __html: blogDetails.blog_text }} />
        </Modal.Body>
        <Modal.Footer
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="buttons">
            <EditIcon style={iconStyles} onClick={() => setOpenUpdate(true)} />
            {blogDetails.status === "pending" && (
              <Button onClick={() => handlePublishBlog(blogDetails.id)}>
                Publish Blog
              </Button>
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
      <ModalContext
        open={openUpdate}
        handleClose={handleUpdateClose}
        hadleClick={(e) => handleUpdateSubmit(e, blogDetails.id)}
        handleInputChange={handleUpdateChange}
        blog={blogDetails}
        editValue={instructions}
        button="Update"
        main_title="Update Blog"
        onEditorChange={handleInstructionsChange}
        handleInit={handleInit}
      />
    </>
  );
};

export default BlogModal;
