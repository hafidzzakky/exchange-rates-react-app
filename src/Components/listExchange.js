import React from 'react';
import { 
    Row,
    Col,
} from 'react-bootstrap';
import './listExchange.css';

const countValueByRates = (value, initial) => {
    return DigitGrouping(value * initial);
}

export const DigitGrouping = (value) => {
    let str = value.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1');
    }
    return str.join('.');
}

const ratesName = (rates) => {
    if(rates === 'CAD'){
        return 'Canadian Dollar'
    }else if(rates === 'IDR'){
        return 'Indonesian Rupiah'
    }else if(rates === 'GBP'){
        return 'British Pound'
    }else if(rates === 'CHF'){
        return 'Swiss Franc'
    }else if(rates === 'SGD'){
        return 'Singapore Dollar'
    }else if(rates === 'INR'){
        return 'Indian Rupee'
    }else if(rates === 'MYR'){
        return 'Malaysian Ringgit'
    }else if(rates === 'JPY'){
        return 'Japanese Yen'
    }else if(rates === 'KRW'){
        return 'South Korean Won'
    }else if(rates === 'HKD'){
        return 'Hong Kong Dollar'
    }else if(rates === 'ISK'){
        return 'Islandic Krona'
    }else if(rates === 'PHP'){
        return 'Philippine Peso'
    }else if(rates === 'DKK'){
        return 'Danish Krone'
    }else if(rates === 'HUF'){
        return 'Hungarian Forint'
    }else if(rates === 'CZK'){
        return 'Czech Koruna'
    }else if(rates === 'RON'){
        return 'Romanian Leu'
    }else if(rates === 'SEK'){
        return 'Swedish Krona'
    }else if(rates === 'BRL'){
        return 'Brazilian Real'
    }else if(rates === 'RUB'){
        return 'Russian Ruble'
    }else if(rates === 'HRK'){
        return 'Croatian Kuna'
    }else if(rates === 'THB'){
        return 'Thai Baht'
    }else if(rates === 'EUR'){
        return 'Euro'
    }else if(rates === 'BGN'){
        return 'Bulgarian Lev'
    }else if(rates === 'TRY'){
        return 'Turkish Lira'
    }else if(rates === 'CNY'){
        return 'Chinese Yuan Renminbi'
    }else if(rates === 'NOK'){
        return 'Norwegian Krone'
    }else if(rates === 'NZD'){
        return 'New Zealand Dollar'
    }else if(rates === 'ZAR'){
        return 'South African Rand'
    }else if(rates === 'USD'){
        return 'United State Dollar'
    }else if(rates === 'MXN'){
        return 'Mexican Peso'
    }else if(rates === 'AUD'){
        return 'Australian Dollar'
    }else if(rates === 'ILS'){
        return 'Israeli Shekel'
    }else{
        return 'Polish Zloty'
    }
}

export const ListExchange = (props) => {
    return (
        <div className="container-currency">
            <Row>
                <Col className="list-container">
                    <Col>
                        <Row>
                        <Col><h4 className="text-list-color">{props.rates}</h4></Col>
                        <Col><h4 className="text-list-color text-right">{countValueByRates(props.value, props.initial)}</h4></Col>
                        </Row>
                    </Col>
                    <Col>
                        <h6>{props.rates} - {ratesName(props.rates)}</h6>
                    </Col>
                    <Col>
                        <h6>1 USD = {props.rates} {props.value}</h6>
                    </Col>
                </Col>
                <Col sm="2" lg="1" md="1">
                <div className="button-delete" onClick={() => props.clicked(props.index, [props.rates, props.value])}>
                    <h6 className="text-button">( - )</h6>
                </div>
                </Col>
            </Row>
        </div>
    );
}
