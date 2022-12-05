import React from "react";
import { ThemeProvider } from "theme-ui";
import theme from "../../theme";
import Layout from "components/home/layout";
import ServicesSection from "../../sections/services";

const Services = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Layout>
          <ServicesSection />
        </Layout>
      </ThemeProvider>
    </div>
  );
};
export default Services;
