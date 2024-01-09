import React from "react";

function Categories({categoryId, onClickCategories}) {

  const categoriesList = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  return (
    <div className="categories">
      <ul>
      { categoriesList.map((item, i) => (
        <li key={i} onClick={() => onClickCategories(i)} className={categoryId === i ? "active" : ''}>
          {item}
        </li>
      ))}
      </ul>
    </div>
  )
}

export default Categories;
