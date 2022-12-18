import React, { useState } from "react";
import theme from "../../theme";
import { ThemeProvider } from "theme-ui";
import Sticky from "react-stickynode";
import Header from "components/header/header";
import HowItWorks from "sections/how-it-works";
import Footer from "components/footer/footer";

const Start = () => {
  const [isSticky, setIsSticky] = useState(false);

  const handleStateChange = (status) => {
    if (status.status === Sticky.STATUS_FIXED) {
      setIsSticky(true);
    } else if (status.status === Sticky.STATUS_ORIGINAL) {
      setIsSticky(false);
    }
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Sticky innerZ={1001} top={0} onStateChange={handleStateChange}>
          <Header className={`${isSticky ? "sticky" : "unSticky"}`} />
        </Sticky>
        <HowItWorks/>
        <Footer/>
      </ThemeProvider>
    </div>
  );
};

export default Start;
