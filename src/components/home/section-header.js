/** @jsx jsx */
import { jsx, Box, Text } from "theme-ui";

export default function SectionHeader({ title, slogan, isWhite }) {
  return (
    <Box>
      <Text
        as="p"
        sx={{
          fontSize: [0, "13px", null, "14px"],
          textAlign: "center",
          letterSpacing: ["1.5px", null, "2px"],
          textTransform: "uppercase",
          fontWeight: "700",
          mb: 2,
          lineHeight: 1.5,
          fontFamily: "body",
          color: isWhite ? "white" : "primary",
          opacity: isWhite ? 0.7 : 1,
        }}
      >
        <center>{slogan}</center>
      </Text>
      <h3
        sx={{
          textAlign: "center",
          color: isWhite ? "white" : "heading",
        }}
      >
        <center>{title}</center>
      </h3>
    </Box>
  );
}
