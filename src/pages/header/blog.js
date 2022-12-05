import React from "react";
import { ThemeProvider } from "theme-ui";
import theme from "../../theme";
import Layout from "components/home/layout";
import Blog from "sections/blog";

const AboutUs = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Layout>
          <Blog />
        </Layout>
      </ThemeProvider>
    </div>
  );
};
export default AboutUs;
