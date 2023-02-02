import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Editor } from "@tinymce/tinymce-react";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
// import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import { FaDownload } from "react-icons/fa";
import SortDownIcon from "@rsuite/icons/SortDown";
import {
  Avatar,
  Button,
  Col,
  Tag,
  Divider,
  Grid,
  Input,
  Modal,
  Nav,
  Message,
  Panel,
  Rate,
  Row,
  Uploader,
} from "rsuite";
import {
  approveOrder,
  deleteOrderFile,
  fileUpload,
  getCompletedOrderFiles,
  getOrder,
  getOrderfiles,
  getRejectReasons,
  orderRevision,
  rejectOrder,
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

const RejectedDetails = ({ section }) => {
  const [open, setOpen] = React.useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [releaseFundsOpen, setReleaseFundsOpen] = useState(false);
  const [requestRevisionOpen, setRequestRevisionOpen] = useState(false);
  const [reject_reason_value, setRejectReasonValue] = useState(1);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [hoverValue, setHoverValue] = React.useState(5);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const [active, setActive] = React.useState("1");
  const [ratingSuccess, setRatingSuccess] = useState("");
  const [messageInfo, setMessageInfo] = useState([]);
  const messageSelector = useSelector((state) => state.messageState);
  const { messages } = messageSelector;
  const newMessages = [...messages];
  const orderSelector = useSelector((state) => state.orderState);
  const {
    order_files,
    isLoading,
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
      reject_details,
    },
    reject_reasons,
  } = orderSelector;

  const router = useRouter();
  const { rejectedID } = router.query;
  const dispatch = useDispatch();
  const uploaderRef = React.useRef();
  console.log(rejectedID);

  const handleOpen = () => setReleaseFundsOpen(true);
  const handleClose = () => setReleaseFundsOpen(false);
  const handleRevisonOpen = () => setRequestRevisionOpen(true);
  const handleRevisionClose = () => setRequestRevisionOpen(false);
  const handleRejectOpen = () => setRejectOpen(true);
  const handleRejectClose = () => setRejectOpen(false);

  const ROOT_CSS = css({
    minHeight: 100,
    height: 200,
  });

  useEffect(() => {
    getOrder(dispatch, rejectedID);
    getOrderfiles(dispatch, rejectedID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, rejectedID]);

  useEffect(() => {
    getRejectReasons(dispatch);
  }, [dispatch]);

  return (
    <div style={{ marginTop: "20px" }}>
      <div>
        <h4>Order Details</h4>
        {ratingSuccess && (
          <Message type="success" closable>
            {ratingSuccess}
          </Message>
        )}
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
          Rejection reasons
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
                      {amount && amount.toFixed(2)}
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
              <th style={styles.table.th}>Rejection reasons</th>
              <th style={styles.table.th}>Time Uploaded</th>
            </tr>
            <tr>
              <td style={styles.table.td}>{order_number}</td>
              <td style={styles.table.td}>{reject_details.description}</td>
              <td style={styles.table.td}>
                {moment(reject_details.created_at).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )}
              </td>
            </tr>
          </table>
        </Panel>
      )}
    </div>
  );
};

export default RejectedDetails;
const styles = {
  table: {
    borderCollapse: "collapse",
    width: "100%",
    td: {
      fontFamily: "Quicksand, sans-serif",
      border: "1px solid #dddddd",
      textAlign: "left",
      fontSize: "18px",
      padding: "5px",
    },
    th: {
      border: "1px solid #dddddd",
      textAlign: "left",
      padding: "5px",
      background: "#fdaa8f",
    },
    tdx: {
      fontFamily: "Quicksand, sans-serif",
      border: "1px solid #dddddd",
      textAlign: "left",
      fontSize: "18px",
      padding: "5px",
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
