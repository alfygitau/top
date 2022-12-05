import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { BoxLoading } from "react-loadingg";
import { toast, ToastContainer } from "react-toastify";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Grid,
  Input,
  Nav,
  Panel,
  Row,
  Tag,
  Uploader,
} from "rsuite";
import {
  deleteOrderFile,
  fileUpload,
  getOrder,
  getOrderfiles,
  getRejectedOrders,
  getRejectReasons,
} from "dataStore/actions/ordersAction";
import { formatDate, formatDeadline } from "../../../utils/dates";
import DetailIcon from "@rsuite/icons/Detail";
import { css } from "@emotion/css";
import ScrollToBottom from "react-scroll-to-bottom";
import AttachmentIcon from "@rsuite/icons/Attachment";
import {
  createMessage,
  filterMessages,
} from "dataStore/actions/messagesAction";
import dayjs from "dayjs";

const CancelledRejectedDetails = ({ section }) => {
  const [open, setOpen] = React.useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadFiles, setUploadFiles] = useState({
    order_id: "",
    user_id: "",
    uploaded_files: [
      {
        content_type: "",
        data: "",
      },
    ],
  });
  const [message, setMessage] = useState({
    sender_id: "",
    message: "",
    receiver_id: "",
    order_number: "",
  });
  const [active, setActive] = React.useState("1");
  const [messageInfo, setMessageInfo] = useState([]);
  const messageSelector = useSelector((state) => state.messageState);
  const { messages } = messageSelector;
  const newMessages = [...messages];
  const orderSelector = useSelector((state) => state.orderState);
  const {
    isLoading: orderLoading,
    order_files,
    order: {
      id: orderId,
      order_number,
      topic,
      phone,
      deadline,
      service,
      user,
      type,
      style,
      source,
      subject,
      language,
      page,
      level,
      spacing,
      urgency,
      amount,
      created_at,
      reject_details,
    },
  } = orderSelector;

  const router = useRouter();
  const { orderID } = router.query;
  const dispatch = useDispatch();
  const uploaderRef = React.useRef();

  const ROOT_CSS = css({
    minHeight: 100,
    height: 200,
  });

  const handleCreateMessageChange = (value, event) => {
    setMessage({
      ...message,
      message: event.target.value,
    });
  };

  const handleCreateMessageSubmit = () => {
    const { id: userID } = JSON.parse(localStorage.currentUser);
    const bodyData = {
      sender_id: userID,
      message: message.message,
      receiver_id: 7,
      order_number: order_number,
    };
    console.log(bodyData);
    if (bodyData.message !== "") {
      createMessage(dispatch, bodyData).then((response) => {
        newMessages.splice(0, 0, response.data);
        setMessageInfo(newMessages);
        setMessage({
          ...message,
          message: "",
        });
      });
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader?.readAsDataURL(file.blobFile);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUploadChange = async (file) => {
    localStorage.file = file[file.length - 1].name;
    const extension = file[file.length - 1]?.name.slice(
      file[file.length - 1].name.lastIndexOf(".") + 1
    );
    const fileBase64 = await convertToBase64(file[file.length - 1]);
    const Base64 = fileBase64.slice(fileBase64.indexOf(",") + 1).trim();
    console.log(Base64);
    if (extension && fileBase64 && orderId) {
      const { id: userID } = JSON.parse(localStorage.currentUser);
      setUploadFiles({
        ...uploadFiles,
        order_id: orderId,
        user_id: userID,
        uploaded_files: [
          {
            content_type: extension,
            data: Base64,
          },
        ],
      });
    }
  };

  const handleFileUploadSubmit = () => {
    uploaderRef.current.start();
    fileUpload(dispatch, uploadFiles).then((response) => {
      console.log(response);
      if (response.status === 201) {
        getOrderfiles(dispatch, orderID);
        toast.success("File uploaded Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };

  const handleOrderFileDelete = (order_file) => {
    deleteOrderFile(dispatch, order_file.id);
  };

  useEffect(() => {
    getOrder(dispatch, orderID);
    getOrderfiles(dispatch, orderID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, orderID, uploadFiles.uploaded_files]);

  useEffect(() => {
    const { id: userId } = JSON.parse(localStorage.currentUser);
    getRejectedOrders(dispatch, userId, 1, 10);
  }, [dispatch]);

  useEffect(() => {
    filterMessages(dispatch, order_number).then((response) => {
      if (response.status === 200) setMessageInfo(response.data);
    });
  }, [dispatch, order_number, message.message]);

  useEffect(() => {
    getRejectReasons(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setUploadedFileName(localStorage.file);
  }, [uploadFiles.uploaded_files, uploaderRef]);

  return (
    <div style={{ marginTop: "20px" }}>
      <div>
        <h5>Order Details</h5>
      </div>
      <Divider />
      <Nav
        activeKey={active}
        style={{ marginLeft: "20px", marginTop: "-20px", fontSize: "20px" }}
      >
        <Nav.Item
          onClick={() => {
            setOpen(true);
            setUploadOpen(false);
            setMessageOpen(false);
            setDownloadOpen(false);
            setActive("1");
          }}
          eventKey="1"
          icon={<AttachmentIcon />}
        >
          Order Details
        </Nav.Item>
        <Nav.Item
          onClick={() => {
            setUploadOpen(true);
            setOpen(false);
            setMessageOpen(false);
            setDownloadOpen(false);
            setActive("2");
          }}
          eventKey="2"
          icon={<DetailIcon />}
        >
          Attach Files
        </Nav.Item>
        <Nav.Item
          onClick={() => {
            setMessageOpen(true);
            setOpen(false);
            setUploadOpen(false);
            setDownloadOpen(false);
            setActive("3");
          }}
          eventKey="3"
          icon={<DetailIcon />}
        >
          Messages
        </Nav.Item>
        <Nav.Item
          onClick={() => {
            setDownloadOpen(true);
            setOpen(false);
            setUploadOpen(false);
            setMessageOpen(false);
            setActive("4");
          }}
          eventKey="4"
          icon={<DetailIcon />}
        >
          Revision Instructions
        </Nav.Item>
      </Nav>
      {uploadOpen && (
        <div>
          {orderLoading && <BoxLoading />}
          <ToastContainer />
          <Grid fluid>
            <Row>
              <Col xs={24} sm={24} md={24}>
                <div style={{ padding: "10px" }}>
                  <h4>*Uploads one file at a time</h4>
                  <Uploader
                    listType="picture-text"
                    ref={uploaderRef}
                    value={uploadFiles}
                    autoUpload={false}
                    removable={uploadFiles.length >= 2 && true}
                    onChange={(file) => handleFileUploadChange(file)}
                    fileListVisible={false}
                  >
                    <div
                      style={{
                        width: "100%",
                        background: "#EAEEF3",
                        lineHeight: "100px",
                      }}
                    >
                      Click or Drag a file to this area to upload
                    </div>
                  </Uploader>
                  {uploadedFileName && (
                    <h4>Uploaded File: {uploadedFileName}</h4>
                  )}
                  <Divider />
                  <Button
                    style={{ width: "100%" }}
                    color="green"
                    appearance="primary"
                    onClick={handleFileUploadSubmit}
                  >
                    Start Upload
                  </Button>
                </div>
                <Panel>
                  {order_files.length > 0 && (
                    <div>
                      <h6>Uploaded files</h6>
                      <table style={styles.table}>
                        <tr style={{ background: "#fdaa8f" }}>
                          <th style={{ padding: "10px", textAlign: "left" }}>
                            File Name
                          </th>
                          <th>Uploaded At</th>
                        </tr>
                        {order_files &&
                          order_files.map((order_file) => (
                            <tr style={{ borderRadius: "10px" }}>
                              <td style={styles.table.td}>
                                <strong>
                                  <Avatar
                                    style={{ background: "#17c671" }}
                                    circle
                                    size="sm"
                                  >
                                    TRP
                                  </Avatar>
                                  {"     "}
                                  {order_file.attached}
                                </strong>
                              </td>
                              <td style={styles.table.tdx}>
                                <Button
                                  color="red"
                                  onClick={() =>
                                    handleOrderFileDelete(order_file)
                                  }
                                  appearance="primary"
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
                      </table>
                    </div>
                  )}
                </Panel>
              </Col>
            </Row>
          </Grid>
        </div>
      )}
      {open && (
        <Grid fluid>
          <Row>
            <Col xs={24} sm={24} md={24}>
              <Panel style={{ marginTop: "-10px" }}>
                <div
                  style={{
                    background: "#fdaa8f",
                    height: "40px",
                    padding: "10px",
                  }}
                >
                  <h5>Order #{order_number}</h5>
                </div>
                <table style={styles.table}>
                  <tbody>
                    <tr style={{ borderRadius: "10px" }}>
                      <td style={styles.table.td}>
                        <strong>Order Number</strong>
                      </td>
                      <td style={styles.table.tdx}>{order_number}</td>
                      <td style={styles.table.td}>
                        <strong>Client</strong>
                      </td>
                      <td style={styles.table.tdx}>{user && user.username}</td>
                    </tr>
                    <tr>
                      <td style={styles.table.td}>
                        <b>Service</b>
                      </td>
                      <td style={styles.table.td}>{service && service.name}</td>
                      <td style={styles.table.td}>
                        <b>Type of Paper</b>
                      </td>
                      <td style={styles.table.td}>{type && type.name}</td>
                    </tr>
                    <tr>
                      <td style={styles.table.td}>
                        <b>Spacing</b>
                      </td>
                      <td style={styles.table.td}>{spacing && spacing.name}</td>
                      <td style={styles.table.td}>
                        <b>Urgency</b>
                      </td>
                      <td style={styles.table.td}>{urgency && urgency.name}</td>
                    </tr>
                    <tr>
                      <td style={styles.table.td}>
                        <b>Pages</b>
                      </td>
                      <td style={styles.table.td}>{page && page.name}</td>
                      <td style={styles.table.td}>
                        <b>Level</b>
                      </td>
                      <td style={styles.table.td}>{level && level.name}</td>
                    </tr>
                    <tr>
                      <td style={styles.table.td}>
                        <b>Subject</b>
                      </td>
                      <td style={styles.table.td}>{subject && subject.name}</td>
                      <td style={styles.table.td}>
                        <b>Style</b>
                      </td>
                      <td style={styles.table.td}>{style && style.name}</td>
                    </tr>
                    <tr>
                      <td style={styles.table.td}>
                        <b>Sources</b>
                      </td>
                      <td style={styles.table.td}>{source && source.name}</td>
                      <td style={styles.table.td}>
                        <b>Language</b>
                      </td>
                      <td style={styles.table.td}>
                        {language && language.name}
                      </td>
                    </tr>
                    <tr>
                      <td style={styles.table.td}>
                        <b>Phone</b>
                      </td>
                      <td style={styles.table.td} colSpan="3">
                        {phone}
                      </td>
                    </tr>
                    <tr>
                      <td style={styles.table.td}>
                        <b>Topic</b>
                      </td>
                      <td style={styles.table.td} colSpan="3">
                        {topic}
                      </td>
                    </tr>
                    <tr>
                      <td style={styles.table.td}>
                        <b>Deadline</b>
                      </td>
                      <td style={styles.table.td} colSpan="3">
                        {formatDeadline(deadline)}
                      </td>
                    </tr>
                    <tr>
                      <td style={styles.table.td}>
                        <b>Created At</b>
                      </td>
                      <td style={styles.table.td} colSpan="3">
                        {formatDate(created_at)}
                      </td>
                    </tr>
                    <tr>
                      <td style={styles.table.td}>
                        <b>Amount</b>
                      </td>
                      <td style={styles.table.td} colSpan="3">
                        {amount}
                      </td>
                    </tr>
                    <tr>
                      <td style={styles.table.td}>
                        <b>Rejected</b>
                      </td>
                      <td style={styles.table.td} colSpan="3">
                        <span style={{ color: "red" }}>
                          {reject_details?.description}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Panel>
            </Col>
          </Row>
        </Grid>
      )}
      {messageOpen && (
        <div>
          <Panel>
            <h5>Order Messages</h5>
            <div
              id="messages"
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "2px solid #98b9b6",
              }}
            >
              <ScrollToBottom className={ROOT_CSS}>
                {messageInfo.length === 0 && (
                  <center>
                    <h5 style={{ marginTop: "20px" }}>No order messages</h5>
                  </center>
                )}
                {messageInfo
                  ?.map((message) => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {message.receiver_id === 7 ? (
                        <div style={{ marginBottom: "15px" }}>
                          <Tag
                            style={{
                              width: "300px",
                              color: "black",
                              borderRadius: "15px",
                              background: "whitesmoke",
                              padding: "10px",
                            }}
                          >
                            {message.message}
                            <br />
                            <p style={{ float: "right" }}>
                              {dayjs(message.created_at).format("L LT")}
                            </p>
                          </Tag>
                        </div>
                      ) : (
                        <div />
                      )}
                      {message.receiver_id !== 7 && (
                        <Tag
                          style={{
                            width: "300px",
                            margin: "10px",
                            color: "white",
                            borderRadius: "15px",
                            background: "#6da8a2",
                            padding: "10px",
                          }}
                        >
                          {message.message}
                          <br />
                          <p style={{ float: "right" }}>
                            {dayjs(message.created_at).format("L LT")}
                          </p>
                        </Tag>
                      )}
                    </div>
                  ))
                  .reverse()}
              </ScrollToBottom>
            </div>
          </Panel>
          <Panel>
            <Input
              onChange={handleCreateMessageChange}
              value={message.message}
              style={{ border: "2px solid #6da8a2", padding: "20px" }}
              placeholder="Enter message"
            />
            <br />
            <Button
              onClick={handleCreateMessageSubmit}
              color="blue"
              appearance="primary"
            >
              Send
            </Button>
          </Panel>
        </div>
      )}
      {downloadOpen && (
        <Panel>
          <table style={styles.table}>
            <tr style={{ borderRadius: "10px" }}>
              <th style={styles.table.th}>Order Number</th>
              <th style={styles.table.th}>Instructions</th>
              <th style={styles.table.th}>Date</th>
            </tr>
            <tr>
              <td style={styles.table.td}>{reject_details?.order_number}</td>
              <td style={styles.table.td}>{reject_details?.description}</td>
              <td style={styles.table.td}>
                {formatDate(reject_details?.created_at)}
              </td>
            </tr>
          </table>
        </Panel>
      )}
    </div>
  );
};

export default CancelledRejectedDetails;
const styles = {
  table: {
    borderCollapse: "collapse",
    width: "100%",
    td: {
      fontFamily: "Quicksand, sans-serif",
      border: "1px solid #dddddd",
      textAlign: "left",
      fontSize: "18px",
      padding: "8px",
    },
    th: {
      border: "1px solid #dddddd",
      textAlign: "left",
      padding: "8px",
      background: "#fdaa8f",
    },
    tdx: {
      fontFamily: "Quicksand, sans-serif",
      border: "1px solid #dddddd",
      textAlign: "left",
      fontSize: "18px",
      padding: "8px",
      color: "#333333",
    },
  },
};
const textStyle = {
  verticalAlign: "top",
  lineHeight: "42px",
  display: "inline-block",
};
const texts = {
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};
