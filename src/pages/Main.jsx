import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import Header from '../components/Header/Header';
import Sort, { listSort } from '../components/Sort/Sort';
import Categories from '../components/Categories/Categories';
import PizzaItem from '../components/Pizza-block/PizzaItem';
import Skeleton from '../components/Pizza-block/Skeleton';

import '../scss/app.scss';
import Pagination from '../components/Pagination/Pagination';
import { setCategoryId, setCurrentPage, setFilters} from '../redux/slices/filterSlice';
import axios from 'axios';

export const SearchContext = React.createContext({ valueSearch: '', setValueSearch: () => {} });


function Main() {
  const {categoryId, sort, currentPage} = useSelector(state => state.filter);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  }
  const [valueSearch, setValueSearch] = React.useState('');
  const fetchPizzas = useCallback(() => {
    setIsLoading(true);
    
    const search = valueSearch ? `&search=${valueSearch}` : '';
    const removeSign = sort.sortProperty.replace('-', '');
    const replaceSortMethod = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const categoriesCheck = categoryId > 0 ? `category=${categoryId}` : '';

    axios
      .get(`https://6593198fbb12970719905dff.mockapi.io/items?page=${currentPage}&limit=4&${categoriesCheck}&sortBy=${removeSign}&order=${replaceSortMethod}${search}`
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      })
  }, [categoryId, currentPage, sort.sortProperty, valueSearch]);
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  
  //Если был первый рендер проверяем URL-параметры и сохраняем в редуксе
  React.useEffect(() => {
    if(window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = listSort.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({
        ...params,
        sort,
      }))
      isSearch.current = true;
    }
  }, [])

//Если изменили параметры и был первый рендер  
  React.useEffect(() => {
    if(isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      })
      navigate(`?${queryString}`);
    }
    isMounted.current = true
  }, [categoryId, sort.sortProperty, valueSearch, currentPage, navigate])
  
  //Если был первый рендер то запрашиваем пиццы
  React.useEffect(() => {
    window.scroll(0, 0);

    if(!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, valueSearch, currentPage, navigate, fetchPizzas])

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i}/>);
  const pizzasItems = pizzas.map((data) => (
    <PizzaItem key={data.id} {...data} />
  ));

  const onChangePage = number => {
    setCurrentPage(number);
  }

  return (
    <div className="wrapper">
      {<SearchContext.Provider value={{valueSearch, setValueSearch}}>
        <Header />
        <div className="content">
          <div className="container">
          <div className="content__top">
            <Categories categoryId={categoryId} onClickCategories={onChangeCategory} />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
        {
          isLoading ? skeletons : pizzasItems
        }
        </div>
        <Pagination currentPageNumber={currentPage} onChangePage={onChangePage}/>
          </div>
        </div>
      </SearchContext.Provider>}
    </div>
  );
}

export default Main;
