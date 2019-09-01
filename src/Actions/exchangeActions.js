import {
    GET_ALL_LATEST_RATE,
    GET_ALL_LATEST_RATE_SUCCESS,
    GET_ALL_LATEST_RATE_FAIL,
    CHANGE_INITIAL_VALUE,
    SUBMIT_RATES_VALUE,
    REMOVE_RATES_VALUE
} from './types';

const baselink = 'https://api.exchangeratesapi.io/';

export const getAllExchangeRates = () => {
    return(dispatch) => {
        dispatch({ type: GET_ALL_LATEST_RATE });
        //post method
        fetch(`${baselink}latest/?base=USD`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        .then(response => response.json())
        .then((data) => {
            dispatch({ type: GET_ALL_LATEST_RATE_SUCCESS, payload: data }); 
            console.log(data);
        })
        .catch((error) => {
            dispatch({ type : GET_ALL_LATEST_RATE_FAIL });
            console.log('error get all exchange rates');
        });
    };
};

export const changeInitialValue = (text) => {
    return(dispatch) => {
        dispatch({type: CHANGE_INITIAL_VALUE, payload: text});
    }
}

const arrayRemains = (array, arraySelected) => {
    array = array.filter((item) => {
        return !arraySelected.includes(item);
    })
}

export const insertRates = (rates, array) => {
    delete array[rates[0]]; 
    return(dispatch) => {
        console.log(delete array[rates[0]]);
        dispatch({type: SUBMIT_RATES_VALUE, payload: {rates: rates[0], value: rates[1], newRates: array}});
    }
}

export const removeRates = (index, removedItem, array) => {
    console.log('rates : ', index);
    console.log('array : ', array);
    array[removedItem[0]] = parseFloat(removedItem[1]);
    return(dispatch) => {
        dispatch({type: REMOVE_RATES_VALUE, payload: index});
    }
}