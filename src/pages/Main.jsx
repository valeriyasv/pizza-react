import React from 'react';

import Header from '../components/header/Header';
import Sort from '../components/sort/Sort';
import Categories from '../components/categories/Categories';
import PizzaItem from '../components/pizza-block/PizzaItem';
import Skeleton from '../components/pizza-block/Skeleton';

import '../scss/app.scss';

function Main() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating'
  });

  React.useEffect(() =>  {
    setIsLoading(true);
    fetch(`https://6593198fbb12970719905dff.mockapi.io/items?${categoriesCheck}&sortBy=${removeSign}&order=${replaceSortMethod}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setPizzas(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  const removeSign = sortType.sortProperty.replace('-', '');
  const replaceSortMethod = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
  const categoriesCheck = categoryId > 0 ? `category=${categoryId}` : '';

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
        <div className="content__top">
          <Categories categoryId={categoryId} onClickCategories={(id) => setCategoryId(id)} />
          <Sort value={sortType} onChangeSort={(i) => setSortType(i)}/>
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
      {
        isLoading ? [...new Array(6)].map((_, i) => <Skeleton key={i}/>) :
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

export default Main;
