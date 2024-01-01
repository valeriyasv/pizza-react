import React from "react";

function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const onClickCategories = (index) => {
    setActiveIndex(index);
  }

  const categoriesList = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  return (
    <div className="categories">
      <ul>
      { categoriesList.map((item, i) => (
        <li key={i} onClick={() => onClickCategories(i)} className={activeIndex === i ? "active" : ''}>{item}</li>
      ))}
      </ul>
    </div>
  )
}

export default Categories;
