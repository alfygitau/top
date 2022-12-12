import React from "react";
import { ThemeProvider } from "theme-ui";
import theme from "../../../theme";
import Layout from "components/home/layout";
import BlogInfo from "sections/BlogInfo";

const BlogDetails = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Layout>
          <BlogInfo />
        </Layout>
      </ThemeProvider>
    </div>
  );
};
export default BlogDetails;
