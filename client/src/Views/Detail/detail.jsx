import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { getById } from '../../Redux/Actions';
import style from './detail.module.css'
const Detail = () => {
    const navigate = useNavigate();
    const locarion = useLocation();
    const dispatch = useDispatch();
    const {id} = useParams();
    const detail = useSelector(state => state.detail);

    const [driver, setDriver] = useState({});

    useEffect(() => {
        dispatch(getById(id))
    }, [id]);

    useEffect(()=> {
        setDriver(detail);
    }, [detail]);
    
    const handlerNavigate = () => {
        navigate('/home')
    };

   
    return(
        <div className={style.divContainer}>
            <h1>Detalles de pilotos</h1>
            <div className={style.div}>
                <h2>{driver?.name}</h2>
                <h2>{driver?.lastName}</h2>
                <img src={driver?.image} alt="Imagen del piloto" className={style.img} />
                <p>Escudería/as: {driver.team ? driver.team.map((team) => team.name).join(',') : driver.teams ? driver.teams : 'Piloto sin escudería'}</p>
                <p>Nacionalidad: {driver?.nationality}</p>
                <p>Fecha de nacimiento: {driver?.birthdate}</p>
                <p>Descripción: {driver?.description} </p>
                <button onClick={handlerNavigate} className={style.button}>Menú principal</button>
            </div>
        </div>
    )
};

export default Detail;