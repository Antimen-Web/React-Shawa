import { useTranslation } from "react-i18next";
import React from "react";
import { setLangFilters } from "../../redux/filter/slice";
import { useAppDispatch } from "../../redux/hooks";
import { setLangCart } from "../../redux/cart/slice";
import styles from "./LangSwitcher.module.scss";

export const LangSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const switcherRef = React.useRef<HTMLDivElement>(null);

  type langNamesType = "en" | "de" | "ja" | "ru" | "uk" | "vi";

  const langNames = {
    uk: "Українська",
    en: "English",
    de: "Deutsch",
    ja: "日本",
    ru: "Русский",
    vi: "Việt",
  };

  const handleLanguageChange: React.MouseEventHandler<HTMLDivElement> = (
    event
  ) => {
    const language = event as any;
    console.log(language?.target?.title);
    i18n.changeLanguage(language?.target?.title);
    dispatch(setLangFilters());
    dispatch(setLangCart());
  };

  const showLangs: React.MouseEventHandler<HTMLDivElement> = () => {
    switcherRef?.current?.classList.toggle(styles.active);
  };

  const langCurrent = i18n.language.includes("de")
    ? "de"
    : i18n.language.includes("ru")
    ? "ru"
    : i18n.language.includes("ja")
    ? "ja"
    : i18n.language.includes("uk")
    ? "uk"
    : i18n.language.includes("vi")
    ? "vi"
    : "en";

  return (
    <div ref={switcherRef} className={styles.switcher} onClick={showLangs}>
      <div className={styles.current}>
        <img
          src={"/img/" + langCurrent + ".png"}
          alt={langNames[langCurrent]}
        />
        <span className="name">{langNames[langCurrent]}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
        </svg>
      </div>

      <ul className={styles.switch_list}>
        {Object.keys(langNames).map((elem) => (
          <div key={elem} title={elem} onClick={handleLanguageChange}>
            <img
              title={elem}
              src={"/img/" + elem + ".png"}
              alt={langNames[elem as langNamesType]}
            />
            <span title={elem} className="name">
              {langNames[elem as langNamesType]}
            </span>
          </div>
        ))}
      </ul>
    </div>
  );
};
