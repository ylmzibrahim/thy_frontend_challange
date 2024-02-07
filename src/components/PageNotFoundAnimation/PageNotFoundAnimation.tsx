import { useTranslation } from "next-i18next";
import Link from "next/link";
import styles from "./PageNotFoundAnimation.module.css";

export const PageNotFoundAnimation = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.backgroundAnimation}>
        <p className={styles.errorCode}>404</p>
      </div>
      <div className={styles.errorContainer}>
        <div className={styles.errorMessageContainer}>
          <p className={styles.errorMessageTitle}>{t("404.title")}</p>
          <p className={styles.errorMessageDescription}>{t("404.text")}</p>
        </div>

        <Link href={"/flight/query"}>
          <div className={styles.errorMessageButton}>{t("404.link")}</div>
        </Link>
      </div>
    </div>
  );
};
