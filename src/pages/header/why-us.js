import React from "react";
import { ThemeProvider } from "theme-ui";
import theme from "../../theme";
import Layout from "components/home/layout";
import WhyChooseUsSection from "../../sections/why-choose-us";

const WhyChooseUs = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Layout>
          <h3>Why choose Us</h3>
          <div style={{ marginTop: "10px" }}>
            <WhyChooseUsSection />
          </div>
        </Layout>
      </ThemeProvider>
    </div>
  );
};
export default WhyChooseUs;
