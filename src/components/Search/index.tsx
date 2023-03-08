import React from "react";
import styles from "./Search.module.scss";
import { debounce } from "lodash";
import { useAppDispatch } from "../../redux/hooks";
import { setSearchValue } from "../../redux/filter/slice";
import { t } from "i18next";

export const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState<string>("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onClickChange = React.useCallback(
    debounce((str: string) => dispatch(setSearchValue(str)), 200),
    [setValue]
  );

  const onClickClear = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    inputRef.current?.focus();
    onClickChange(event.target.value);
  };

  return (
    <input
      ref={inputRef}
      className={styles.root}
      placeholder={t(`search`)}
      value={value}
      type="search"
      onChange={(event) => onClickClear(event)}
    />
  );
};
