
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { create, getTeams } from '../../Redux/Actions';
import validates from './validates';
import style from './form.module.css';
const Form = () => {

    const dispatch = useDispatch();
    const allTeams = useSelector((state) => state.allTeams)
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState([]);

    useEffect(() => {

       dispatch(getTeams())
    }, [dispatch]);

    const [form, setForm] = useState({
        name: '',
        lastName: '',
        description: '',
        image: '',
        nationality: '',
        birthdate: '',
        teams: []
    });

    let [errors, setErrors] = useState({
        name: '',
        lastName: '',
        description: '',
        image: '',
        nationality: '',
        birthdate: '',
        teams: '',
    });

    const [isFormValid, setIsFormValid] = useState(false);

    function handlerFormChange (event) {
        if (event.target) {
            const name = event.target.name;
            const value = event.target.value;

            setForm({
                ...form,
                [name]: value // bindear los event.target.value del estado y de los input (para evitar cambios)
            });

            const newErrors = { ...errors };

            validates({
                ...form,
                [name]: value
            }, 
            newErrors,
            setErrors
            );
            const hasErrors = Object.values(newErrors).some((error) => error !== '');
            setIsFormValid(!hasErrors);
        };
    };

    function handlerSelectChance (event) {
        if (form.teams.length > 2) {
            return;
        }

        setForm((prev) => ({
            ...prev,
             teams: [...prev.teams, event.target.value],
            }));
    }

    function handlerSubmit (event) {
        event.preventDefault();
        
        if (
            !form.name ||
            !form.lastName ||
            !form.description ||
            !form.image ||
            !form.nationality ||
            !form.birthdate ||
            !form.image
        ) {
            alert('Por favor completa todos los campos')
            return;
        } 
        dispatch(create(form));
    };
    

    return(
        <div>
            <h1>Formulario de creación del corredor</h1>
            <Link to='/home'>
                <button className={style.button} >Volver al menú pricipal</button>
            </Link>
            <form onSubmit={handlerSubmit} className={style.form} >
                <label htmlFor="name" className={style.label} >Nombre: </label>
                <input required className={style.formInput} type="text" id='' value={form.name} name='name' placeholder='Escribir nombre...' onChange={handlerFormChange} />
                {errors.name !== '' ? <span>{errors.name}</span> : ''}
                <hr />
                <label htmlFor="lastName" className={style.label} >Apellido: </label>
                <input required className={style.formInput} type="text" id='' value={form.lastName} name='lastName' placeholder='Escribir apellido...' onChange={handlerFormChange} />
                {errors.lastName !== '' ? <span>{errors.lastName}</span> : ''}
                <hr />
                <label htmlFor="nationality" className={style.label} > Nacionalidad: </label>
                <input required className={style.formInput} type="text" id='' value={form.nationality} name='nationality' placeholder='Agregar nacionalidad...' onChange={handlerFormChange} />
                {errors.nationality !== '' ? <span>{errors.nationality}</span> : ''}
                <hr />
                <label htmlFor="birthdate" className={style.label} >Fecha de Nacimiento: </label>
                <input required className={style.formInput} type="text" id='' value={form.birthdate} name='birthdate' placeholder='Colocar fecha...' onChange={handlerFormChange} />
                {errors.birthdate !== '' ? <span>{errors.birthdate}</span> : ''}
                <hr />
                <label htmlFor="image" className={style.label} >Imagen: </label>
                <input required className={style.formInput} type="text" id='' value={form.image} name='image' placeholder='Link de imagen...' onChange={handlerFormChange} />
                {errors.image !== '' ? <span>{errors.image}</span> : ''}
                <hr />
                <label htmlFor="teams" className={style.label} >Escudería/as: </label>
                <select onChange={handlerSelectChance}>
                    <option>
                        Select
                    </option>
                    {allTeams?.map((teams) => {
                        return (
                            <option value={teams.id} key={teams.id} >
                                {teams.name}
                            </option>
                        )
                    })}
                </select>
                {errors.teams === '' ? <span>{errors.teams}</span> : ''}
                <hr />
                <label htmlFor="description" className={style.label} >Descripción: </label>
                <input required className={style.formInput} type="text" id='' value={form.description} name='description' placeholder='Breve descripción...' onChange={handlerFormChange}/>
                {errors.description !== '' ? <span>{errors.description}</span> : ''}
                <hr />
                <button className={style.button} type='submit' disabled={!isFormValid} >Crear Piloto</button>
            </form>
        </div>
    )
};

export default Form;