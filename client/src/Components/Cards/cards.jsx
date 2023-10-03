import Card from '../Card/card';
import Paginado from '../Paginado/paginado';
import { useState } from 'react';
import style from './cards.module.css';


const Cards = ({filteredDrivers}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [items, setItems] = useState(9);
    const max = Math.ceil(filteredDrivers.length / items);

    return (
        <div className={style.container} >
            {filteredDrivers?.slice((currentPage - 1) * items, (currentPage - 1)* items + items).map((driver) => (
                <li key={driver.id}>
                    <Card driver={driver}/>
                </li>
            ))}
            <Paginado currentPage={currentPage} setCurrentPage={setCurrentPage} max={max} />
        </div>
    )
};

export default Cards;