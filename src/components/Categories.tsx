import React from "react";
import { setActiveCategory } from "../redux/filter/slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectFilter } from "../redux/filter/selectors";

export const Categories: React.FC = () => {
  const dispatch = useAppDispatch();

  const { activeCat, categories } = useAppSelector(selectFilter);

  return (
    <div className="categories">
      <ul>
        {categories.map((value: string, index: number) => (
          <li
            key={index}
            onClick={() => dispatch(setActiveCategory(index))}
            className={activeCat === index ? "active" : ""}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};
