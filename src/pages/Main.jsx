import React from 'react';

import Header from '../components/Header/Header';
import Sort from '../components/Sort/Sort';
import Categories from '../components/Categories/Categories';
import PizzaItem from '../components/Pizza-block/PizzaItem';
import Skeleton from '../components/Pizza-block/Skeleton';

import '../scss/app.scss';
import Pagination from '../components/Pagination/Pagination';

export const SearchContext = React.createContext();

function Main() {

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating'
  });
  const [valueSearch, setValueSearch] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  
  React.useEffect(() =>  {
    setIsLoading(true);
    
    const search = valueSearch ? `&search=${valueSearch}` : '';
    const removeSign = sortType.sortProperty.replace('-', '');
    const replaceSortMethod = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const categoriesCheck = categoryId > 0 ? `category=${categoryId}` : '';
    
    fetch(`https://6593198fbb12970719905dff.mockapi.io/items?page=${currentPage}&limit=4&${categoriesCheck}&sortBy=${removeSign}&order=${replaceSortMethod}${search}`
    )
    .then((res) => res.json())
    .then((arr) => {
      setPizzas(arr);
      setIsLoading(false);
    });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, valueSearch, currentPage]);
  
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i}/>);
  const pizzasItems = pizzas.map((data) => (
    <PizzaItem key={data.id} {...data} />
  ));
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{valueSearch, setValueSearch}}>
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
          isLoading ? skeletons : pizzasItems
        }
        </div>
        <Pagination onChangePage={(num) => setCurrentPage(num)}/>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default Main;
