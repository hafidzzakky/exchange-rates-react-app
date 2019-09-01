import {
    GET_ALL_LATEST_RATE,
    GET_ALL_LATEST_RATE_SUCCESS,
    GET_ALL_LATEST_RATE_FAIL,
    CHANGE_INITIAL_VALUE,
    SUBMIT_RATES_VALUE,
    REMOVE_RATES_VALUE
} from '../Actions/types';

const INITIAL_STATE = {
    data: [],
    rates: [],
    selectedRates:[],
    error: '',
    initial: 10,
    loading: false
};

const removeElement = (array, elem) => {
    var index = array.indexOf(elem);
    if (index > -1) {
        array.splice(index, 1);
    }
}

const arrayRemains = (array, arraySelected) => {
    // array = array.filter((item) => {
    //     return !arraySelected.includes(item);
    // })
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case GET_ALL_LATEST_RATE:
            return { ...state, error: '', loading: true};
        case GET_ALL_LATEST_RATE_SUCCESS:
            return { ...state, data: action.payload, rates: action.payload.rates, loading: false};
        case GET_ALL_LATEST_RATE_FAIL:
            return { ...state, error: 'Terjadi Kesalahan Sistem', loading: false};
        case CHANGE_INITIAL_VALUE:
            return { ...state, initial: action.payload};
        case SUBMIT_RATES_VALUE:
            return { ...state, selectedRates: [...state.selectedRates, action.payload] };
        case REMOVE_RATES_VALUE:
            console.log('index ke : ', action.payload);
            return { ...state, selectedRates: [...state.selectedRates.slice(0, action.payload), ...state.selectedRates.slice(action.payload+1)]};
        default:
            return state;
    }
};