import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { WEBSITE_LINK } from "models/CommonDefaults";
import styles from "./Header.module.css";

export const Header = () => {
  const { t } = useTranslation();
  const router = useRouter();

  if (router.route === "/flight/query") {
    var headerClass = styles.queryHeader ?? "";
    var hrClass = styles.queryHorizontalLine ?? "";
  } else {
    var headerClass = styles.defaultHeader ?? "";
    var hrClass = styles.defaultHorizontalLine ?? "";
  }

  return (
    <header className={clsx(styles.container, headerClass)}>
      <div className={styles.relativeContainer}>
        <div className={styles.headerContent}>
          <Link href={"/flight/query"} className="font-bold">
            {WEBSITE_LINK}
          </Link>
          <p>
            {t("header.search")}
            <span className={styles.projectName}>
              {t("header.flightChallenge")}
            </span>
          </p>
        </div>
        <hr className={clsx(styles.horizontalLine, hrClass)} />
      </div>
    </header>
  );
};
