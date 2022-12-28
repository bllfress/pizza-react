import { useAppDispatch } from "@/hooks/redux";
import { addItem } from "@/store/cart";
import { CartItem, PizzaModel } from "@/types/types";
import clsx from "clsx";
import Image from "next/image";
import Plus from "public/svg/plus.svg";
import React, { useMemo, useState } from "react";
import type { FC } from "react";

export interface PizzaCardProps {
  pizza: PizzaModel;
}

const SizeToCostMultiplier = new Map<number, number>([
  [26, 1],
  [30, 1.4],
  [40, 1.8],
]);

const PizzaCard: FC<PizzaCardProps> = ({ pizza }) => {
  const [activeDough, setActiveDough] = useState(pizza.types[0]);
  const [activeSize, setActiveSize] = useState(pizza.sizes[0]);
  const [activeCount, setActiveCount] = useState(1);
  const dispatch = useAppDispatch();

  const pizzaCost = useMemo(() => {
    // @ts-ignore
    return Math.floor(pizza.price * SizeToCostMultiplier.get(activeSize));
  }, [activeSize, pizza.price]);

  const onAddToCart = () => {
    dispatch(
      addItem({
        pizza,
        price: pizzaCost,
        dough: activeDough,
        size: activeSize,
        quantity: activeCount,
      })
    );
  };

  // TODO: Fix event propagation
  const handleIncreaseQnt = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setActiveCount((prev) => prev + 1);
  };

  return (
    <div className="pizza-block">
      <Image
        className="pizza-block__image"
        src={pizza.imageUrl}
        alt="Pizza"
        height={260}
        width={260}
      />
      <h4 className="pizza-block__title">{pizza.name}</h4>
      <div className="pizza-block__selector">
        <ul>
          <li
            className={clsx({
              disabled: !pizza.types.includes(0),
              active: activeDough === 0,
            })}
            onClick={() => {
              setActiveDough(0);
            }}
          >
            тонкое
          </li>
          <li
            className={clsx({
              disabled: !pizza.types.includes(1),
              active: activeDough === 1,
            })}
            onClick={() => {
              setActiveDough(1);
            }}
          >
            традиционное
          </li>
        </ul>
        <ul>
          {pizza.sizes.map((size) => (
            <li
              key={size}
              onClick={() => setActiveSize(size)}
              className={activeSize === size ? "active" : ""}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{`${pizzaCost} ₽`}</div>
        <div
          className="button button--outline button--add"
          onClick={onAddToCart}
        >
          <Image
            src={Plus}
            alt="plus icon"
            onClick={() => setActiveCount((prev) => prev + 1)}
          />
          <span>Добавить</span>
          <i>{activeCount}</i>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;
