import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const PageNotFound = () => {
  return <h1>PageNotFound</h1>
}

export default PageNotFound

export const getStaticProps = async ({ locale }: any) => ({
  props: { ...(await serverSideTranslations(locale, ['common', 'footer'])) }
})
