import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
// import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import {
  Panel,
  Divider,
  Uploader,
  Button,
  Input,
  // Modal,
  Message,
  Nav,
  Drawer,
  Grid,
  Row,
  Col,
  Avatar,
  Tag,
} from "rsuite";
import {
  cancelOrder,
  fileUpload,
  getCancelReasons,
  getOrder,
  getOrderfiles,
  payFromWallet,
  updateOrder,
  deleteOrderFile,
} from "dataStore/actions/ordersAction";
import { formatDeadline } from "../../../utils/dates";
import {
  makePayment,
  userWalletSummary,
} from "../../../dataStore/actions/walletAction";
import { BoxLoading } from "react-loadingg";
import { Label, Box } from "theme-ui";
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
import { Editor } from "@tinymce/tinymce-react";
import ScrollToBottom from "react-scroll-to-bottom";
import { css } from "@emotion/css";
import dayjs from "dayjs";

const OrderDetails = ({ section }) => {
  const [open, setOpen] = React.useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [openOrderDetails, setOpenOrderDetails] = useState(true);
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState([]);
  const [cancelReasonValue, setCancelReasonValue] = useState(1);
  const fileInput = React.useRef();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [message, setMessage] = useState({
    sender_id: "",
    message: "",
    receiver_id: "",
    order_number: "",
  });
  const [orderCancelValues, setOrderCancelValues] = useState({
    order_number: "",
    title: "",
    description: "",
  });
  const [active, setActive] = React.useState("2");
  const [selected, setSelected] = React.useState("");
  const [myservice, setmyservice] = React.useState(8);
  const [mytype, setmytype] = React.useState(1.2);
  const [myurgency, setmyurgency] = React.useState(2.5);
  const [mypages, setmypages] = React.useState(1);
  const [mylevel, setmylevel] = React.useState(1);
  const [mystyle, setmystyle] = React.useState(1);
  const [myspacing, setmyspacing] = React.useState(1);
  const [cancelOpen, setCancelOpen] = React.useState(false);

  const router = useRouter();
  const { orderID } = router.query;
  const dispatch = useDispatch();
  const uploaderRef = React.useRef();

  const orderSelector = useSelector((state) => state.orderState);
  const {
    errorMessage,
    isLoading: orderLoading,
    order_files,
    cancelled_reasons,
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

  const [instructionsx, setinstructionsx] = React.useState(instructions);
  console.log(instructionsx);

  const [updateOrderDetails, setUpdateOrderDetails] = useState({
    user_id: "",
    service_id: service?.id,
    type_id: type?.id,
    style_id: style?.id,
    level_id: level?.id,
    pages_id: page?.id,
    urgency_id: urgency?.id,
    subject_id: subject?.id,
    sources_id: source?.id,
    spacing_id: spacing?.id,
    language_id: language?.id,
    phone: phone,
    topic: topic,
    instructions: instructions,
    pagesummary: false,
    plagreport: false,
    initialdraft: false,
    qualitycheck: false,
    topwriter: false,
    promocode: false,
  });

  const walletSelector = useSelector((state) => state.walletState);
  const { isLoading } = walletSelector;
  const reserveSelector = useSelector((state) => state.orderState);
  const { errorMessage: walletError } = reserveSelector;
  const messageSelector = useSelector((state) => state.messageState);
  const { messages } = messageSelector;
  const newMessages = [...messages];

  const levelSelector = useSelector((state) => state.levelState);
  const pageSelector = useSelector((state) => state.pageState);
  const serviceSelector = useSelector((state) => state.serviceState);
  const sourcesSelector = useSelector((state) => state.sourceState);
  const spacingSelector = useSelector((state) => state.spacingState);
  const styleSelector = useSelector((state) => state.styleState);
  const subjectSelector = useSelector((state) => state.subjectState);
  const typeSelector = useSelector((state) => state.typeState);
  const urgencySelector = useSelector((state) => state.urgencyState);
  const languageSelector = useSelector((state) => state.languageState);

  const service_name = service ? service.name : "";
  const subject_name = subject ? subject.name : "";
  const style_name = style ? style.name : "";
  const type_name = type ? type.name : "";
  const urgency_name = urgency ? urgency.name : "";
  const language_name = language ? language.name : "";
  const spacing_name = spacing ? spacing.name : "";
  const page_name = page ? page.name : "";
  const level_name = level ? level.name : "";
  const source_name = source ? source.name : "";

  const ROOT_CSS = css({
    minHeight: 100,
    height: 200,
  });
  const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const handleCancelOpen = () => setCancelOpen(true);
  const handleCancelClose = () => setCancelOpen(false);

  const handleOrderCancelChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setOrderCancelValues({
      ...orderCancelValues,
      [name]: value,
    });
  };

  const handleCancelReasonsChange = (event) => {
    setCancelReasonValue(event.target.value);
  };

  const handleChange = (vauex, event) => {
    let value = event.target.value;
    let name = event.target.name;

    setUpdateOrderDetails((order) => {
      return {
        ...updateOrderDetails, // Spread Operator
        [name]: value,
      };
    });
  };
  const handleInputChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setUpdateOrderDetails((order) => {
      return {
        ...updateOrderDetails, // Spread Operator
        [name]: value,
      };
    });
  };

  const parseStyleSelected = (event) => {
    const valueToParse = event.target.value;
    const style_id_index = Object.values(JSON.parse(valueToParse));
    const style_id = style_id_index[0];
    const itemSelected = JSON.parse(valueToParse);
    setSelected(itemSelected);
    setmystyle(itemSelected.factor);
    setUpdateOrderDetails({
      ...updateOrderDetails,
      [event.target.name]: style_id,
    });
  };

  const parseServiceSelected = (event) => {
    const valueToParse = event.target.value;
    const service_id_index = Object.values(JSON.parse(valueToParse));
    const service_id = service_id_index[0];
    const itemSelected = JSON.parse(valueToParse);
    setSelected(itemSelected);
    setmyservice(itemSelected.factor);
    setUpdateOrderDetails({
      ...updateOrderDetails,
      [event.target.name]: service_id,
    });
  };
  const parseTypeSelected = (event) => {
    const valueToParse = event.target.value;
    const type_id_index = Object.values(JSON.parse(valueToParse));
    const type_id = type_id_index[0];
    const itemSelected = JSON.parse(valueToParse);
    setSelected(itemSelected);
    setmytype(itemSelected.factor);
    setUpdateOrderDetails({
      ...updateOrderDetails,
      [event.target.name]: type_id,
    });
  };
  const parseUrgencySelected = (event) => {
    const valueToParse = event.target.value;
    const urgency_id_index = Object.values(JSON.parse(valueToParse));
    const urgency_id = urgency_id_index[0];
    const itemSelected = JSON.parse(valueToParse);
    setSelected(itemSelected);
    setmyurgency(itemSelected.factor);
    setUpdateOrderDetails({
      ...updateOrderDetails,
      [event.target.name]: urgency_id,
    });
  };
  const parsePageSelected = (event) => {
    const valueToParse = event.target.value;
    const page_id_index = Object.values(JSON.parse(valueToParse));
    const page_id = page_id_index[0];
    const itemSelected = JSON.parse(valueToParse);
    setSelected(itemSelected);
    setmypages(itemSelected.factor);
    setUpdateOrderDetails({
      ...updateOrderDetails,
      [event.target.name]: page_id,
    });
  };
  const parseLevelSelected = (event) => {
    const valueToParse = event.target.value;
    const level_id_index = Object.values(JSON.parse(valueToParse));
    const level_id = level_id_index[0];
    const itemSelected = JSON.parse(valueToParse);
    setSelected(itemSelected);
    setmylevel(itemSelected.factor);
    setUpdateOrderDetails({
      ...updateOrderDetails,
      [event.target.name]: level_id,
    });
  };
  const parseSpacingSelected = (event) => {
    const valueToParse = event.target.value;
    const spacing_id_index = Object.values(JSON.parse(valueToParse));
    const spacing_id = spacing_id_index[0];
    const itemSelected = JSON.parse(valueToParse);
    setSelected(itemSelected);
    setmyspacing(itemSelected.factor);
    setUpdateOrderDetails({
      ...updateOrderDetails,
      [event.target.name]: spacing_id,
    });
  };
  const handleReserveOrder = () => {
    const { id: userID } = JSON.parse(localStorage.currentUser);
    const bodyData = {
      order_number: order_number,
      order_amount: amount,
      user_id: userID,
    };
    makePayment(dispatch, bodyData).then((response) => {
      const links = response.data.links[1].href;
      if (response.status === 200) {
        router.push(links);
      } else if (response.status !== 200) {
        dispatch({
          type: "MAKE_PAYMENT_ERROR",
          errorMessage: "There was an error while making payment",
        });
      }
    });
  };

  const handleInit = (evt, editor) => {
    // setLength(editor.getContent({ format: 'text' }).length);
    setinstructionsx(instructions);
  };

  const handleEditInstructionsChange = (value) => {
    setinstructionsx(value);
  };

  const handleShowValues = () => {
    setinstructionsx(instructions);
  };

  const handleExit = () => {
    setinstructionsx("");
  };

  const handleUpdateOrderSubmit = (event) => {
    event.persist();
    event.preventDefault();
    const { id: userID } = JSON.parse(localStorage.currentUser);
    const bodyData = {
      user_id: parseInt(userID),
      service_id: parseInt(updateOrderDetails.service_id),
      type_id: parseInt(updateOrderDetails.type_id),
      style_id: parseInt(updateOrderDetails.style_id),
      level_id: parseInt(updateOrderDetails.level_id),
      pages_id: parseInt(updateOrderDetails.pages_id),
      urgency_id: parseInt(updateOrderDetails.urgency_id),
      subject_id: parseInt(updateOrderDetails.subject_id),
      sources_id: parseInt(updateOrderDetails.sources_id),
      spacing_id: parseInt(updateOrderDetails.spacing_id),
      language_id: parseInt(updateOrderDetails.language_id),
      phone: updateOrderDetails.phone,
      topic: updateOrderDetails.topic,
      instructions: instructionsx,
      pagesummary: false,
      plagreport: true,
      initialdraft: false,
      qualitycheck: false,
      topwriter: true,
      promocode: "",
    };
    console.log(bodyData);
    if (bodyData) {
      updateOrder(dispatch, orderID, bodyData).then((response) => {
        if (response.status === 200) {
          setShow(false);
        }
      });
    } else {
      dispatch({
        type: "ERROR",
        errorMessage: "Make sure all the fields all filled",
      });
      if (errorMessage.errorMessage) {
        <Message type="error">Error</Message>;
      }
    }
  };

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

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });

  const handleUploadFile = (e) => {
    e.preventDefault();
    let newArr = fileInput.current.files;
    console.log("newArr", newArr);
    for (let i = 0; i < newArr.length; i++) {
      handleFileUploadChange(newArr[i]);
    }
  };

  const handleFileUploadChange = async (file) => {
    console.log("file", file.name);
    console.log("file", file.type);
    try {
      const fileBase64 = await toBase64(file);
      console.log(fileBase64);
      const { id: userID } = JSON.parse(localStorage.currentUser);
      const objectData = {
        order_id: orderId,
        user_id: userID,
        uploaded_files: [
          {
            content_type: file.type,
            file_name: file.name,
            data: fileBase64,
          },
        ],
      };
      await fileUpload(dispatch, objectData).then((response) => {
        console.log(response);
        if (response.status === 201) {
          getOrderfiles(dispatch, orderID);
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

  const handleCancelOrderSubmit = () => {
    const bodyData = {
      order_number: order_number,
      title: parseInt(cancelReasonValue),
      description: orderCancelValues.description,
    };
    if (bodyData.description !== "") {
      cancelOrder(dispatch, orderId, bodyData).then((response) => {
        if (response.status === 200) {
          setCancelOpen(false);
          router.push("/dashboard/cancelled");
        }
      });
    }
  };
  const handleReserveFromWallet = () => {
    payFromWallet(dispatch, orderId).then((response) => {
      if (response.status === 200) {
        toast.success("Paid from wallet successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
        router.push("/dashboard/waiting-assign");
      } else {
        dispatch({
          type: "MAKE_PAYMENT_ERROR",
          errorMessage: walletError?.data.error_message,
        });
        toast.error(walletError?.data.error_message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    });
  };

  React.useEffect(() => {
    getOrder(dispatch, orderID);
    getOrderfiles(dispatch, orderID);
  }, [dispatch, orderID]);

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
    getCancelReasons(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    filterMessages(dispatch, order_number).then((response) => {
      if (response.status === 200) setMessageInfo(response.data);
    });
  }, [dispatch, order_number, message.message]);

  useEffect(() => {
    const { id: userID } = JSON.parse(localStorage.currentUser);
    userWalletSummary(dispatch, userID);
  }, [dispatch, router]);

  const CustomNav = ({ active, onSelect, ...props }) => {
    return (
      <Nav
        {...props}
        activeKey={active}
        style={{ marginTop: "-20px", fontSize: "20px" }}
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
    <Panel>
      <ToastContainer />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h4>Order Details</h4>
        <div style={{ display: "flex", gap: "1em" }}>
          <Button onClick={handleShow} color="blue" appearance="primary">
            Edit Order
          </Button>
          <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            centered
            onShow={handleShowValues}
            onExited={handleExit}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <p>Update Order</p>
                <h4>
                  Price:
                  <span style={{ color: "blue" }}>
                    $
                    {(
                      myservice *
                      mytype *
                      myurgency *
                      mypages *
                      mylevel *
                      myspacing
                    ).toFixed(2)}
                  </span>
                </h4>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Box as="form" onSubmit={handleUpdateOrderSubmit}>
                <Grid fluid>
                  <Row>
                    <Col xs={12}>
                      <div>
                        <Label htmlFor="sound">Service</Label>
                        <select
                          style={{
                            width: "100%",
                            height: "40px",
                            border: "1px solid #becad6",
                            background: "white",
                            borderRadius: "5px",
                          }}
                          onChange={parseServiceSelected}
                          name="service_id"
                        >
                          {serviceSelector.services.map((servicex) => {
                            return (
                              <option
                                key={servicex.id}
                                selected={servicex.name === service_name}
                                value={JSON.stringify(servicex)}
                              >
                                {servicex.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="sound">Type of Paper</Label>
                        <select
                          style={{
                            width: "100%",
                            height: "40px",
                            border: "1px solid #becad6",
                            background: "white",
                            borderRadius: "5px",
                          }}
                          onChange={parseTypeSelected}
                          name="type_id"
                        >
                          {typeSelector.types.map((typex) => {
                            return (
                              <option
                                key={typex.id}
                                selected={typex.name === type_name}
                                value={JSON.stringify(typex)}
                              >
                                {typex.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="sound">Subject</Label>
                        <select
                          style={{
                            width: "100%",
                            height: "40px",
                            border: "1px solid #becad6",
                            background: "white",
                            borderRadius: "5px",
                          }}
                          onChange={handleInputChange}
                          name="subject_id"
                        >
                          {subjectSelector.subjects.map((subjectx) => {
                            return (
                              <option
                                key={subjectx.id}
                                selected={subjectx.name === subject_name}
                                value={subjectx.id}
                              >
                                {subjectx.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="sound">Urgency</Label>
                        <select
                          style={{
                            width: "100%",
                            height: "40px",
                            border: "1px solid #becad6",
                            background: "white",
                            borderRadius: "5px",
                          }}
                          onChange={parseUrgencySelected}
                          name="urgency_id"
                        >
                          {urgencySelector.urgencies.map((urgencyx) => {
                            return (
                              <option
                                key={urgencyx.id}
                                selected={urgencyx.name === urgency_name}
                                value={JSON.stringify(urgencyx)}
                              >
                                {urgencyx.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="sound">Style</Label>
                        <select
                          style={{
                            width: "100%",
                            height: "40px",
                            border: "1px solid #becad6",
                            background: "white",
                            borderRadius: "5px",
                          }}
                          onChange={handleInputChange}
                          name="style_id"
                        >
                          {styleSelector.styles.map((stylex) => {
                            return (
                              <option
                                key={stylex.id}
                                selected={stylex.name === style_name}
                                value={stylex.id}
                              >
                                {stylex.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </Col>
                    <Col xs={12}>
                      <div>
                        <Label htmlFor="sound">Sources</Label>
                        <select
                          onChange={handleInputChange}
                          style={{
                            width: "100%",
                            height: "40px",
                            border: "1px solid #becad6",
                            background: "white",
                            borderRadius: "5px",
                          }}
                          name="sources_id"
                        >
                          {sourcesSelector.sources.map((sourcex) => {
                            return (
                              <option
                                key={sourcex.id}
                                selected={sourcex.name === source_name}
                                value={sourcex.id}
                              >
                                {sourcex.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="sound">Spacing</Label>
                        <select
                          onChange={parseSpacingSelected}
                          style={{
                            width: "100%",
                            height: "40px",
                            border: "1px solid #becad6",
                            background: "white",
                            borderRadius: "5px",
                          }}
                          name="spacing_id"
                        >
                          {spacingSelector.spacings.map((spacingx) => {
                            return (
                              <option
                                key={spacingx.id}
                                selected={spacingx.name === spacing_name}
                                value={JSON.stringify(spacingx)}
                              >
                                {spacingx.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="sound">Language</Label>
                        <select
                          onChange={handleInputChange}
                          style={{
                            width: "100%",
                            height: "40px",
                            border: "1px solid #becad6",
                            background: "white",
                            borderRadius: "5px",
                          }}
                          name="language_id"
                        >
                          {languageSelector.languages.map((languagex) => {
                            return (
                              <option
                                key={languagex.id}
                                selected={languagex.name === language_name}
                                value={languagex.id}
                              >
                                {languagex.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="sound">Pages</Label>
                        <select
                          onChange={parsePageSelected}
                          style={{
                            width: "100%",
                            height: "40px",
                            border: "1px solid #becad6",
                            background: "white",
                            borderRadius: "5px",
                          }}
                          name="pages_id"
                          id="pages_id"
                        >
                          {pageSelector.pages.map((pagex) => {
                            return (
                              <option
                                key={pagex.id}
                                selected={pagex.name === page_name}
                                value={JSON.stringify(pagex)}
                              >
                                {[pagex.name]}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="sound">Level</Label>
                        <select
                          style={{
                            width: "100%",
                            height: "40px",
                            border: "1px solid #becad6",
                            background: "white",
                            borderRadius: "5px",
                          }}
                          onChange={parseLevelSelected}
                          name="level_id"
                        >
                          {levelSelector.levels.map((levelx) => {
                            return (
                              <option
                                key={levelx.id}
                                selected={levelx.name === level_name}
                                value={JSON.stringify(levelx)}
                              >
                                {levelx.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </Col>
                  </Row>
                </Grid>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    onChange={handleChange}
                    placeholder={phone}
                    name="phone"
                    type="text"
                    mb={3}
                  />
                </div>
                <Label htmlFor="topic">Topic*</Label>
                <Input
                  onChange={handleChange}
                  placeholder={topic}
                  name="topic"
                  type="text"
                  mb={3}
                />
                <Label htmlFor="instructions">Instructions*</Label>
                <Editor
                  apiKey="jm5weuex99fz17qyiv457ia53e6ignpzdupkd8vpszcywnoo"
                  value={instructionsx}
                  onInit={handleInit}
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
                  onEditorChange={handleEditInstructionsChange}
                />
                <Button
                  type="submit"
                  color="cyan"
                  appearance="primary"
                  style={{ marginTop: "20px" }}
                >
                  Update Order
                </Button>
              </Box>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={cancelOpen}
            onHide={handleCancelClose}
            size="lg"
            centered
          >
            <Modal.Header>
              <Modal.Title>Cancel Order #{order_number}</Modal.Title>
            </Modal.Header>
            <Divider />
            <Modal.Body>
              <h6>Cancel Reasons</h6>
              <select
                onChange={handleCancelReasonsChange}
                style={{
                  background: "white",
                  borderRadius: "5px",
                  width: "250px",
                  height: "30px",
                }}
              >
                {cancelled_reasons?.map((cancelled_reason) => (
                  <option key={cancelled_reason.id} value={cancelled_reason.id}>
                    {cancelled_reason.name}
                  </option>
                ))}
              </select>
              <br />
              <br />
              <h6>Description</h6>
              <textarea
                name="description"
                onChange={handleOrderCancelChange}
                style={{
                  border: "1px solid #becad6",
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                }}
                rows={4}
                placeholder="Description"
              />
              <br />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleCancelOrderSubmit} appearance="primary">
                Submit
              </Button>
              <Button onClick={handleCancelClose} appearance="subtle">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
          <Button
            onClick={handleCancelOpen}
            color="yellow"
            appearance="primary"
          >
            Cancel
          </Button>
          <Button color="green" onClick={handleOpen} appearance="primary">
            Reserve Payment
          </Button>
          <Modal open={open} onClose={handleClose}>
            {isLoading && <BoxLoading />}
            <Modal.Header>
              <Modal.Title>
                <h5>Reserve Payment</h5>
              </Modal.Title>
              <Divider />
            </Modal.Header>
            <Modal.Body>
              <p style={{ fontSize: "18px" }}>
                Choose one of the options to reserve the payment for the order.
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "40px",
                }}
              >
                <Button
                  color="green"
                  appearance="primary"
                  onClick={handleReserveFromWallet}
                >
                  Reserve from your Wallet
                </Button>
                <Button
                  color="cyan"
                  appearance="primary"
                  onClick={handleReserveOrder}
                >
                  Reserve with Paypal
                </Button>
              </div>
            </Modal.Body>
            <Divider />
            <Modal.Footer>
              <Button onClick={handleClose} appearance="ghost">
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
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
                  <form onSubmit={handleUploadFile}>
                    <input type="file" multiple ref={fileInput} />
                    <span>Click the button to upload multiple files</span>
                    <div>
                      <button
                        style={{
                          marginTop: "10px",
                          padding: "6px",
                          width: "80px",
                          borderRadius: "5px",
                          backgroundColor: "rgb(33,150,243)",
                          color: "white",
                        }}
                        type="submit"
                      >
                        Upload
                      </button>
                    </div>
                  </form>
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
                        {order_files.map((order_file) => (
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
              </table>
              <div className="instructions">
                <h6 style={{ marginTop: "20px", textDecoration: "underline" }}>
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
    </Panel>
  );
};

export default OrderDetails;
const styles = {
  table: {
    borderCollapse: "collapse",
    width: "100%",
    td: {
      fontFamily: "Quicksand, sans-serif",
      border: "1px solid #dddddd",
      textAlign: "left",
      fontSize: "16px",
      padding: "5px",
    },
    tdx: {
      fontFamily: "Quicksand, sans-serif",
      border: "1px solid #dddddd",
      textAlign: "left",
      fontSize: "16px",
      padding: "5px",
      color: "#333333",
    },
  },
};
