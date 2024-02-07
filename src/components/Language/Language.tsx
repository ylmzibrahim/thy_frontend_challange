import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setLanguage } from "store/features/languageSlice";
import { useAppDispatch, useAppSelector } from "store/store";
import styles from "./Language.module.css";

export const Language = () => {
  const language = useAppSelector((state) => state.theme.language);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [languageLogo, setLanguageLogo] = useState(
    language === "tr-TR" ? (
      <Image
        src="/images/flag-US.webp"
        layout="fill"
        alt="flag-united-states-america"
      />
    ) : (
      <Image src="/images/flag-TR.webp" layout="fill" alt="flag-turkey" />
    )
  );

  useEffect(() => {
    setLanguageLogo(
      language === "tr-TR" ? (
        <Image
          src="/images/flag-US.webp"
          layout="fill"
          alt="flag-united-states-america"
        />
      ) : (
        <Image src="/images/flag-TR.webp" layout="fill" alt="flag-turkey" />
      )
    );
  }, [language]);

  useEffect(() => {
    dispatch(setLanguage(router.locale ?? "tr-TR"));
  }, []);

  const handleChangeLanguage = () => {
    if (language === "en-US") {
      router.replace(router.asPath, router.asPath, { locale: "tr-TR" });
      dispatch(setLanguage("tr-TR"));
    } else {
      router.replace(router.asPath, router.asPath, { locale: "en-US" });
      dispatch(setLanguage("en-US"));
    }
  };

  return (
    <div
      className={
        styles.container +
        " " +
        (language === "tr-TR" ? styles.backgroundUS : "")
      }
    >
      <button onClick={handleChangeLanguage} className={styles.button}>
        {languageLogo}
      </button>
    </div>
  );
};
