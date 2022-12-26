import { Loader, Modal } from "rsuite";
import { Box, Input, Label } from "theme-ui";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "rsuite";

const ModalContext = (props) => {
  const [rows, setRows] = React.useState(0);
  const {
    open,
    handleClose,
    hadleClick,
    handleInputChange,
    blog,
    button,
    main_title,
    onEditorChange,
    handleInit,
    editValue,
  } = props;

  const blogStyles = {
    width: "85%",
    margin: "auto auto",
  };

  const handleEntered = () => {
    setTimeout(() => setRows(80), 2000);
  };

  return (
    <Modal
      size="md"
      open={open}
      onClose={handleClose}
      onEntered={handleEntered}
      onExited={() => {
        setRows(0);
      }}
    >
      <Modal.Header>
        <Modal.Title>{main_title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {rows ? (
          <Box as="form" onSubmit={hadleClick}>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={blog.title}
              onChange={handleInputChange}
            />
            <Label htmlFor="keywords">Blog Keywords</Label>
            <Input
              id="keywords"
              name="keywords"
              value={blog.keywords}
              onChange={handleInputChange}
            />
            <Label htmlFor="Blog_content">Blog Content</Label>
            <Editor
              apiKey="jm5weuex99fz17qyiv457ia53e6ignpzdupkd8vpszcywnoo"
              value={editValue}
              onInit={handleInit}
              init={{
                height: 250,
                language: "en_US",
                menubar: false,
                link_quicklink: true,
                link_assume_external_targets: true,
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
            <Button
              type="submit"
              style={{ marginTop: "10px" }}
              appearance="primary"
            >
              {button}
            </Button>
          </Box>
        ) : (
          <div style={{ textAlign: "center" }}>
            <Loader size="md" />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalContext;
