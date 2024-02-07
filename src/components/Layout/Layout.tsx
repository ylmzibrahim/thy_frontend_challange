import React from "react";
import { LayoutProps } from "./Layout.types";
import Header from "components/Header";
import styles from "./Layout.module.css";
import { useFetchFlightsJson2Slice } from "hooks/useFetchFlightsJson2Slice";
import Language from "components/Language";

export const Layout = ({ children }: LayoutProps) => {
  useFetchFlightsJson2Slice();

  return (
    <div className={styles.container}>
      <Header />
      <Language />
      <div className={styles.childrenComponent}>{children}</div>
    </div>
  );
};
