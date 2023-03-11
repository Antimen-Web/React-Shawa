import React from "react";

import { Item, Categories, Sort, Sceleton } from "../components";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { setFilters } from "../redux/filter/slice";

import { fetchItems } from "../redux/items/slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectFilter } from "../redux/filter/selectors";
import { selectItems } from "../redux/items/selectors";
import { SortByType } from "../redux/filter/types";
import { t } from "i18next";
import { generateKey } from "../utils/";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { activeCat, sortBy, categories, searchValue, sortByArr } =
    useAppSelector(selectFilter);
  const { elements, status } = useAppSelector(selectItems);

  const isFromUrl = React.useRef(false);
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    const params = qs.parse(window.location.search.substring(1));
    const sortBy = sortByArr.find(
      (obj: SortByType) =>
        obj.sort === params.sortBy && obj.line === params.order
    );
    if (typeof params.activeCat === "string" && sortBy) {
      dispatch(setFilters({ activeCat: params.activeCat, sortBy }));
    }
    isFromUrl.current = Boolean(window.location.search);
  }, [sortByArr, dispatch]);

  React.useEffect(() => {
    window.scroll(0, 0);
    if (!isFromUrl.current) {
      dispatch(fetchItems({ activeCat, sortBy, searchValue }));
    }
    isFromUrl.current = false;
  }, [activeCat, sortBy, searchValue, dispatch]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortBy: sortBy.sort,
        order: sortBy.line,
        activeCat,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [activeCat, sortBy, navigate]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">{categories[activeCat]}</h2>

      {status === "rejected" ? (
        <div>
          <h2>{t("home_rejected1")}</h2>
          <p>{t("home_rejected2")}</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "pending"
            ? [...Array(8)].map((_, i) => <Sceleton key={i} />)
            : elements.map((obj) => (
                <Item {...obj} key={generateKey(obj.id)} />
              ))}
        </div>
      )}
    </div>
  );
};

export default Home;
