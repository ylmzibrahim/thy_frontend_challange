import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React from "react";
import FlightQuery from "components/FlightQuery";

const FlightQueryPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("head.flight.query")}</title>
        <meta name="description" content="Select Flight" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <FlightQuery />
    </>
  );
};

export default FlightQueryPage;

export const getStaticProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale, ["common", "footer"])) },
});
