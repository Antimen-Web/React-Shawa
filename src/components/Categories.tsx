import React from "react";
import { selectFilter, setActiveCategory } from "./redux/slices/filterSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

const Categories: React.FC = () => {
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

export default Categories;
