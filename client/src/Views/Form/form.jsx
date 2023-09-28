import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import create from '../../Redux/Actions'

const Form = () => {
    const link = 'http://localhost:30001'
    const dispatch = useDispatch();
    const [allTeams, setAllTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState([]);

    useEffect(() => {
        axios(`${link}/teams`)
        .then(({data}) => {
            if (data) {
                selectedTeam(data)
            } else {
                window.alert('error de solicitud')
            }
        }).catch((error) => {console.log(error);})
    }, []);

    const [form, setForm] = useState({
        name: '',
        lastName: '',
        description: '',
        image: '',
        nationality: '',
        birthdate: '',
        teams: []
    });

    let [errors, setErrors] = useState({});

    function handlerFormChange (event) {
        if (event.target) {
            const name = event.target.name;
            const value = event.target.value;

            setForm({
                ...form,
                [name]: value // bindear los event.target.value del estado y de los input (para evitar cambios)
            });

            validates({
                ...form,
                [name]: value
            }, errors, setErrors);
        };
    };

    function handlerSelectChance (event) {
        if (selectedTeam.length > 0) {
            return
        }

        selectedTeam((prev) => [...prev, event.target.value])
        setForm(prev => ({...prev, teams: [...prev.teams, event.target.value]}))
    }

    function handlerSumit (event) {
        event.preventDefault();
        dispatch(create(form))
    };

    return(
        <h1>Aquí va el formulario de creación</h1>
    )
};

export default Form;