import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import PageNotFoundAnimation from "components/PageNotFoundAnimation";

const PageNotFound = () => {
  return (
    <section className="pt-56 bg-white font-sans dark:bg-slate-700">
      <Head>
        <title>404 Sayfa Bulunamadı</title>
        <meta name="description" content="Real world app" />
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
