import { getBlog, UploadBlogImages } from "dataStore/actions/blogAction";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Placeholder, Loader } from "rsuite";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogModal = ({ open, handleClose, setOpenBlog }) => {
  const dispatch = useDispatch();
  const { createdBlog, isLoading } = useSelector((state) => state.blogState);
  const inputRef = useRef();

  const blogStyles = {
    width: "85%",
    margin: "auto",
    height: "70%",
  };

  console.log(createdBlog);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });

  const handleUploadImages = (e) => {
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
        top_article_id: createdBlog.id,
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
          getBlog(dispatch, createdBlog.slug);
          toast.success("File uploaded Successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setOpenBlog(false);
        }
      });
    } catch (error) {
      toast.error("File not uploaded Successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose} style={blogStyles}>
        <Modal.Header>
          <Modal.Title>Upload Files/images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ textDecoration: "underline" }}>Images/Uploads</p>
          {createdBlog?.assets?.map((asset) => (
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
                  onClick={() => handleDeleteBlogFile(createdBlog.id, asset.id)}
                />
              </div>
            </div>
          ))}
          <p style={{ textDecoration: "underline" }}>Upload multiple images</p>
          <form onSubmit={(e) => handleUploadImages(e, createdBlog.id)}>
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
      <ToastContainer/>
    </>
  );
};

export default BlogModal;
