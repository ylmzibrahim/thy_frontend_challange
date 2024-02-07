import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React from "react";
import FlightResult from "components/FlightResult";

const FlightQueryPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Flight Result</title>
        <meta name="description" content="Flight Result" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <FlightResult />
    </>
  );
};

export default FlightQueryPage;

export const getStaticProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale, ["common", "footer"])) },
});
