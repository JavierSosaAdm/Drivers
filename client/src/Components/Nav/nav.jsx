import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { getByName } from '../../Redux/Actions'

const Nav = () => {
    const [searchString, setSearchString] = useState('');
    const dispatch = useDispatch();

    const handlerChange = (e) => {
        e.priventDefault();
        setSearchString(e.target.value);
    };

    const handlerSubmit = (e) => {
        e.priventDefault();
        dispatch(getByName(searchString));
    };



    return (
        <div>
            <Link to='/form' >
                <button>CREAR PILOTO</button>
            </Link>
            <form onChange={handlerChange} >
                <input placeholder='Busqueda' type="search"/>
                <button type='submit' onClick={handlerSubmit}>Buscar</button>
            </form>
        </div>
    )
};

export default Nav;