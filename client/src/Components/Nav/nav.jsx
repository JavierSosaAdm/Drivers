import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState, useEffect} from 'react';
import { getByName } from '../../Redux/Actions';
import style from './nav.module.css'

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
        <div className={style.div} >
            <Link to='/' >
                <button className={style.button} >LANDING</button>
            </Link>

            <Link to='/form' >
                <button className={style.buttonCrear} >CREAR PILOTO</button>
            </Link>
            <form >
                <input placeholder='Busqueda' type="search"  onChange={handlerChange} />
                <button className={style.button} type='submit' onClick={handlerSubmit}>CLEAN</button>
            </form>
        </div>
    )
};

export default Nav;