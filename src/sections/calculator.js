/** @jsx jsx */
import React, { useEffect } from "react";
import { jsx, Select, Box, Text, Image } from "theme-ui";
import { useDispatch, useSelector } from "react-redux";
import Mcafee from "assets/footer/mcafee.png";
import { Grid, Row, Col, Button } from "rsuite";
import { useRouter } from "next/router";
import { getLevels } from "dataStore/actions/levelsAction";
import { getTypes } from "dataStore/actions/typesAction";
import { getUrgencies } from "dataStore/actions/urgenciesAction";
import { getServices } from "dataStore/actions/servicesAction";
import { getPages } from "dataStore/actions/pagesAction";

const Calculator = () => {
  const levelsSelector = useSelector((store) => store.levelState);
  const { levels: levelsData } = levelsSelector;

  const servicesSelector = useSelector((store) => store.serviceState);
  const { services: serviceData } = servicesSelector;

  const pagesSelector = useSelector((store) => store.pageState);
  const { pages: pagesData } = pagesSelector;

  const typesSelector = useSelector((store) => store.typeState);
  const { types: typesData } = typesSelector;

  const urgenciesSelector = useSelector((store) => store.urgencyState);
  const { urgencies: urgenciesData } = urgenciesSelector;

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    getLevels(dispatch);
    getTypes(dispatch);
    getUrgencies(dispatch);
    getServices(dispatch);
    getPages(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const [selected, setSelected] = React.useState("");
  const [myservice, setmyservice] = React.useState(8);
  const [mytype, setmytype] = React.useState(1);
  const [myurgency, setmyurgency] = React.useState(1);
  const [mypages, setmypages] = React.useState(1);
  const [mylevel, setmylevel] = React.useState(1);
  console.log(selected);

  const parseServiceSelected = (event) => {
    const valueToParse = event.target.value;
    const itemSelected = JSON.parse(valueToParse);
    setSelected(itemSelected);
    setmyservice(itemSelected.factor);
  };
  const parseTypeSelected = (event) => {
    const valueToParse = event.target.value;
    const itemSelected = JSON.parse(valueToParse);
    setSelected(itemSelected);
    setmytype(itemSelected.factor);
  };
  const parseUrgencySelected = (event) => {
    const valueToParse = event.target.value;
    const itemSelected = JSON.parse(valueToParse);
    setSelected(itemSelected);
    setmyurgency(itemSelected.factor);
  };
  const parsePageSelected = (event) => {
    const valueToParse = event.target.value;
    const itemSelected = JSON.parse(valueToParse);
    setSelected(itemSelected);
    setmypages(itemSelected.factor);
  };
  const parseLevelSelected = (event) => {
    const valueToParse = event.target.value;
    const itemSelected = JSON.parse(valueToParse);
    setSelected(itemSelected);
    setmylevel(itemSelected.factor);
  };
  return (
    <div style={{ width: "100%" }}>
      <Box
        sx={styles.calculator}
        as="form"
        onSubmit={(e) => e.preventDefault()}
      >
        <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <h4>Calculate Price</h4>
          <Image src={Mcafee} alt="mcafee" sx={styles.calculator.mcafee} />
        </Box>
        <Grid fluid>
          <Row>
            <Col xs={24} sm={5} md={5}>
              <label style={{ fontWeight: 600, marginTop: "10px" }}>
                Service:
              </label>
            </Col>
            <Col xs={24} sm={19} md={19}>
              <select
                style={{
                  border: "1px solid #becad6",
                  fontFamily: "Quicksand, sans-serif",
                  borderRadius: "5px",
                  marginBottom: "15px",
                  width: "100%",
                  height: "40px",
                  backgroundColor: "white",
                }}
                onChange={parseServiceSelected}
                name="sound"
                id="sound"
              >
                {serviceData?.map((service) => (
                  <option
                    key={service.id}
                    selected={service.name === "Rewriting"}
                    value={JSON.stringify(service)}
                  >
                    {service.name}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
        </Grid>
        <Grid fluid>
          <Row>
            <Col xs={24} sm={5} md={5}>
              <label style={{ marginRight: "20px", fontWeight: 600 }}>
                Type of Paper:
              </label>
            </Col>
            <Col xs={24} sm={19} md={19}>
              <select
                style={{
                  border: "1px solid #becad6",
                  fontFamily: "Quicksand, sans-serif",
                  borderRadius: "5px",
                  marginBottom: "15px",
                  width: "100%",
                  height: "40px",
                  backgroundColor: "white",
                }}
                onChange={parseTypeSelected}
              >
                {typesData?.map((type) => (
                  <option
                    key={type.id}
                    selected={type.name === "Essay"}
                    value={JSON.stringify(type)}
                  >
                    {type.name}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
        </Grid>
        <Grid fluid>
          <Row>
            <Col xs={24} sm={5} md={5}>
              <label style={{ fontWeight: 600, marginTop: "10px" }}>
                Urgency:
              </label>
            </Col>
            <Col xs={24} sm={19} md={19}>
              <select
                style={{
                  border: "1px solid #becad6",
                  fontFamily: "Quicksand, sans-serif",
                  borderRadius: "5px",
                  marginBottom: "15px",
                  width: "100%",
                  height: "40px",
                  backgroundColor: "white",
                }}
                onChange={parseUrgencySelected}
              >
                {urgenciesData?.map((urgency) => (
                  <option
                    key={urgency.id}
                    selected={urgency.name === "10 days"}
                    value={JSON.stringify(urgency)}
                  >
                    {urgency.name}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
        </Grid>
        <Grid fluid>
          <Row>
            <Col xs={24} sm={5} md={5}>
              <label style={{ marginTop: "10px", fontWeight: 600 }}>
                Pages:
              </label>
            </Col>
            <Col xs={24} sm={19} md={19}>
              <select
                style={{
                  border: "1px solid #becad6",
                  fontFamily: "Quicksand, sans-serif",
                  borderRadius: "5px",
                  marginBottom: "15px",
                  width: "100%",
                  height: "40px",
                  backgroundColor: "white",
                }}
                onChange={parsePageSelected}
              >
                {pagesData?.map((page) => (
                  <option
                    key={page.id}
                    selected={page.name === "275 words / 1 page"}
                    value={JSON.stringify(page)}
                  >
                    {page.name}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
        </Grid>
        <Grid fluid>
          <Row>
            <Col xs={24} sm={5} md={5}>
              <label style={{ marginTop: "10px", fontWeight: 600 }}>
                Level:
              </label>
            </Col>
            <Col xs={24} sm={19} md={19}>
              <select
                style={{
                  border: "1px solid #becad6",
                  fontFamily: "Quicksand, sans-serif",
                  borderRadius: "5px",
                  marginBottom: "15px",
                  width: "100%",
                  height: "40px",
                  backgroundColor: "white",
                }}
                onChange={parseLevelSelected}
              >
                {levelsData?.map((level) => (
                  <option key={level.id} value={JSON.stringify(level)}>
                    {level.name}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
        </Grid>
        <Box>
          <Text>
            <center>
              <strong>
                Minimum Price : ${" "}
                {(myservice * mytype * myurgency * mypages * mylevel).toFixed(
                  2
                )}
              </strong>
            </center>
          </Text>
        </Box>
        <Button
          onClick={() => {
            router.push("dashboard/completed");
            localStorage.minimumPrice = (
              myService *
              myType *
              myUrgency *
              myPages *
              myLevel
            ).toFixed(2);
          }}
          className="continue__button"
          variant="secondary"
        >
          Continue
        </Button>
      </Box>
    </div>
  );
};

export default Calculator;

const styles = {
  calculator: {
    mt: "20px",
    padding: "20px",
    border: "1px solid whitesmoke",
    borderRadius: "10px",
    fontSize: "16px",
    transition: "all 0.3s",
    backgroundColor: "white",
    boxShadow: "0 1px 0px 1px rgba(0, 0, 0, 0.2)",
    opacity: 0.96,
    ".continue__button": {
      backgroundColor: "secondary",
      display: "block",
      width: "100%",
      border: "1px solid whitesmoke",
      borderRadius: "10px",
      outline: 0,
      color: "background",
    },
    mcafee: {
      width: ["50px", null, "100px"],
    },
  },
};
