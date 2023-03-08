import React from "react";
import { addItem } from "../redux/cart/slice";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectCart } from "../redux/cart/selectors";
import { t } from "i18next";

export type ItemProps = {
  key: string;
  id: string;
  title: string;
  image: string;
  price: number;
  types: number[];
  sizes: number[];
  spicy: number[];
  count: number;
  weight: number;
};

export const Item: React.FC<ItemProps> = ({
  id,
  title,
  image,
  price,
  types,
  sizes,
  spicy,
  weight,
}) => {
  const dispatch = useAppDispatch();
  const { items, typesName, spicyName } = useAppSelector(selectCart);
  const [activeSpicy, activeSpicySet] = React.useState<number>(0);
  const [activeTypes, activeTypesSet] = React.useState<number>(0);
  const [activeSizes, activeSizesSet] = React.useState<number>(
    sizes && sizes[0]
  );

  React.useEffect(() => {
    if (types) {
      activeTypesSet(types[0]);
    }
  }, [types]);

  const generateKey = (pre: string) => {
    return `${pre}_${new Date().getTime()}`;
  };

  const onClickAdd = () => {
    spicy &&
      dispatch(
        addItem({
          id,
          title,
          image,
          price,
          spicy: activeSpicy,
          weight,
          count: 1,
          key: generateKey(id),
        })
      );
    sizes &&
      dispatch(
        addItem({
          id,
          title,
          image,
          price,
          type: activeTypes,
          size: activeSizes,
          weight,
          count: 1,
          key: generateKey(id),
        })
      );
  };

  let countItem = 0;

  items.map((i: { id: string; count: number }) => {
    if (i.id === id) {
      countItem += i.count;
    }
    return countItem;
  });

  return (
    <div className="pizza-block">
      <Link to={"/item/" + id}>
        <img className="pizza-block__image" src={"/img/" + image} alt={title} />
        <h4 className="pizza-block__title">{title}</h4>
      </Link>
      <div className="pizza-block__selector">
        {spicy && (
          <ul>
            {spicy.map((spicy, i) => (
              <li
                key={i}
                onClick={() => activeSpicySet(i)}
                className={activeSpicy === i ? "active" : ""}
              >
                {spicyName[spicy]}
              </li>
            ))}
          </ul>
        )}
        {types && (
          <ul>
            {types.map((type, i) => (
              <li
                key={i}
                onClick={() => activeTypesSet(type)}
                className={activeTypes === type ? "active" : ""}
              >
                {typesName[type]}
              </li>
            ))}
          </ul>
        )}
        {sizes && (
          <ul>
            {sizes.map((value, index) => (
              <li
                key={index}
                onClick={() => activeSizesSet(value)}
                className={activeSizes === value ? "active" : ""}
              >
                {value} {t(`cm`)}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">
          {t(`from`)} {price}$
        </div>
        <div
          onClick={onClickAdd}
          className="button button--outline button--add"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>{t(`add`)}</span>
          <i>{countItem}</i>
        </div>
      </div>
    </div>
  );
};
