import React from "react";
import { ThemeProvider } from "theme-ui";
import theme from "../../theme";
import Layout from "components/home/layout";
import ReviewsSection from "../../sections/reviews";

const Reviews = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Layout>
          <ReviewsSection />
        </Layout>
      </ThemeProvider>
    </div>
  );
};
export default Reviews;
