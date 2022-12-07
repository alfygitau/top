import React from "react";
import { useSelector } from "react-redux";
import { Modal, Button, Placeholder } from "rsuite";

const BlogModal = ({ open, handleClose }) => {
  const { blogDetails } = useSelector((state) => state.blogState);
  console.log("single blog", blogDetails);

  const blogStyles = {
    width: "80%",
    margin: "auto",
  };

  return (
    <Modal open={open} onClose={handleClose} style={blogStyles}>
      <Modal.Header>
        <Modal.Title>
          {blogDetails.id}:{blogDetails.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{blogDetails.keywords}</p>
        <div dangerouslySetInnerHTML={{ __html: blogDetails.blog_text }} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose} appearance="primary">
          Ok
        </Button>
        <Button onClick={handleClose} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BlogModal;
