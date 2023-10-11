import Card from '../Card/card';
import Paginado from '../Paginado/paginado';
import { useState } from 'react';
import style from './cards.module.css';


const Cards = ({filteredDrivers, sortedCards, filteredOrigin}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [items, setItems] = useState(9);
    const max = Math.ceil(filteredDrivers.length / items);

    const driversConbinados = filteredOrigin.length > 0 ? filteredOrigin : filteredDrivers;
    
    return (
        <div className={style.divContainer} >
            <div className={style.paginado}>
                <Paginado currentPage={currentPage} setCurrentPage={setCurrentPage} max={max} driversConbinados={driversConbinados}/>
            </div>

            <div className={style.container} >
                {driversConbinados? driversConbinados.slice((currentPage - 1) * items, (currentPage - 1)* items + items).map((driver) => (
                    <li key={driver.id}>
                     <Card driver={driver}/>
                 </li>
               )) : sortedCards?.slice((currentPage - 1) * items, (currentPage - 1)* items + items).map((driver) => (
                  <li key={driver.id}>
                     <Card driver={driver}/>
                 </li>
              ))}
            </div>
        </div>
    )
};

export default Cards;