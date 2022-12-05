import React, { useEffect } from "react";
import { Provider } from "react-redux";
import "rsuite/dist/rsuite.min.css";
import "react-toastify/dist/ReactToastify.css";
import { useStore } from "../dataStore";
import "react-multi-carousel/lib/styles.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "rc-drawer/assets/index.css";
import "../styles/index.css";
import "typeface-dm-sans";
import Head from "next/head";

function TopRatedApp({ Component, pageProps }) {
  const store = useStore();

  useEffect(() => {
    const TawkTo = () => {
      var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/5a9ae4dfd7591465c7083800/default";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    };
    TawkTo();
  }, []);
  return (
    <div>
      <Head>
        <title>
          Toprated Professors - Free essay and research paper writing guide,
          essay writing service/Online homework help
        </title>
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </div>
  );
}

export default TopRatedApp;
