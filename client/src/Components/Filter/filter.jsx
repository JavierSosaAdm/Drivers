import { useSelector, useDispatch} from 'react-redux'; 
import { useState } from 'react';
import Cards from '../Cards/cards';
import { filter } from '../../Redux/Actions';
import style from './filter.module.css';
import { sortASC, sortDESC, sortDateASC, sortDateDESC } from '../../Redux/Actions';

const Filter = () => {
    const allDrivers = useSelector(state => state.allDrivers);
    const allTeams = useSelector(state => state.allTeams);
    const sortOrder = useSelector(state => state.sortOrder);
    const [filtrado, setFiltrado] = useState('');
    const [origin, setOrigin] = useState('');
    const dispatch = useDispatch();

    const handlerSortDateASC = () => {
        dispatch(sortDateASC());
    };    

    const handlerSortDateDESC = () => {
        dispatch(sortDateDESC());
    };

    const handlerSortASC = () => {
        dispatch(sortASC());
    };    

    const handlerSortDESC = () => {
        dispatch(sortDESC());
    };

    const handlerFilterOrigin = (e) => {
        setOrigin(e.target.value)
    };

    const handlerChange = (e) => {
        setFiltrado(e.target.value)
    };

    const filteredDrivers = filtrado
    ? allDrivers.filter((driver) => driver.teams?.includes(filtrado))
    : allDrivers
       
    let filteredOrigin = [...filteredDrivers];

    if (origin === 'numeric') {
        filteredOrigin = filteredDrivers.filter((driver) => typeof driver.id === 'number');
    } else if (origin === 'uuid') {
        filteredOrigin = filteredDrivers.filter((driver) => typeof driver.id !== 'number');
    }
    
    const sortedCards = sortOrder === 'ASC' ? filteredDrivers : filteredDrivers.slice().reverse(); 
    
    return (
        <div className={style.div} >
            <label className={style.label} htmlFor="teams">Filtrar por Escudería: </label>
                <select onChange={handlerChange} value={filtrado}>
                    <option value="">
                        Select
                    </option>
                    {allTeams.map((team) => {
                        return (
                            <option value={team.name} key={team.id}>
                                {team.name}
                            </option>
                        )
                    })}
                </select>
            <label htmlFor="origin">Filtrar por Origen: </label>
                <select onChange={handlerFilterOrigin} value={origin}>
                    <option value="">Seleccionar origen</option>
                    <option value="numeric">API</option>
                    <option value="uuid">DATABASE</option>
                </select>

            <div>
                <label>Ordenar por nombre: </label>
                <button onClick={handlerSortASC}>A-Z</button>
                <button onClick={handlerSortDESC}>Z-A</button>
            </div>
            <div>
                <label>Ordenar por nacimiento: </label>
                <button onClick={handlerSortDateASC}>Ascendente</button>
                <button onClick={handlerSortDateDESC}>Descendente</button>
            </div>
                
            <Cards filteredDrivers={filteredDrivers} sortedCards={sortedCards} filteredOrigin={filteredOrigin}/>
        </div>
    )
};

export default Filter;