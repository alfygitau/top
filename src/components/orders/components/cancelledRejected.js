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
      instructions,
      created_at,
      cancel_details,
    },
  } = orderSelector;
  console.log(orderSelector);

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
            setDownloadOpen(true);
            setOpen(false);
            setUploadOpen(false);
            setMessageOpen(false);
            setActive("4");
          }}
          eventKey="4"
          icon={<DetailIcon />}
        >
          Cancellation reasons
        </Nav.Item>
      </Nav>
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
                        $ &nbsp;{amount?.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td style={styles.table.td}>
                        <b>Cancellation reasons</b>
                      </td>
                      <td style={styles.table.td} colSpan="3">
                        <span style={{ color: "red" }}>
                          {cancel_details?.description}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="instructions">
                  <h6
                    style={{ marginTop: "20px", textDecoration: "underline" }}
                  >
                    Order Instructions
                  </h6>
                  <div
                    style={{
                      borderRadius: "10px",
                      border: "1px solid grey",
                      padding: "10px 20px",
                    }}
                  >
                    <div dangerouslySetInnerHTML={{ __html: instructions }} />
                  </div>
                </div>
              </Panel>
            </Col>
          </Row>
        </Grid>
      )}
      {downloadOpen && (
        <Panel>
          <table style={styles.table}>
            <tr style={{ borderRadius: "10px" }}>
              <th style={styles.table.th}>Order Number</th>
              <th style={styles.table.th}>Cancel Reasons</th>
              <th style={styles.table.th}>Date</th>
            </tr>
            <tr>
              <td style={styles.table.td}>{cancel_details?.order_number}</td>
              <td style={styles.table.td}>{cancel_details?.description}</td>
              <td style={styles.table.td}>
                {formatDate(cancel_details?.created_at)}
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
