import React from "react";
import { LayoutProps } from "./Layout.types";
import Header from "../Header";
import styles from "./Layout.module.css";
import { useRouter } from "next/router";

export const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.childrenComponent}>{children}</div>
    </div>
  );
};
