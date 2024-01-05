import Header from "../../components/header/Header";
import styles from './Cart.module.scss';

function Cart() {
  return (
    <div className="wrapper">
      <Header />
      <div className={styles.root}>
        <h1>Корзина</h1>
      </div>
    </div>
  )
}

export default Cart;
