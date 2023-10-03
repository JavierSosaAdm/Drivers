import { useNavigate } from 'react-router-dom';
const Card = ({driver}) => {
    const navigate = useNavigate();
    const {image, name, lastName, teams} = driver;

    function handlerNavigate () {
        navigate(`/detail/${id}`);
    }

    return (
        <div>
            <p>{name}</p>
            <p>{lastName}</p>
            <img src={image} alt="imagn del piloto" />
            <p>Escuderías: {teams}</p>
            <button onClick={handlerNavigate}>Ver detalles</button>
        </div>
    )
};

export default Card;