import React from 'react';

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
        <div>
            <h3>Pagina: {currentPage}</h3>
            <p>de: {max}</p>
            <button onClick={prevHandler} >Prev</button>
            <button onClick={nextHandler} >Next</button>
        </div>
    )
};

export default Paginado;