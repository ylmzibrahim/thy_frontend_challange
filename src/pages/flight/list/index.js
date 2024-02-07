import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React from "react";
import FlightList from "components/FlightList";

const FlightListPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Flight Lists</title>
        <meta name="description" content="Flight Lists" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <FlightList />
    </>
  );
};

export default FlightListPage;

export const getStaticProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale, ["common", "footer"])) },
});
