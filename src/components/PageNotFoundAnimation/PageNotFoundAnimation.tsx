import { useTranslation } from "next-i18next";
import Link from "next/link";

export const PageNotFoundAnimation = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-center dark:bg-slate-700">
      <div>
        <div className="grid col-span-full dark:bg-slate-700">
          <div className="text-center bg-center">
            <div className="bg-no-repeat h-96 bg-center bg-[url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')]">
              <p className="font-sans text-center font-bold text-7xl text-slate-700">
                404
              </p>
            </div>
            <div className="-mt-16 dark:bg-slate-700">
              <div className="mt-5">
                <p className="font-sans text-2xl font-semibold">
                  {t("404.title")}
                </p>
                <p className="font-sans text-lg ">{t("404.text")}</p>
              </div>

              <Link href={"/flight/query"}>
                <div className="text-white py-3 px-5 bg-emerald-500 my-5 mx-0 inline-block font-bold font-sans">
                  {t("404.link")}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
