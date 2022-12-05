import React from "react";
import { useSelector } from "react-redux";
import { Modal, Button, Placeholder } from "rsuite";

const BlogModal = ({ open, handleClose }) => {
  const { blogDetails } = useSelector((state) => state.blogState);
  console.log("single blog", blogDetails);

  return (
    <Modal open={open} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>Modal Title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Placeholder.Paragraph />
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
