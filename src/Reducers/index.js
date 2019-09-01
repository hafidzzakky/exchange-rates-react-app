import {combineReducers} from 'redux';
import ExchangeRates from './exchangeRatesReducer';
export default combineReducers({
    ExchangeRates      : ExchangeRates
})