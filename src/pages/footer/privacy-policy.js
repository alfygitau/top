import React from "react";
import { ThemeProvider } from "theme-ui";
import theme from "../../theme";
import Layout from "components/home/layout";
import PrivacySection from "../../sections/privacy_policy";

const PrivacyPolicy = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Layout>
          <PrivacySection />
        </Layout>
      </ThemeProvider>
    </div>
  );
};
export default PrivacyPolicy;
