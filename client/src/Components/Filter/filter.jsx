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

    const handlerChange = (e) => {
        setFiltrado(e.target.value)
    };

    const filteredDrivers = filtrado
    ? allDrivers.filter((driver) => driver.teams?.includes(filtrado))
    : allDrivers
    
    const sortedCards = sortOrder === 'ASC' ? allDrivers : allDrivers.slice().reverse(); 
    
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
            <div>
                <label>Ordenar por nombre: </label>
                <button onClick={handlerSortASC}>Ascendente</button>
                <button onClick={handlerSortDESC}>Descendente</button>
            </div>
            <div>
                <label>Ordenar por nacimiento: </label>
                <button onClick={handlerSortDateASC}>Ascendente</button>
                <button onClick={handlerSortDateDESC}>Descendente</button>
            </div>
                
            <Cards filteredDrivers={filteredDrivers} sortedCards={sortedCards}/>
        </div>
    )
};

export default Filter;