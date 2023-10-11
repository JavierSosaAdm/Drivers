import React from 'react';
import style from './paginado.module.css'

const Paginado = ({currentPage, setCurrentPage, max}) => {
    const prevHandler = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    };

    const nextHandler = () => {
        if (currentPage < max) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div  >
            <div className={style.div}>
                <h3>Pagina: {currentPage}</h3>
                <button onClick={prevHandler} className={style.button} >Prev</button>
                <button onClick={nextHandler} className={style.button} >Next</button>
                <p>de: {max}</p>

            </div>
        </div>
    )
};

export default Paginado;