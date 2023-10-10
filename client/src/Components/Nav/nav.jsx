import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState, useEffect} from 'react';
import { getByName } from '../../Redux/Actions'

const Nav = () => {
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    const handlerChange = (e) => {
        // e.priventDefault();
        setName(e.target.value);
    };

    const handlerSubmit = () => {
        e.priventDefault();
        setName('')
    };
    
    useEffect(() => {
        if (name) {
            dispatch(getByName(name));
        }
    }, [name, dispatch])

    return (
        <div>
            <Link to='/form' >
                <button>CREAR PILOTO</button>
            </Link>
            <form >
                <input placeholder='Busqueda' type="search"  onChange={handlerChange} />
                <button type='submit' onClick={handlerSubmit}>Buscar</button>
            </form>
        </div>
    )
};

export default Nav;