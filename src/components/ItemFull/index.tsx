import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ItemFull.module.scss";
import {
  addItem,
  hidePopup,
  selectCart,
  showPopup,
} from "../redux/slices/cartSlice";
import SceletonItem from "./SceletonItem";
import { ItemProps } from "../Item";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const ItemFull: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [item, setItem] = React.useState<ItemProps>();
  const { items, typesName, spicyName } = useAppSelector(selectCart);
  const [activeSpicy, activeSpicySet] = React.useState<number>(0);
  const [activeTypes, activeTypesSet] = React.useState<number>(0);
  const [activeSizes, activeSizesSet] = React.useState<number>(0);
  let [description, setDescription] = React.useState<string>("");

  async function fetchItem() {
    try {
      const { data } = await axios.get(
        "https://63c9588d904f040a965c1451.mockapi.io/items/" + id
      );
      setItem(data);
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  }

  React.useEffect(() => {
    fetchItem();
  }, []);

  React.useEffect(() => {
    if (item) {
      activeSizesSet(item.sizes && item.sizes[0]);
      if (item.types) {
        activeTypesSet(item.types[0]);
      }
    }
  }, [item]);

  React.useEffect(() => {
    if (item) {
      if (item.types) {
        setDescription(
          typesName[activeTypes] +
            ", " +
            activeSizes +
            ", " +
            item.weight +
            " g"
        );
      } else {
        setDescription(spicyName[activeSpicy] + ", " + item.weight + " g");
      }
    }
  }, [activeSpicy, activeSizes, activeTypes]);

  if (!item) {
    return <SceletonItem />;
  }

  const generateKey = (pre: string) => {
    return `${pre}_${new Date().getTime()}`;
  };

  const onClickAdd = () => {
    item.spicy &&
      dispatch(
        addItem({
          id: item.id,
          title: item.title,
          image: item.image,
          price: item.price,
          spicy: activeSpicy,
          weight: item.weight,
          count: 1,
          key: generateKey(item.id),
        })
      );
    item.sizes &&
      dispatch(
        addItem({
          id: item.id,
          title: item.title,
          image: item.image,
          price: item.price,
          type: activeTypes,
          size: activeSizes,
          weight: item.weight,
          count: 1,
          key: generateKey(item.id),
        })
      );

    navigate("/");
    dispatch(showPopup(item.title + ", " + description));
    setTimeout(() => {
      dispatch(hidePopup());
    }, 2000);
  };

  let countItem = 0;
  let double = items
    .map((i: { id: string; count: number }) => {
      if (i.id === id) {
        return (countItem += i.count);
      }
    })
    .reverse()[0];

  return (
    <div className={styles.item}>
      <img
        className={styles.image}
        src={"/img/" + item.image}
        alt={item.title}
      />
      <div className={styles.content}>
        <h4 className={styles.title}>{item.title}</h4>
        <p>{description}</p>
        <div className={styles.selectors}>
          {item.spicy && (
            <ul>
              {item.spicy.map((spicy, i) => (
                <li
                  key={i}
                  onClick={() => activeSpicySet(i)}
                  className={activeSpicy === i ? styles.active : ""}
                >
                  {spicyName[spicy]}
                </li>
              ))}
            </ul>
          )}
          {item.types && (
            <ul>
              {item.types.map((type, i) => (
                <li
                  key={i}
                  onClick={() => activeTypesSet(type)}
                  className={activeTypes === type ? styles.active : ""}
                >
                  {typesName[type]}
                </li>
              ))}
            </ul>
          )}
          {item.sizes && (
            <ul>
              {item.sizes.map((value, index) => (
                <li
                  key={index}
                  onClick={() => activeSizesSet(value)}
                  className={activeSizes === value ? styles.active : ""}
                >
                  {value} cm.
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <div className={styles.btn} onClick={onClickAdd}>
            Add to cart for {item.price}$
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemFull;
