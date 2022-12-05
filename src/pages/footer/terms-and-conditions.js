import React from "react";
import { ThemeProvider } from "theme-ui";
import theme from "../../theme";
import Layout from "components/home/layout";
import TermsSection from "../../sections/terms_and_conditions";

const TermsAndConditions = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Layout>
          <TermsSection />
        </Layout>
      </ThemeProvider>
    </div>
  );
};
export default TermsAndConditions;
