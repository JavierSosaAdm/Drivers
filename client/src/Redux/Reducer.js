import {
     POST_DRIVERS,
     GET_ALL_DRIVERS,
     GET_TEAMS,
     GET_BY_NAME,
     GET_BY_ID,
     SORT_ASC,
     SORT_DESC,
     FILTER_BY_TEAM,
     FILTER_BY_CREATED,
     SORT_ASC_DATE,
     SORT_DESC_DATE
 } from './ActionsTypes'

 let initialState = { 
    allDrivers: [], 
    allTeams: [], 
    detail: [], 
    copyAllDrivers: [],
    name: [],
    sortOrder: 'ASC'
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DRIVERS:
            return {
                ...state,
                allDrivers: action.payload,
                copyAllDrivers: action.payload
            }
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
            }
        case SORT_ASC:
            return {
                ...state,
                allDrivers: state.allDrivers.slice().sort((a, b) => a.lastName.localeCompare(b.lastName)),
                sortOrder: 'ASC'
            }
        case SORT_DESC:
            return {
                ...state,
                allDrivers: state.allDrivers.slice().sort((a, b) =>b.lastName.localeCompare(a.lastName)),
                sortOrder: 'DESC'
            }
        case SORT_ASC_DATE:
            return {
                ...state,
                allDrivers: state.allDrivers.slice().sort((a, b) => a.birthdate.localeCompare(b.birthdate)),
                sortOrder: 'ASC'
            }
        case SORT_DESC_DATE:
            return {
                ...state,
                allDrivers: state.allDrivers.slice().sort((a, b) => b.birthdate.localeCompare(a.birthdate)),
            }

        default:
            return {...state};
    }
};

export default rootReducer;