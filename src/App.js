import './scss/app.scss';
import Header from './components/header/Header';
import Sort from './components/sort/Sort';
import Categories from './components/categories/Categories';
import PizzaItem from './components/pizza-item/PizzaItem';
import pizzas from './assets/pizza.json';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              pizzas.map((data) => (
                <PizzaItem {...data} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
