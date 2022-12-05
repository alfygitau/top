import React from "react";
import { ThemeProvider } from "theme-ui";
import theme from "../../theme";
import Layout from "components/home/layout";
import MoneyBackSection from "../../sections/money-back-guarantee";

const PrivacyPolicy = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Layout>
          <MoneyBackSection />
        </Layout>
      </ThemeProvider>
    </div>
  );
};
export default PrivacyPolicy;
