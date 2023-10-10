import { useNavigate } from 'react-router-dom';
import style from './card.module.css'
const Card = ({driver}) => {
    const navigate = useNavigate();
    const {id, image, name, lastName, teams, team} = driver;

    function handlerNavigate () {
        navigate(`/detail/${id}`);
    }
    
    return (
        <div className={style.card} >
            <p className={style.name} >{name}</p>
            <p className={style.name} >{lastName}</p>
            <img className={style.cardImg} src={image} alt="imagn del piloto" />
            <p className={style.name} >Escuderías: {typeof teams === 'string' ? teams : team && Array.isArray(team) ? team.map((t) => t.name).join(', ') : 'No hay información disponible'}</p> 
            <button className={style.button} onClick={handlerNavigate}>Ver detalles</button>
        </div>
    )
};

export default Card;