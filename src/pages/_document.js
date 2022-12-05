import React from "react";

import Document, { Html, Head, Main, NextScript } from "next/document";

class TopratedDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ff8e22" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default TopratedDocument;
