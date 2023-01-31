/** @jsx jsx */
import React from "react";
import { jsx, Box, Card, Text, Heading } from "theme-ui";
import { FaAngleDoubleRight } from "react-icons/fa";

export default function PriceCard({
  data: {
    header,
    name,
    point1,
    point2,
    point3,
    image,
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
  },
}) {
  return (
    <Card
      className={header ? "package__card active" : "package__card"}
      sx={styles.pricingBox}
    >
      {header && <Text sx={styles.header}>{header}</Text>}
      <Box>
        <Box className="package__header" sx={styles.pricingHeader}>
          <h3 className="package__name" variant="title">
            {name}
          </h3>
          <Text as="p">
            {image2 && (
              <img src={image2} alt="how it works" height="100px" width="150" />
            )}
            {point1} &nbsp;
            {image2 && (
              <img src={image4} alt="how it works" height="30px" width="30" />
            )}
          </Text>
          {point2 && (
            <Text as="p">
              {image1 && (
                <img
                  src={image1}
                  alt="how it works"
                  height="100px"
                  width="100"
                />
              )}
              {point2} &nbsp;
              {image2 && (
                <img src={image5} alt="how it works" height="30px" width="30" />
              )}
            </Text>
          )}
          {point3 && (
            <Text as="p">
              {image3 && (
                <img
                  src={image3}
                  alt="how it works"
                  height="100px"
                  width="100"
                />
              )}
              {point3} &nbsp;
              {image6 && (
                <img src={image4} alt="how it works" height="30px" width="30" />
              )}
            </Text>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            {image && (
              <div style={{ border: "0.5px solid black" }}>
                <img
                  src={image}
                  alt="how it works"
                  height="300px"
                  width="600"
                  style={{
                    backgroundSize: "cover",
                    backgoundPosition: "center",
                    margin: "20px",
                  }}
                />
              </div>
            )}
          </div>
        </Box>
      </Box>
    </Card>
  );
}

const styles = {
  pricingBox: {
    borderRadius: 20,
    position: "relative",
    transition: "all 0.3s",
    p: ["35px 25px", null, null, "40px"],
    width: ["100%", "75%", "100%"],
    mb: "40px",
    mt: "80px",
    mx: "5em",
    "&:before": {
      position: "absolute",
      content: "''",
      width: "100%",
      top: 0,
      left: 0,
      height: "100%",
      border: "1px solid rgba(38, 78, 118, 0.1)",
      borderRadius: "inherit",
      transition: "all 0.3s",
      zIndex: -1,
    },
    "&:hover": {
      boxShadow: "0px 4px 25px rgba(38, 78, 118, 0.1) !important",
      "&:before": {
        opacity: 0,
      },
    },
  },
  header: {
    height: ["28px", null, null, "32px"],
    backgroundColor: "yellow",
    borderRadius: "5px",
    fontWeight: "bold",
    fontSize: 1,
    lineHeight: 1.2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    position: "absolute",
    top: "-17px",
    letterSpacing: "-.14px",
    px: "12px",
  },
  pricingHeader: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    mb: ["30px", null, null, null, "40px"],
    p: {
      fontSize: [1, 2],
      color: "text",
      lineHeight: 2.5,
    },
    ".package__name": {
      marginBottom: [1, null, 2],
      color: "primary",
    },
  },
  price: {
    fontWeight: 500,
    fontSize: [4, null, 5, null, "30px"],
    lineHeight: 1,
    letterSpacing: "-0.55px",
    color: "text",
    marginBottom: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pt: [4, 6],
    "> span": {
      position: "relative",
      pl: "3px",
      display: "inline-block",
      fontSize: [1, 2],
      fontWeight: "normal",
    },
  },
  listItem: {
    fontFamily: "DM Sans",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: [1, 2],
    lineHeight: [1.75, 1.6],
    mb: 3,
    alignItems: "flex-start",
    color: "text",
    "&.closed": {
      opacity: 0.55,
      button: {
        color: "#788FB5",
      },
    },
  },
  buttonGroup: {
    textAlign: "center",
    mt: ["30px", null, null, null, "35px"],
    ".free__trail": {
      color: "secondary",
      width: "100%",
      justifyContent: "center",
      fontWeight: 700,
      fontSize: ["14px", 1],
      p: "20px 0 0",
    },
  },
};
