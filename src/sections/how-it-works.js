/** @jsx jsx */
import React, { useState } from "react";
import { Grid } from "theme-ui";
import { keyframes } from "@emotion/core";
import SectionHeader from "components/home/section-header";
import PriceCard from "components/home/price-card";
import { jsx, Box, Flex } from "theme-ui";
import PatternBG from "assets/patternBG.png";
import ArrowOdd from "assets/arrowOdd.svg";
import ArrowEven from "assets/arrowEven.svg";
import { Button } from "rsuite";

const packages = {
  instructions: [
    {
      id: 1,
      name: "INSTRUCTIONS",
      point1:
        "Visit our website to fill up your order form, indicating the service you need, " +
        "the number of pages, and the exact time you need it. Give as detailed instructions as possible.",
    },
  ],
  reserve_funds: [
    {
      id: 1,
      name: "RESERVE FUNDS",
      point1:
        "After filling your order form and placing your order, you get the total order price at the bottom of the order form.",
      point2:
        "You can decide to add funds to your wallet or reserve the funds directly from PayPal.",
      point3:
        "We will assign your order to the best writer in your field, and he/she will start working on your paper immediately.",
    },
  ],
  completed_work: [
    {
      id: 1,
      name: "COMPLETED WORK",
      point1:
        "After filling your order form and placing your order, you get the total order price at the bottom of the order form.",
      point2:
        "You can decide to add funds to your wallet or reserve the funds directly from PayPal.",
      point3:
        "We will assign your order to the best writer in your field, and he/she will start working on your paper immediately.",
    },
  ],
  pay_your_writer: [
    {
      id: 1,
      name: "PAY YOUR WRITER",
      point1:
        "After filling your order form and placing your order, you get the total order price at the bottom of the order form.",
      point2:
        "You can decide to add funds to your wallet or reserve the funds directly from PayPal.",
      point3:
        "We will assign your order to the best writer in your field, and he/she will start working on your paper immediately.",
    },
  ],
};

const data = [
  {
    id: 1,
    title: "We assign the writer",
    text: "Get your blood tests delivered at home collect a sample from the your blood tests.",
  },
  {
    id: 2,
    title: "The writer prepares sources for your work",
    text: "Get your blood tests delivered at home collect a sample from the your blood tests.",
  },
  {
    id: 3,
    title: "The writer completes your paper",
    text: "Get your blood tests delivered at home collect a sample from the your blood tests.",
  },
  {
    id: 4,
    title: "The writer polishes your paper",
    text: "Get your blood tests delivered at home collect a sample from the your blood tests.",
  },
  {
    id: 5,
    title: "We send the completed paper to you",
    text: "Get your blood tests delivered at home collect a sample from the your blood tests.",
  },
];

export default function HowItWorks() {
  const { instructions, reserve_funds, completed_work, pay_your_writer } =
    packages;
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    active: "instructions",
    openTab: instructions,
  });

  const handlePricingPlan = (plan) => {
    if (plan === "reserve_funds") {
      setState({ active: "reserve_funds", openTab: reserve_funds });
    } else if (plan === "completed_work") {
      setState({ active: "completed_work", openTab: completed_work });
    } else if (plan === "pay_your_writer") {
      setState({ active: "pay_your_writer", openTab: pay_your_writer });
    } else {
      setState({ active: "instructions", openTab: instructions });
    }
  };
  return (
    <section id="how-it-works">
      <Box sx={styles.workflow}>
        <SectionHeader title="How it works" isWhite={false} />
        <br />
        <Grid sx={styles.grid}>
          {data.map((item) => (
            <Box key={item.id} sx={styles.card}>
              <Box sx={styles.iconBox}>{`0${item.id}`}</Box>
              <Box sx={styles.wrapper}>
                <h4>{item.title}</h4>
              </Box>
            </Box>
          ))}
        </Grid>
        <br />
        <center>
          <Button
            onClick={() => setOpen((open) => !open)}
            style={{
              background: "#17c671",
              borderRadius: "50px",
              color: "white",
              padding: "15px",
              fontSize: "20px",
            }}
          >
            Read more
          </Button>
        </center>
        {open && (
          <div style={{ marginTop: "10px" }}>
            <Flex sx={styles.buttonGroup}>
              <Box sx={styles.buttonGroupInner}>
                <button
                  className={state.active === "instructions" ? "active" : ""}
                  type="button"
                  aria-label="Monthly"
                  onClick={() => handlePricingPlan("instructions")}
                >
                  Instructions
                </button>
                <button
                  className={state.active === "reserve_funds" ? "active" : ""}
                  type="button"
                  aria-label="Reserve Funds"
                  onClick={() => handlePricingPlan("reserve_funds")}
                >
                  Reserve Funds
                </button>
                <button
                  className={state.active === "completed_work" ? "active" : ""}
                  type="button"
                  aria-label="Completed Work"
                  onClick={() => handlePricingPlan("completed_work")}
                >
                  Completed Work
                </button>
                <button
                  className={state.active === "pay_your_writer" ? "active" : ""}
                  type="button"
                  aria-label="Pay_your_writer"
                  onClick={() => handlePricingPlan("pay_your_writer")}
                >
                  Pay Your Writer
                </button>
              </Box>
            </Flex>
            <br />
            <Box sx={styles.pricingWrapper} className="pricing__wrapper">
              {state.openTab.map((packageData) => (
                <Box sx={styles.pricingItem} key={packageData.id}>
                  <PriceCard data={packageData} />
                </Box>
              ))}
            </Box>
            <br />
          </div>
        )}
      </Box>
    </section>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const fadeIn2 = keyframes`
  from {
    transform: translateY(50%);
    opacity: 0;
  }
  to {
		transform: translateY(0);
    opacity: 1;
  }
`;

const styles = {
  workflow: {
    backgroundColor: "primary",
    backgroundImage: `url(${PatternBG})`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    position: "relative",
    px: 8,
    py: [3, null, 4, null, null, 3],
  },
  grid: {
    mb: -1,
    pt: 0,
    gridGap: [
      "35px 0",
      null,
      "45px 30px",
      null,
      "50px 25px",
      null,
      null,
      "50px 65px",
    ],
    gridTemplateColumns: [
      "repeat(1,1fr)",
      null,
      "repeat(3,1fr)",
      null,
      "repeat(5,1fr)",
    ],
  },
  card: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    textAlign: ["center", null, "left"],
    width: ["100%", "80%", "100%"],
    mx: ["auto"],
    px: [4, null, null, 0],
    "&::before": {
      position: "absolute",
      content: '""',
      top: 0,
      left: [0, null, null, null, null, 72, null, 90],
      backgroundRepeat: `no-repeat`,
      backgroundPosition: "center center",
      width: 215,
      height: 60,
      "@media screen and (max-width:1220px)": {
        display: "none",
      },
    },
    "&:nth-of-type(2n-1)::before": {
      backgroundImage: `url(${ArrowOdd})`,
    },
    "&:nth-of-type(2n)::before": {
      backgroundImage: `url(${ArrowEven})`,
      top: 17,
    },
    "&:last-child::before": {
      display: "none",
    },
  },

  iconBox: {
    width: ["50px", null, "60px", null, null, "70px"],
    height: ["50px", null, "60px", null, null, "70px"],
    flexShrink: 0,
    borderRadius: [15, null, 23, null, null, 30],
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    mb: [5, null, null, null, null, 6],
    mx: ["auto", null, 0],
    fontSize: [6, null, 7, null, null, "30px"],
    fontWeight: 700,
    justifyContent: "center",
    color: "#234582",
  },
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    mt: "-5px",
    title: {
      fontFamily: "body",
      fontSize: [3, null, 4, null, null, 5],
      color: "white",
      lineHeight: [1.4, null, null, null, null, 1.55],
      pr: [0, null, null, null, null, 2],
      mb: [2, 3],
    },
  },
  pricingWrapper: {
    mb: "20px",
    mt: ["20px", null, "10px"],
    mx: ["20px", null, "50px"],
    display: "flex",
    backgroundColor: "white",
    borderRadius: "5px",
    flexDirection: "column",
    flexWrap: "wrap",
    "&.pricing__wrapper .package__card": {
      ".package__header": {
        animation: `${fadeIn} 0.8s ease-in`,
      },
      "ul > li": {
        animation: `${fadeIn2} 0.7s ease-in`,
      },
      ".package__price": {
        animation: `${fadeIn2} 0.9s ease-in`,
      },
      button: {
        animation: `${fadeIn2} 1s ease-in`,
      },
    },
    ".carousel-container": {
      width: "100%",
      "> ul > li ": {
        display: "flex",
      },
    },
    ".button__group": {
      display: ["flex", null, null, null, "none"],
      mb: [4, null, null, null, 0],
    },
  },
  pricingItem: {
    mx: 3,
    display: "flex",
    flexShrink: 0,
    flex: "1 1 auto",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    mb: "7",
    mt: ["15px", "35px"],
    position: "relative",
    zIndex: 2,
  },
  buttonGroupInner: {
    display: "flex",
    padding: "7px",
    margin: "0 auto",
    borderRadius: "5px",
    backgroundColor: "#F7F8FB",
    button: {
      border: 0,
      padding: ["15px 20px", "15px 27px"],
      borderRadius: "5px",
      color: "text",
      fontSize: [1, 2],
      lineHeight: 1.2,
      fontWeight: 500,
      backgroundColor: "transparent",
      cursor: "pointer",
      fontFamily: "body",
      letterSpacing: "-0.24px",
      transition: "all 0.3s",
      "&.active": {
        color: "#ffffff",
        backgroundColor: "secondary",
        boxShadow: "0 3px 4px rgba(38, 78, 118, 0.1)",
      },
      "&:focus": {
        outline: 0,
      },
      "&:hover": {
        backgroundColor: "primary",
        color: "black",
      },
    },
  },
};
