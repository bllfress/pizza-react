import { useAppSelector } from "@/hooks/redux";
import { getCartQnt, getTotalCartSum } from "@/store/cart/selectors";
import Image from "next/image";
import CartIcon from "public/svg/cart.svg";
import PizzaLogo from "public/svg/pizza-logo.svg";
import React, { FC } from "react";

const Header: FC = () => {
  const qnt = useAppSelector(getCartQnt);
  const cartPrice = useAppSelector(getTotalCartSum);

  return (
    <div className="header">
      <div className="container">
        <div className="header__logo">
          <Image width="38" src={PizzaLogo} alt="Pizza logo" />
          <div>
            <h1>React Pizza</h1>
            <p>самая вкусная пицца во вселенной</p>
          </div>
        </div>
        <div className="header__cart">
          <a href="/cart.html" className="button button--cart">
            <span>{cartPrice} ₽</span>
            <div className="button__delimiter"></div>
            <Image src={CartIcon} alt="Cart icon" />
            <span>{qnt}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
