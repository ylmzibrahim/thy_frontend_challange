import React from "react";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home() {
  return (
    <div>
      <Head>
        <title></title>
        <meta name="description" content="Hello world app" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <main></main>
      <footer></footer>
    </div>
  );
}

export const getStaticProps = async ({ locale }: any) => ({
  props: { ...(await serverSideTranslations(locale, ["common", "footer"])) },
});
