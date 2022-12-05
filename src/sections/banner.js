/** @jsx jsx */
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { jsx } from "theme-ui";
import { Image, Box, Heading, Button } from "theme-ui";
import { Grid, Row, Col } from "rsuite";
import Typical from "react-typical";
import { useDispatch, useSelector } from "react-redux";
import Original from "assets/original-stamp.png";
import Check from "assets/check.png";
import ShapeLeft from "assets/shape-left.png";
import ShapeRight from "assets/shape-right.png";
import CalculatorCard from "../components/home/calculator_card";
import { getLevels } from "../dataStore/actions/levelsAction";
import { getTypes } from "../dataStore/actions/typesAction";
import { getUrgencies } from "../dataStore/actions/urgenciesAction";
import { getServices } from "../dataStore/actions/servicesAction";
import { getPages } from "../dataStore/actions/pagesAction";
import { Divider } from "rsuite";

export default function Banner() {
  const levelsSelector = useSelector((store) => store.levelState);
  const { levels: levelsData } = levelsSelector;

  const servicesSelector = useSelector((store) => store.serviceState);
  const { services: servicesData } = servicesSelector;

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

  const handleNavigateToOrders = () => {
    const user =
      localStorage.currentUser && JSON.parse(localStorage.currentUser);
    if (user) {
      router.push("/dashboard/all-orders");
    } else {
      router.push("/user/login");
    }
  };
  return (
    <section sx={styles.banner} id="home">
      <Grid fluid>
        <Row>
          <Col xs={24} sm={24} md={10} mdOffset={2}>
            <Box sx={styles.banner.bannerCard}>
              <center>
                <Typical
                  steps={["Hire Experts to Do Your Assignment", 2000]}
                  loop={Infinity}
                  wrapper="h3"
                />
              </center>
              <Box sx={styles.banner.buttonGroup}>
                <Box sx={{ lineHeight: 2.5 }}>
                  <p style={{ fontSize: "15px" }}>
                    <Image src={Check} alt="checks" sx={styles.banner.checks} />{" "}
                    A+ Quality Paper
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    <Image src={Check} alt="checks" sx={styles.banner.checks} />{" "}
                    On Time Delivery{" "}
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    <Image src={Check} alt="checks" sx={styles.banner.checks} />{" "}
                    100% Written from Scratch
                  </p>
                </Box>
                <Box sx={{ lineHeight: 2.5 }}>
                  <p style={{ fontSize: "16px" }}>
                    <Image src={Check} alt="checks" sx={styles.banner.checks} />{" "}
                    Plagiarism Free Work
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    <Image src={Check} alt="checks" sx={styles.banner.checks} />{" "}
                    24/7 Customer Support
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    <Image src={Check} alt="checks" sx={styles.banner.checks} />{" "}
                    Unlimited Free Revisions
                  </p>
                </Box>
              </Box>
              <center>
                <p style={{ fontSize: "16px" }}>
                  We are the best custom essay writers online.
                </p>
              </center>
              <br />
              <center>
                <h4>100% SATISFACTION GUARANTEED</h4>
              </center>
              <Box sx={styles.banner.buttonGroup}>
                <Button className="buttons" onClick={handleNavigateToOrders}>
                  Dashboard
                </Button>
                <Button className="buttons" onClick={handleNavigateToOrders}>
                  Order Now
                </Button>
              </Box>
            </Box>
          </Col>
          <Col xs={22} sm={22} md={10} mdOffset={2}>
            <Box sx={styles.calculatorCard}>
              <CalculatorCard
                myLevel={mylevel}
                myPages={mypages}
                myService={myservice}
                myType={mytype}
                myUrgency={myurgency}
                levelsData={levelsData}
                serviceData={servicesData}
                pagesData={pagesData}
                typesData={typesData}
                urgenciesData={urgenciesData}
                parsePageSelected={parsePageSelected}
                parseServiceSelected={parseServiceSelected}
                parseTypeSelected={parseTypeSelected}
                parseLevelSelected={parseLevelSelected}
                parseUrgencySelected={parseUrgencySelected}
              />
            </Box>
          </Col>
        </Row>
      </Grid>
      <Divider />
    </section>
  );
}

const styles = {
  banner: {
    fontFamily: "body",
    pt: ["40px", "45px", "55px", "70px", null, null, "80px", "115px"],
    position: "relative",
    zIndex: 2,
    "&::before": {
      position: "absolute",
      content: '""',
      bottom: 6,
      left: 0,
      height: "100%",
      width: "100%",
      zIndex: -1,
      backgroundImage: `url(${ShapeLeft})`,
      backgroundRepeat: `no-repeat`,
      backgroundPosition: "bottom left",
      backgroundSize: "36%",
    },
    "&::after": {
      position: "absolute",
      content: '""',
      bottom: "40px",
      right: 0,
      height: "100%",
      width: "100%",
      zIndex: -1,
      backgroundImage: `url(${ShapeRight})`,
      backgroundRepeat: `no-repeat`,
      backgroundPosition: "bottom right",
      backgroundSize: "32%",
    },
    grid: {
      pt: [0, null, null, null, null, null, 2],
      px: [5, 6, 0, null, 7, 8, 7],
      gridGap: "6em",
      gridTemplateColumns: ["repeat(1,1fr)", null, "repeat(2,1fr)"],
    },
    bannerCard: {
      width: ["100%", null, "100%"],
      paddingLeft: "20px",
      paddingRight: "20px",
      paddingTop: "20px",
      mt: ["40px", null, "20px"],
      mb: ["40px", null, "20px"],
      border: "1px solid whitesmoke",
      borderRadius: "10px",
      transition: "all 0.3s",
      backgroundColor: "white",
      boxShadow: "0 1px 0px 1px rgba(0, 0, 0, 0.2)",
      opacity: 0.96,
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "space-between",
      mx: ["10px", "30px", "50px"],
      py: [2, null, null, 3, null, null, 4],
      ".buttons": {
        borderRadius: "10px",
        fontSize: ["14px", null, null, 2],
        letterSpacings: "-0.15px",
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "10px",
        paddingBottom: "10px",
        fontFamily: "body",
        backgroundColor: "secondary",
        cursor: "pointer",
        lineHeight: 1.2,
        transition: "all 0.25s",
        fontWeight: 500,
        "&:focus": {
          outline: 0,
        },
      },
    },
    checks: {
      width: ["7%", null, "8%"],
    },
  },
};
