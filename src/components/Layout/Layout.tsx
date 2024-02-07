import React from "react";
import { LayoutProps } from "./Layout.types";
import Header from "../Header";
import styles from "./Layout.module.css";
import { useFetchFlightsJson2Slice } from "hooks/useFetchFlightsJson2Slice";

export const Layout = ({ children }: LayoutProps) => {
  useFetchFlightsJson2Slice();

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.childrenComponent}>{children}</div>
    </div>
  );
};
