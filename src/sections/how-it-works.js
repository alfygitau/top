/** @jsx jsx */
import React, { useState } from "react";
import { keyframes } from "@emotion/core";
import PriceCard from "components/home/price-card";
import { jsx, Box, Flex } from "theme-ui";
import PatternBG from "assets/patternBG.png";
import ArrowOdd from "assets/arrowOdd.svg";
import ArrowEven from "assets/arrowEven.svg";
import pricing from "../assets/blog/pricing.png";
import wallet from "../assets/blog/wallet.png";
import order from "../assets/blog/order-new.png";
import download from "../assets/blog/download.png";
import calculator from "../assets/blog/calculator.png";
import grammar from "../assets/blog/grammar.png";
import plag from "../assets/blog/plag.webp";
import quality from "../assets/blog/quality.jpg";
import tick from "../assets/blog/tick.webp";

const packages = {
  instructions: [
    {
      id: 1,
      name: "Calculate the minimum price",
      point1:
        "Visit our website and use the calculator to determine how much you need to pay for an assignment, essay, thesis or dessertaton to done on your behalf ",
      image: calculator,
    },
  ],
  completed_work: [
    {
      id: 1,
      name: "Fill the Order Form and Place Order",
      point1:
        "Povide information about your order/service including instructions, attachments, messages, deadline, styles, references and methodologies.",
      image: order,
    },
  ],
  reserve_funds: [
    {
      id: 1,
      name: "Reserve payment",
      point1: "Reserve the payment for the order",
      image: wallet,
    },
  ],
  Download_and_release_funds: [
    {
      id: 1,
      name: "Download and release funds",
      point1:
        "Upon successful completion of an assignment, you will download the order/service and release money to the writer",
      point2: "Downloading the order will also realease funds to the writer",
      image: download,
    },
  ],
};

export default function HowItWorks() {
  const {
    instructions,
    reserve_funds,
    completed_work,
    Download_and_release_funds,
  } = packages;
  const [open, setOpen] = useState(true);
  const [state, setState] = useState({
    active: "instructions",
    openTab: instructions,
  });

  const handlePricingPlan = (plan) => {
    if (plan === "reserve_funds") {
      setState({ active: "reserve_funds", openTab: reserve_funds });
    } else if (plan === "completed_work") {
      setState({ active: "completed_work", openTab: completed_work });
    } else if (plan === "Download_and_release_funds") {
      setState({
        active: "Download_and_release_funds",
        openTab: Download_and_release_funds,
      });
    } else {
      setState({ active: "instructions", openTab: instructions });
    }
  };
  return (
    <section id="how-it-works">
      <Box sx={styles.workflow}>
        <center>
          <h1 style={{ marginTop: "80px" }}>How it works</h1>
          <p>Follow the following steps</p>
        </center>
        {open && (
          <div>
            <Flex sx={styles.buttonGroup}>
              <Box sx={styles.buttonGroupInner}>
                <button
                  className={state.active === "instructions" ? "active" : ""}
                  type="button"
                  aria-label="Monthly"
                  onClick={() => handlePricingPlan("instructions")}
                >
                  Price calculation
                </button>
                <button
                  className={state.active === "completed_work" ? "active" : ""}
                  type="button"
                  aria-label="Completed Work"
                  onClick={() => handlePricingPlan("completed_work")}
                >
                  Create and place order
                </button>
                <button
                  className={state.active === "reserve_funds" ? "active" : ""}
                  type="button"
                  aria-label="Reserve Funds"
                  onClick={() => handlePricingPlan("reserve_funds")}
                >
                  Reserve payment
                </button>
                <button
                  className={
                    state.active === "Download_and_release_funds"
                      ? "active"
                      : ""
                  }
                  type="button"
                  aria-label="Download_and_release_funds"
                  onClick={() =>
                    handlePricingPlan("Download_and_release_funds")
                  }
                >
                  Download and Review
                </button>
              </Box>
            </Flex>
            <Box sx={styles.pricingWrapper} className="pricing__wrapper">
              {state.openTab.map((packageData) => (
                <Box sx={styles.pricingItem} key={packageData.id}>
                  <PriceCard data={packageData} />
                </Box>
              ))}
            </Box>
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
