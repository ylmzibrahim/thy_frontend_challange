import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { WEBSITE_LINK } from "models/CommonDefaults";

export const Header = () => {
  const { t } = useTranslation();
  const router = useRouter();

  if (router.route === "/flight/query") {
    var headerClass = "bg-queryBg text-white";
    var hrClass = "border-white";
  } else {
    var headerClass = "bg-white text-black";
    var hrClass = "border-black";
  }

  return (
    <header className={clsx("py-2 px-5 ", headerClass)}>
      <div className="relative">
        <div className="flex justify-between">
          <Link
            href={`https://www.${WEBSITE_LINK}`}
            target="_blank"
            className="font-bold"
          >
            {WEBSITE_LINK}
          </Link>
          <p>
            {t("header.search")}
            <span className="font-bold">{t("header.flightChallenge")}</span>
          </p>
        </div>
        <hr className={clsx("absolute inset-x-0 inset-y-[1.2rem]", hrClass)} />
      </div>
    </header>
  );
};
