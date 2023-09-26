import {
     POST_DRIVERS,
     GET_ALL_DRIVERS,
     GET_TEAMS,
     GET_BY_NAME,
     GET_BY_ID,
     ORDER_BY_ASC,
     FILTER_BY_TEAM,
     FILTER_BY_CREATED
 } from './ActionsTypes'

 let initialState = { 
    allDrivers: [], 
    allTeams: [], 
    detail: [], 
    copyAllDrivers: [],
    name: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DRIVERS:
            return {
                ...state,
                allDrivers: action.payload,
                copyAllDrivers: action.payload
            };
        case GET_BY_NAME:
            return {
                ...state,
                allDrivers: action.payload
            }
        case GET_BY_ID: 
            return {
                ...state,
                detail: action.payload
            }
        case POST_DRIVERS: 
            return {
                ...state,
                allDrivers: action.payload,
                copyAllDrivers: action.payload
            }
        case GET_TEAMS:
            return {
                ...state,
                allTeams: action.payload
            };
        default:
            return {...state};
    }
};

export default rootReducer;