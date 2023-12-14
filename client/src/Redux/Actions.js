import axios from 'axios';

// const link = 'http://localhost:3001';
// axios.defaults.baseURL = 'http://drivers-production.up.railway.app';

export const getDrivers = () => {
    return async (dispatch) => { // es un retorno de una arrow function asincrona donde se declara una variable 
                                 // y se hace el axios get al link/drivers y se retirna un dispatch donde debe haber un 
                                 // objeto con el type: 'GETlo que sea' y el payload: response data
        const response = await axios.get(`/drivers`)
        return dispatch({
            type: 'GET_ALL_DRIVERS',
            payload: response.data
        })
    }
};

export const getTeams = () => {
    return async (dispatch) => {
        const response = await axios.get(`/teams`)
        return dispatch({
            type: 'GET_TEAMS',
            payload: response.data
        })
    }
};

export const getByName = (name) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/search?name=${name}`)
                dispatch({
                    type: 'GET_BY_NAME',
                    payload: response.data
                })
        } catch (error) {
            console.log(error);
        }    
    }
};

export const getById = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`/drivers/${id}`)
        return dispatch({
            type: 'GET_BY_ID',
            payload: response.data
        })
    }
};

 export const create = (form) => {
    try {
        return async (dispatch) => {
            const response = await axios.post(`/drivers`, form)
            alert('el piloto fué creado correctamente');
            return dispatch({
                type: 'POST_DRIVERS',
                payload: response.data
            })
        }
    } catch (error) {
        alert('hubo un inconveniente, prueba nuevamete')
    }
};

export const filter = (e) => {
    return async (dispatch) => {
        return dispatch({
            type: 'FILTER_TEAMS',
            payload: e
        })
    }
};

export const filterOrigin = (e) => {
    return async (dispatch) => {
        return dispatch({
            type: 'FILTER_ORIGIN',
            payload: e
        })
    }
}
export const sortASC = () => ({
    type: 'SORT_ASC'
});

export const sortDESC = () => ({
    type: 'SORT_DESC'
});

export const sortDateASC = () => ({
    type: 'SORT_ASC_DATE'
})

export const sortDateDESC = () => ({
    type: 'SORT_DESC_DATE'
})