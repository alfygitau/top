import React from "react";
import { Modal, Button, ButtonToolbar, Placeholder } from "rsuite";

const EditModal = ({
  open,
  handleClose,
  hadleClick,
  handleInputChange,
  blog,
  onEditorChange,
}) => {
  return (
    <div>
      <Modal size="md" open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Update Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box as="form" onSubmit={hadleClick}>
            <Label htmlFor="email">Title</Label>
            <Input
              id="title"
              name="title"
              value={blog.title}
              onChange={handleInputChange}
            />
            <Label htmlFor="Blog_Keywords">Blog Keywords</Label>
            <Input
              id="keywords"
              name="keywords"
              value={blog.keywords}
              onChange={handleInputChange}
            />
            <Label htmlFor="Blog_content">Blog Content</Label>
            <Editor
              apiKey="jm5weuex99fz17qyiv457ia53e6ignpzdupkd8vpszcywnoo"
              initialValue={""}
              value={blog.blog_text}
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
              onEditorChange={onEditorChange}
            />
            <Button type="submit" style={{ marginTop: "10px" }}>
              Update Blog
            </Button>
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditModal;
