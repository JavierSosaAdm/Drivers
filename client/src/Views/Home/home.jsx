import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getTeams, getDrivers } from '../../Redux/Actions'; 
import Nav from '../../Components/Nav/nav';
import Filter from '../../Components/Filter/filter';
import style from './home.module.css';

const Home = () => {

    const allDrivers = useSelector((state) => state.allDrivers);
    const [totalDrivers, setTotalDrivers] = useState([]);
    
    const dispatch = useDispatch();
    

    useEffect(()=> {
        setTotalDrivers(allDrivers);
        dispatch(getDrivers());
    }, []);

    useEffect(()=> {
        dispatch(getTeams())
    }, []);

    return (
        <div className={style.div} >
            <h1>Home</h1>
            <Nav/>
            <Filter/>
        </div>
    )
};

export default Home;