import React from "react";
import { setSortBy } from "../redux/filter/slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectFilter } from "../redux/filter/selectors";
import { SortByType } from "../redux/filter/types";
import { t } from "i18next";

export const Sort: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sortByArr, sortBy } = useAppSelector(selectFilter);
  const [popup, showPopup] = React.useState<boolean>(false);
  const popupRef = React.useRef<HTMLDivElement>(null);

  const handleClick = React.useCallback((event: MouseEvent) => {
    if (popupRef.current && !event.composedPath().includes(popupRef.current)) {
      showPopup((popup) => popup && !popup);
    }
  }, []);

  React.useEffect(() => {
    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  return (
    <div className="sort" ref={popupRef} data-testid="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>{t(`sort_by`)}</b>
        <span onClick={() => showPopup(!popup)} data-testid="active_sort">
          {sortBy.name}
        </span>
      </div>
      <div
        className={popup ? "sort__popup" : "sort__popup collapsed"}
        data-testid="list_sort"
      >
        <ul>
          {sortByArr.map((obj: SortByType, index: number) => (
            <li
              key={index}
              className={sortBy.name === obj.name ? "active" : ""}
              onClick={() => {
                dispatch(setSortBy(obj));
                showPopup(!popup);
              }}
            >
              {obj.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
