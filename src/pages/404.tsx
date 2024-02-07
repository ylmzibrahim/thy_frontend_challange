import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import PageNotFoundAnimation from "components/PageNotFoundAnimation";
import { useTranslation } from "react-i18next";

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <section className="pt-56 bg-white font-sans dark:bg-slate-700">
      <Head>
        <title>{t("head.404")}</title>
        <meta name="description" content="Page Not Found" />
        <link rel="icon" href="/images/favicon.png" />
      </Head>
      <PageNotFoundAnimation />
    </section>
  );
};

export default PageNotFound;

export const getStaticProps = async ({ locale }: any) => ({
  props: { ...(await serverSideTranslations(locale, ["common", "footer"])) },
});
