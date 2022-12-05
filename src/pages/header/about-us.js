import React from "react";
import { ThemeProvider } from "theme-ui";
import theme from "../../theme";
import Layout from "components/home/layout";
import AboutUsComp from "../../sections/about-us";

const AboutUs = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Layout>
          <AboutUsComp />
        </Layout>
      </ThemeProvider>
    </div>
  );
};
export default AboutUs;
