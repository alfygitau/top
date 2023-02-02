import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  Row,
  Col,
  Divider,
  Input,
  Steps,
  ButtonGroup,
  InputGroup,
  Panel,
  Message,
} from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { Label, Select, Button } from "theme-ui";
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
  createOrders,
  getOrders,
} from "../../../dataStore/actions/ordersAction";
import { Box } from "theme-ui";
import { useRouter } from "next/router";
import { BoxLoading } from "react-loadingg";
import { Editor } from "@tinymce/tinymce-react";

const CreateOrder = () => {
  const [step, setStep] = React.useState(0);
  const [selected, setSelected] = React.useState("");
  const [selectedSpacing, setSelectedSpacing] = React.useState("Double Spaced");
  const [selectedPages, setSelectedPages] =
    React.useState("275 words / 1 page");
  const [myservice, setmyservice] = React.useState(8);
  const [mytype, setmytype] = React.useState(1.2);
  const [myurgency, setmyurgency] = React.useState(2.5);
  const [mypages, setmypages] = React.useState(1);
  const [mylevel, setmylevel] = React.useState(1);
  const [myspacing, setmyspacing] = React.useState(1);

  let cal = [myservice, mytype, myurgency, mypages, mylevel, myspacing];
  console.log(selectedSpacing);

  const [instructions, setinstructions] = React.useState("");
  const [order, setOrder] = React.useState({
    user_id: "",
    service_id: 1,
    type_id: 1,
    style_id: 1,
    level_id: 1,
    pages_id: 1,
    urgency_id: 1,
    subject_id: 1,
    sources_id: 1,
    spacing_id: 1,
    language_id: 1,
    phone: "",
    topic: "",
    instructions: "",
    pagesummary: "",
    plagreport: "",
    initialdraft: "",
    qualitycheck: "",
    topwriter: "",
    promocode: "",
  });
  const levelSelector = useSelector((state) => state.levelState);
  const pageSelector = useSelector((state) => state.pageState);
  const serviceSelector = useSelector((state) => state.serviceState);
  let newPages = pageSelector.pages.map((page) => page);
  let namesPages = newPages.slice(200);
  console.log(namesPages);
  const sourcesSelector = useSelector((state) => state.sourceState);
  const spacingSelector = useSelector((state) => state.spacingState);
  console.log(spacingSelector);
  const styleSelector = useSelector((state) => state.styleState);
  const subjectSelector = useSelector((state) => state.subjectState);
  const typeSelector = useSelector((state) => state.typeState);
  const urgencySelector = useSelector((state) => state.urgencyState);
  const languageSelector = useSelector((state) => state.languageState);
  const orderSelector = useSelector((state) => state.orderState);
  const { errorMessage, isLoading: orderLoading } = orderSelector;

  const dispatch = useDispatch();
  const router = useRouter();

  const onChange = (nextStep) => {
    setStep(nextStep < 0 ? 0 : nextStep > 2 ? 2 : nextStep);
  };

  const onNext = () => {
    onChange(step + 1);
    localStorage.service_id = order.service_id;
    localStorage.urgency_id = order.urgency_id;
    localStorage.spacing_id = order.spacing_id;
    localStorage.type_id = order.type_id;
    localStorage.style_id = order.style_id;
    localStorage.language_id = order.language_id;
    localStorage.level_id = order.level_id;
    localStorage.sources_id = order.sources_id;
    localStorage.pages_id = order.pages_id;
    localStorage.subject_id = order.subject_id;
  };
  const onPrevious = () => {
    onChange(step - 1);
  };

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setOrder((order) => {
      return {
        ...order,
        [name]: value,
      };
    });
  };

  const handleSelectChange = (valuex, event) => {
    let value = event.target.value;
    let name = event.target.name;

    setOrder((order) => {
      return {
        ...order,
        [name]: value,
      };
    });
  };

  const parseServiceSelected = (event) => {
    const valueToParse = event.target.value;
    const service_id_index = Object.values(JSON.parse(valueToParse));
    const service_id = service_id_index[0];
    const itemSelected = JSON.parse(valueToParse);
    setSelected(itemSelected);
    setmyservice(itemSelected.factor);
    localStorage.setItem("myservice", JSON.stringify(itemSelected.factor));
    setOrder({
      ...order,
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
    localStorage.setItem("mytype", JSON.stringify(itemSelected.factor));
    setOrder({
      ...order,
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
    localStorage.setItem("myurgency", JSON.stringify(itemSelected.factor));
    setOrder({
      ...order,
      [event.target.name]: urgency_id,
    });
  };
  const parsePageSelected = (event) => {
    const valueToParse = event.target.value;
    const page_id_index = Object.values(JSON.parse(valueToParse));
    const page_id = page_id_index[0];
    const itemSelected = JSON.parse(valueToParse);
    setSelectedPages(itemSelected.name);
    setmypages(itemSelected.factor);
    localStorage.setItem("mypages", JSON.stringify(itemSelected.factor));
    setOrder({
      ...order,
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
    localStorage.setItem("mylevel", JSON.stringify(itemSelected.factor));
    setOrder({
      ...order,
      [event.target.name]: level_id,
    });
  };
  const parseSpacingSelected = (event) => {
    const valueToParse = event.target.value;
    console.log(JSON.parse(valueToParse));
    const spacing_id_index = Object.values(JSON.parse(valueToParse));
    const spacing_id = spacing_id_index[0];
    const itemSelected = JSON.parse(valueToParse);
    console.log(itemSelected.name);
    // setSelected(itemSelected);
    setSelectedSpacing(itemSelected.name);
    setmyspacing(itemSelected.factor);
    localStorage.setItem("myspacing", JSON.stringify(itemSelected.factor));
    setOrder({
      ...order,
      [event.target.name]: spacing_id,
    });
  };

  const addOrder = (credentials) => createOrders(dispatch, credentials);

  const handleCreateOrderSubmit = (event) => {
    event.persist();
    event.preventDefault();
    const { id: userID } = JSON.parse(localStorage.currentUser);
    const bodyData = {
      user_id: parseInt(userID),
      service_id: parseInt(localStorage.service_id, 10),
      type_id: parseInt(localStorage.type_id, 10),
      style_id: parseInt(localStorage.style_id, 10),
      level_id: parseInt(localStorage.level_id, 10),
      pages_id: parseInt(localStorage.pages_id, 10),
      urgency_id: parseInt(localStorage.urgency_id, 10),
      subject_id: parseInt(localStorage.subject_id, 10),
      sources_id: parseInt(localStorage.sources_id, 10),
      spacing_id: parseInt(localStorage.spacing_id, 10),
      language_id: parseInt(localStorage.language_id, 10),
      phone: order.phone,
      topic: order.topic,
      instructions: instructions,
      pagesummary: false,
      plagreport: true,
      initialdraft: false,
      qualitycheck: false,
      topwriter: true,
      promocode: "",
    };
    console.log(bodyData);
    if (order.topic !== "" && bodyData.instructions !== "") {
      addOrder(bodyData).then((response) => {
        if (response.status === 201) {
          const orderID = response.data.id;
          router.push(`/dashboard/order/${orderID}`);
        }
      });
    } else {
      dispatch({
        type: "CREATE_ORDER_ERROR",
        errorMessage: "Make sure all the fields all filled",
      });
    }
  };

  const handleEditorChange = (value) => {
    setinstructions(value);
  };

  console.log(instructions);

  useEffect(() => {
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
    const elementVerified = document.querySelector(".steps");
    function myFunction(x) {
      if (x.matches) {
        // If media query matches
        elementVerified.style.display = "none";
      }
    }
    let x = window.matchMedia("(max-width: 700px)");
    myFunction(x);
    x.addListener(myFunction);
  }, []);

  return (
    <Box sx={{ marginLeft: "10px", marginRight: "10px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Create Order</h3>
      </Box>
      <Divider />
      {orderLoading && <BoxLoading />}
      <Box as="form" onSubmit={handleCreateOrderSubmit}>
        <Grid fluid>
          <Row>
            <Col sm={6} md={6}>
              <Panel
                className="steps"
                shaded
                style={{ minHeight: "400px", background: "whitesmoke" }}
              >
                <Steps current={step} vertical style={styles}>
                  <Steps.Item
                    title="Order requirements"
                    description="Fill in your order requirements."
                  />
                  <Steps.Item
                    title="Complete Order details"
                    description="Make sure all the order requirements are filled"
                  />
                </Steps>
              </Panel>
            </Col>
            <Col sm={18} md={18}>
              {errorMessage && (
                <Message closable type="error">
                  {errorMessage}
                </Message>
              )}
              {step === 0 && (
                <Box>
                  <Box
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h3>Enter Order details:</h3>
                    <br />
                    <h3>
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
                    </h3>
                  </Box>
                  <br />
                  <Col xs={12} sm={12} md={8}>
                    <Label htmlFor="sound">Service</Label>
                    <Select
                      onChange={parseServiceSelected}
                      name="service_id"
                      mb={3}
                    >
                      {serviceSelector.services.map((service) => {
                        return (
                          <option
                            key={service.id}
                            value={JSON.stringify(service)}
                          >
                            {service.name}
                          </option>
                        );
                      })}
                    </Select>
                    <Label htmlFor="sound">Type of Paper</Label>
                    <Select onChange={parseTypeSelected} name="type_id" mb={3}>
                      {typeSelector.types.map((type) => {
                        return (
                          <option key={type.id} value={JSON.stringify(type)}>
                            {type.name}
                          </option>
                        );
                      })}
                    </Select>
                    <Label htmlFor="sound">Level</Label>
                    <Select
                      onChange={parseLevelSelected}
                      name="level_id"
                      mb={3}
                    >
                      {levelSelector.levels.map((level) => {
                        return (
                          <option key={level.id} value={JSON.stringify(level)}>
                            {level.name}
                          </option>
                        );
                      })}
                    </Select>
                    <Label htmlFor="sound">Subject</Label>
                    <Select onChange={handleChange} name="subject_id" mb={3}>
                      {subjectSelector.subjects.map((subject) => {
                        return (
                          <option key={subject.id} value={subject.id}>
                            {subject.name}
                          </option>
                        );
                      })}
                    </Select>
                  </Col>
                  <Col xs={12} sm={12} md={8}>
                    <Label htmlFor="sound">Urgency</Label>
                    <Select
                      onChange={parseUrgencySelected}
                      name="urgency_id"
                      mb={3}
                    >
                      {urgencySelector.urgencies.map((urgency) => {
                        return (
                          <option
                            key={urgency.id}
                            value={JSON.stringify(urgency)}
                          >
                            {urgency.name}
                          </option>
                        );
                      })}
                    </Select>
                    <Label htmlFor="sound">Style</Label>
                    <Select onChange={handleChange} name="style_id" mb={3}>
                      {styleSelector.styles.map((style) => {
                        return (
                          <option key={style.id} value={style.id}>
                            {style.name}
                          </option>
                        );
                      })}
                    </Select>
                    <Label htmlFor="sound">Sources</Label>
                    <Select onChange={handleChange} name="sources_id" mb={3}>
                      {sourcesSelector.sources.map((source) => {
                        return (
                          <option key={source.id} value={source.id}>
                            {source.name}
                          </option>
                        );
                      })}
                    </Select>
                  </Col>
                  <Col xs={12} sm={12} md={8}>
                    <Label htmlFor="sound">Spacing</Label>
                    <Select
                      onChange={parseSpacingSelected}
                      name="spacing_id"
                      mb={3}
                    >
                      {spacingSelector.spacings.map((spacing) => {
                        return (
                          <option
                            key={spacing.id}
                            value={JSON.stringify(spacing)}
                          >
                            {spacing.name}
                          </option>
                        );
                      })}
                    </Select>
                    <Label htmlFor="sound">Language</Label>
                    <Select onChange={handleChange} name="language_id" mb={3}>
                      {languageSelector.languages.map((language) => {
                        return (
                          <option key={language.id} value={language.id}>
                            {language.name}
                          </option>
                        );
                      })}
                    </Select>
                    <Label htmlFor="sound">Pages</Label>
                    {selectedSpacing === "Double Spaced" ? (
                      <Select
                        onChange={parsePageSelected}
                        name="pages_id"
                        id="pages_id"
                        mb={3}
                      >
                        {pageSelector.pages.slice(0, 150).map((page) => {
                          return (
                            <option key={page.id} value={JSON.stringify(page)}>
                              {page.name}
                            </option>
                          );
                        })}
                      </Select>
                    ) : (
                      <Select
                        onChange={parsePageSelected}
                        name="pages_id"
                        id="pages_id"
                        mb={3}
                      >
                        {pageSelector.pages.slice(200).map((page) => {
                          return (
                            <option key={page.id} value={JSON.stringify(page)}>
                              {page.name}
                            </option>
                          );
                        })}
                      </Select>
                    )}
                  </Col>
                </Box>
              )}
              {step === 1 && (
                <Box>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    style={{ border: "1px solid #C9BBB8 " }}
                    onChange={handleSelectChange}
                    name="phone"
                    type="text"
                    mb={3}
                  />
                  <br />
                  <Label htmlFor="topic">Topic*</Label>
                  <Input
                    style={{ border: "1px solid #C9BBB8 " }}
                    onChange={handleSelectChange}
                    name="topic"
                    type="text"
                    mb={3}
                  />
                  <br />
                  <Label htmlFor="instructions">Instructions*</Label>
                  <Editor
                    apiKey="jm5weuex99fz17qyiv457ia53e6ignpzdupkd8vpszcywnoo"
                    value={instructions}
                    initialValue=""
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
                        "link | undo redo | formatselect | bold italic | \
                                                    alignleft aligncenter alignright | \
                                                    bullist numlist outdent indent | help",
                    }}
                    onEditorChange={handleEditorChange}
                  />
                  <br />
                </Box>
              )}
              <Row>
                <Col xs={24}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <ButtonGroup>
                      <Button
                        sx={{ background: "blue" }}
                        onClick={onPrevious}
                        disabled={step === 0}
                      >
                        Previous
                      </Button>{" "}
                      {step === 0 && (
                        <Button
                          sx={{ background: "orange" }}
                          onClick={onNext}
                          disabled={step === 1}
                        >
                          Next
                        </Button>
                      )}
                      {step === 1 && (
                        <Button type="submit" sx={{ background: "green" }}>
                          Create Order
                        </Button>
                      )}
                    </ButtonGroup>
                  </Box>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </Box>
    </Box>
  );
};
export default CreateOrder;

const styles = {
  width: "200px",
  display: "inline-table",
  verticalAlign: "top",
};
