import axios from 'axios';

const link = 'http://localhost:3001';

export const getDrivers = () => {
    return async (dispatch) => {

        const response = await axios.get(`${link}/drivers`)
        return dispatch({
            type: 'GET_ALL_DRIVERS',
            payload: response.data
        })
    }
};

export const getTeams = () => {
    return async (dispatch) => {
        const response = await axios.get(`${link}/teams`)
        return dispatch({
            type: 'GET_TEAMS',
            payload: response.data
        })
    }
};

export const getByName = (name) => {
    return async (dispatch) => {
        const response = await axios.get(`${link}/search?name=${name}`)
        return dispatch({
            type: 'GET_BY_NAME',
            payload: response.data
        })
    }
};

const getById = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`${link}/drivers/${id}`)
        return dispatch({
            type: 'GET_BY_ID',
            payload: response.data
        })
    }
};

 export const create = (form) => {
    try {
        return async (dispatch) => {
            const response = await axios.post(`${link}/drivers`, form)
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

// export function (){
//     return async (dispatch) => {
//         const response = await axios.get()
//         return dispatch({

//         })
//     }
// };
export default { getByName, getById };
