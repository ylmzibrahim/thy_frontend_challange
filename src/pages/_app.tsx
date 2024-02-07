import React from "react";
import "../assets/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Layout } from "components/Layout/Layout";
import { store } from "store/store";
import { Provider } from "react-redux";

interface Props {
  Component: NextPage;
  pageProps: any;
}

function MyApp({ Component, pageProps }: Props) {
  const router = useRouter();
  if (typeof window !== "undefined" && router.pathname === "/") {
    router.push("/flight/query");
  }

  return (
    // <ThemeProvider attribute="class"> // Provider for darkmode
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
    // </ThemeProvider>
  );
}

export default appWithTranslation(MyApp);
