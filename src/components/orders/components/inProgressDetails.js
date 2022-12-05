import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { BoxLoading } from "react-loadingg";
import { ToastContainer, toast } from "react-toastify";
import {
  Panel,
  Divider,
  Uploader,
  Button,
  Input,
  Modal,
  Nav,
  Grid,
  Row,
  Col,
  Avatar,
  Tag,
} from "rsuite";
import {
  fileUpload,
  getOrder,
  getOrderfiles,
  deleteOrderFile,
} from "dataStore/actions/ordersAction";
import { formatDate, formatDeadline } from "../../../utils/dates";
import { Editor } from "@tinymce/tinymce-react";
import ContentEditable from "react-contenteditable";
import DetailIcon from "@rsuite/icons/Detail";
import AttachmentIcon from "@rsuite/icons/Attachment";
import { getLevels } from "../../../dataStore/actions/levelsAction";
import { getPages } from "../../../dataStore/actions/pagesAction";
import { getSources } from "../../../dataStore/actions/sourcesAction";
import { getStyles } from "../../../dataStore/actions/stylesAction";
import { getSubjects } from "../../../dataStore/actions/subjectsAction";
import { getTypes } from "../../../dataStore/actions/typesAction";
import { getUrgencies } from "../../../dataStore/actions/urgenciesAction";
import { getServices } from "../../../dataStore/actions/servicesAction";
import { getLanguages } from "../../../dataStore/actions/languagesAction";
import { getSpacing } from "../../../dataStore/actions/spacingsAction";
import {
  createMessage,
  filterMessages,
} from "../../../dataStore/actions/messagesAction";
import ScrollToBottom from "react-scroll-to-bottom";
import { css } from "@emotion/css";

const InProgressDetails = ({ section }) => {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [openOrderDetails, setOpenOrderDetails] = useState(true);
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState([]);
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

  const [active, setActive] = React.useState("2");
  const router = useRouter();
  const { inprogressID } = router.query;
  const dispatch = useDispatch();
  const uploaderRef = React.useRef();

  const orderSelector = useSelector((state) => state.orderState);
  const {
    isLoading: orderLoading,
    order_files,
    order: {
      id: orderId,
      order_number,
      topic,
      phone,
      instructions,
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
    },
  } = orderSelector;

  const formattedInstructruction = instructions?.trim().slice(2).slice(0, -2);
  const walletSelector = useSelector((state) => state.walletState);
  const { isLoading } = walletSelector;
  const messageSelector = useSelector((state) => state.messageState);
  const { messages } = messageSelector;
  const newMessages = [...messages];

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
      console.log(file);
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
    try {
      localStorage.file = file[file?.length - 1].name;
      const extension = file[file.length - 1]?.name.slice(
        file[file.length - 1].name.lastIndexOf(".") + 1
      );
      const fileBase64 = await convertToBase64(file[file?.length - 1]);
      const Base64 = fileBase64.slice(fileBase64.indexOf(",") + 1).trim();
      const { id: userID } = JSON.parse(localStorage.currentUser);
      const objectData = {
        order_id: orderId,
        user_id: userID,
        uploaded_files: [
          {
            content_type: extension,
            data: Base64,
          },
        ],
      };
      uploaderRef.current.start();
      await fileUpload(dispatch, objectData).then((response) => {
        console.log(response);
        if (response.status === 201) {
          getOrderfiles(dispatch, inprogressID);
          toast.success("File uploaded Successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
    } catch (error) {
      toast.error("File not uploaded Successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleOrderFileDelete = (order_file) => {
    deleteOrderFile(dispatch, order_file.id);
  };

  React.useEffect(() => {
    getOrder(dispatch, inprogressID);
    getOrderfiles(dispatch, inprogressID);
  }, [dispatch, inprogressID, uploadFiles.uploaded_files]);

  React.useEffect(() => {
    getLevels(dispatch);
    getPages(dispatch);
    getSources(dispatch);
    getStyles(dispatch);
    getSubjects(dispatch);
    getTypes(dispatch);
    getUrgencies(dispatch);
    getServices(dispatch);
    getLanguages(dispatch);
    getSpacing(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    filterMessages(dispatch, order_number);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, order_number, message.message]);

  useEffect(() => {
    setUploadedFileName(localStorage.file);
  }, [uploadFiles.uploaded_files, uploaderRef]);

  const CustomNav = ({ active, onSelect, ...props }) => {
    return (
      <Nav
        {...props}
        activeKey={active}
        style={{ marginLeft: "20px", marginTop: "-20px", fontSize: "20px" }}
      >
        <Nav.Item
          onClick={() => {
            setUploadOpen(true);
            setActive("1");
            setOpenOrderDetails(false);
            setMessageOpen(false);
          }}
          eventKey="1"
          icon={<AttachmentIcon />}
        >
          Attach files
        </Nav.Item>
        <Nav.Item
          onClick={() => {
            setUploadOpen(false);
            setActive("2");
            setOpenOrderDetails(true);
            setMessageOpen(false);
          }}
          eventKey="2"
          icon={<DetailIcon />}
        >
          Order Details
        </Nav.Item>
        <Nav.Item
          onClick={() => {
            setUploadOpen(false);
            setActive("3");
            setMessageOpen(true);
            setOpenOrderDetails(false);
          }}
          eventKey="3"
          icon={<DetailIcon />}
        >
          Messages
        </Nav.Item>
      </Nav>
    );
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "10px",
          marginRight: "20px",
        }}
      >
        <h4>Order Details</h4>
      </div>
      <Divider />
      <CustomNav appearance="tabs" active={active} onSelect={setActive} />
      {uploadOpen && (
        <div>
          {orderLoading && <BoxLoading />}
          <ToastContainer />
          <Grid fluid>
            <Row>
              <Col xs={24} sm={24} md={24}>
                <div style={{ padding: "10px" }}>
                  <Uploader
                    listType="picture-text"
                    ref={uploaderRef}
                    value={uploadFiles}
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
                  <Divider />
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
      {openOrderDetails && (
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
                  <tr style={{ borderRadius: "10px" }}>
                    <td style={styles.table.td}>
                      <strong>Order Number</strong>
                    </td>
                    <td style={styles.table.tdx}>{order_number}</td>
                    <td style={styles.table.td}>
                      <b>Subject</b>
                    </td>
                    <td style={styles.table.td}>{subject && subject.name}</td>
                  </tr>
                  <tr>
                    <td style={styles.table.td}>
                      <strong>Client</strong>
                    </td>
                    <td style={styles.table.tdx}>{user && user.username}</td>
                    <td style={styles.table.td}>
                      <b>Style</b>
                    </td>
                    <td style={styles.table.td}>{style && style.name}</td>
                  </tr>
                  <tr>
                    <td style={styles.table.td}>
                      <b>Service</b>
                    </td>
                    <td style={styles.table.td}>{service && service.name}</td>
                    <td style={styles.table.td}>
                      <b>Language</b>
                    </td>
                    <td style={styles.table.td}>{language && language.name}</td>
                  </tr>
                  <tr>
                    <td style={styles.table.td}>
                      <b>Sources</b>
                    </td>
                    <td style={styles.table.td}>{source && source.name}</td>
                    <td style={styles.table.td}>
                      <b>Phone</b>
                    </td>
                    <td style={styles.table.td}>{phone}</td>
                  </tr>
                  <tr>
                    <td style={styles.table.td}>
                      <b>Type of Paper</b>
                    </td>
                    <td style={styles.table.td}>{type && type.name}</td>
                    <td style={styles.table.td}>
                      <b>Topic</b>
                    </td>
                    <td style={styles.table.td}>{topic}</td>
                  </tr>
                  <tr>
                    <td style={styles.table.td}>
                      <b>Spacing</b>
                    </td>
                    <td style={styles.table.td}>{spacing && spacing.name}</td>
                    <td style={styles.table.td}>
                      <b>Deadline</b>
                    </td>
                    <td style={styles.table.td}>{formatDeadline(deadline)}</td>
                  </tr>
                  <tr>
                    <td style={styles.table.td}>
                      <b>Urgency</b>
                    </td>
                    <td style={styles.table.td}>{urgency && urgency.name}</td>
                    <td style={styles.table.td}>
                      <b>Amount</b>
                    </td>
                    <td style={styles.table.td}>
                      ${amount && amount.toFixed(2)}
                    </td>
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
                      <b>Instructions</b>
                    </td>
                    <td colSpan="3">
                      <Editor
                        apiKey="jm5weuex99fz17qyiv457ia53e6ignpzdupkd8vpszcywnoo"
                        initialValue={formattedInstructruction}
                        init={{
                          height: 300,
                          language: "en_US",
                          menubar: false,
                          plugins: [
                            "advlist autolink lists link image",
                            "charmap print preview anchor help",
                            "searchreplace visualblocks code",
                            "insertdatetime media table paste wordcount",
                          ],
                          toolbar:
                            "undo redo | formatselect | bold italic | \
                                                    alignleft aligncenter alignright | \
                                                    bullist numlist outdent indent | help",
                        }}
                      />
                    </td>
                  </tr>
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
                              {formatDate(message.created_at)}
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
                            {formatDate(message.created_at)}
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
    </div>
  );
};

export default InProgressDetails;
const styles = {
  table: {
    borderCollapse: "collapse",
    width: "100%",
    td: {
      fontFamily: "Quicksand, sans-serif",
      border: "1px solid #dddddd",
      textAlign: "left",
      fontSize: "16px",
      padding: "8px",
    },
    tdx: {
      fontFamily: "Quicksand, sans-serif",
      border: "1px solid #dddddd",
      textAlign: "left",
      fontSize: "16px",
      padding: "8px",
      color: "#333333",
    },
  },
};
