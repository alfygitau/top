import React from "react";

const Modal = () => {
  return (
    <div>
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
      <Modal open={openView} onClose={handleViewClose}>
        <Modal.Header>
          <Modal.Title>Blog Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{blog?.title}</h4>
          <h6>Description</h6>
          {blog?.keywords}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleViewClose} appearance="primary">
            Ok
          </Button>
          <Button onClick={handleViewClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Modal;
