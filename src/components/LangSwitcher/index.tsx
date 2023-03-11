import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { setLangFilters } from "../../redux/filter/slice";
import { useAppDispatch } from "../../redux/hooks";
import { setLangCart } from "../../redux/cart/slice";
import styles from "./LangSwitcher.module.scss";

const supportedLangs = ["uk", "be", "en", "de", "ja", "ru", "vi"] as const;

type LangName = (typeof supportedLangs)[number];

const langNames: { [key: string]: string } = {
  uk: "Українська",
  be: "Беларуская",
  en: "English",
  de: "Deutsch",
  ja: "日本",
  ru: "Русский",
  vi: "Việt",
};

export const LangSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const [showLangs, setShowLangs] = useState(false);
  const switcherRef = React.useRef<HTMLDivElement>(null);

  const handleLanguageChange: React.MouseEventHandler<HTMLLIElement> = (
    event
  ) => {
    const language = event.currentTarget.title;
    i18n.changeLanguage(language);
    dispatch(setLangFilters());
    dispatch(setLangCart());
  };

  const langCurrent = supportedLangs.includes(i18n.language as LangName)
    ? (i18n.language as LangName)
    : "en";

  const handleClick = React.useCallback((event: MouseEvent) => {
    if (
      switcherRef.current &&
      !event.composedPath().includes(switcherRef.current)
    ) {
      setShowLangs((showLangs) => showLangs && !showLangs);
    }
  }, []);

  React.useEffect(() => {
    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  return (
    <div
      className={
        showLangs ? styles.switcher + " " + styles.active : styles.switcher
      }
      onClick={() => setShowLangs(!showLangs)}
      ref={switcherRef}
    >
      <div className={styles.current}>
        <img src={`/img/${langCurrent}.png`} alt={langCurrent} />
        <span className="name">{langNames[langCurrent]}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
        </svg>
      </div>

      {showLangs && (
        <ul className={styles.switch_list}>
          {supportedLangs.map((lang) => (
            <li key={lang} title={lang} onClick={handleLanguageChange}>
              <img title={lang} src={`/img/${lang}.png`} alt={lang} />
              <span title={lang} className="name">
                {langNames[lang as LangName]}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
