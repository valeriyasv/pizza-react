import styles from './Search.module.scss';

function Search({ valueSearch, setValueSearch }) {
  return (
    <div className={styles.root}>
       <svg className={styles.searchIcon} fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>
       <input className={styles.input} placeholder="Поиск ..." 
        value={valueSearch}
        onChange={e => setValueSearch(e.target.value)} />
        {valueSearch && 
          <svg onClick={() => setValueSearch('')} className={styles.closeIcon} data-name="Capa 1" id="Capa_1" viewBox="0 0 20 19.84" xmlns="http://www.w3.org/2000/svg"><path d="M10.17,10l3.89-3.89a.37.37,0,1,0-.53-.53L9.64,9.43,5.75,5.54a.37.37,0,1,0-.53.53L9.11,10,5.22,13.85a.37.37,0,0,0,0,.53.34.34,0,0,0,.26.11.36.36,0,0,0,.27-.11l3.89-3.89,3.89,3.89a.34.34,0,0,0,.26.11.35.35,0,0,0,.27-.11.37.37,0,0,0,0-.53Z"/></svg>
        }
    </div>
  )
}

export default Search;
