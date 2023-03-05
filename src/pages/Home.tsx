import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Sceleton from "../components/Sceleton";
import Item from "../components/Item";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { setFilters } from "../redux/filter/slice";

import { fetchItems } from "../redux/items/slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectFilter } from "../redux/filter/selectors";
import { selectItems } from "../redux/items/selectors";
import { SortByType } from "../redux/filter/types";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { activeCat, sortBy, categories, searchValue, sortByArr } =
    useAppSelector(selectFilter);
  const { elements, status } = useAppSelector(selectItems);

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortBy = sortByArr.find(
        (obj: SortByType) =>
          obj.sort === params.sortBy && obj.line === params.order
      );
      if (typeof params.activeCat === "string" && sortBy) {
        dispatch(setFilters({ activeCat: params.activeCat, sortBy }));
      }
      isSearch.current = true;
    }
  }, [sortByArr, dispatch]);

  React.useEffect(() => {
    window.scroll(0, 0);
    if (!isSearch.current) {
      dispatch(fetchItems({ activeCat, sortBy, searchValue }));
    }
    isSearch.current = false;
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

  const generateKey = (pre: string) => {
    return `${pre}_${new Date().getTime()}`;
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">{categories[activeCat]}</h2>

      {status === "rejected" ? (
        <div>
          <h2>Something went wrong 😕</h2>
          <p>try again later</p>
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
