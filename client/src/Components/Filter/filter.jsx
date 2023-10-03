import { useSelector, useDispatch} from 'react-redux'; 
import { useState } from 'react';
import Cards from '../Cards/cards';
import { filter } from '../../Redux/Actions';

const Filter = () => {
    const allDrivers = useSelector(state => state.allDrivers);
    const allTeams = useSelector(state => state.allTeams);
    const [filtrado, setFiltrado] = useState('');
    const dispatch = useDispatch();

    const handlerChange = (e) => {
        setFiltrado(e.target.value)
    };

    const filteredDrivers = filtrado
    ? allDrivers.filter((driver) => driver.teams?.includes(filtrado))
    : allDrivers
    console.log(filteredDrivers);

    return (
        <div>
            <label htmlFor="teams">Filtrar por Escudería: </label>
                <select name="" id="" onChange={handlerChange} value={filtrado}>
                    <option value="">
                        Select
                    </option>
                    {allTeams.map((team) => {
                        return (
                            <option value={team.name} key={team.name}>
                                {team.name}
                            </option>
                        )
                    })}
                </select>
            <Cards filteredDrivers={filteredDrivers}/>
        </div>
    )
};

export default Filter;