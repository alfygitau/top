import React from "react";
import { ThemeProvider } from "theme-ui";
import theme from "../theme";
import SEO from "components/home/seo";
import Layout from "components/home/layout";
import Banner from "../sections/banner";
import TestimonialCard from "../sections/reviews";
import HowItWorks from "../sections/how-it-works";
import WhyChooseUs from "../sections/why-choose-us";
import HomeworkServices from "../sections/homework-services";
import CounterSection from "../sections/counter-section";
import Head from "next/head";

export default function IndexPage() {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>
          Top Rated Professors - Free essay and research paper writing guide,
          essay writing service/Online homework help
        </title>
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Layout>
        <SEO
          title="Top Rated Professors Free essay and research paper writing guide,
          essay writing service/Online homework help"
        />
        <Banner />
        <TestimonialCard />
        <HowItWorks />
        <WhyChooseUs />
        <CounterSection />
        <HomeworkServices />
      </Layout>
    </ThemeProvider>
  );
}
