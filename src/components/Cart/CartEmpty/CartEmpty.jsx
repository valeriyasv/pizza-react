import React from 'react'
import { Link } from 'react-router-dom';
import Header from '../../Header/Header';

import cartEmptyImg from '../../../assets/img/empty-cart.png';

function CartEmpty() {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div class="content">
          <div class="container container--cart"></div>
            <div class="cart cart--empty">
              <h2>Корзина пустая <icon>😕</icon></h2>
              <p>
                Вероятней всего, вы не заказывали ещё пиццу.<br />
                Для того, чтобы заказать пиццу, перейди на главную страницу.
              </p>
              <img src={cartEmptyImg} alt="Empty cart" />
              <Link to="/" class="button button--black">
                <span>Вернуться назад</span>
              </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartEmpty;
