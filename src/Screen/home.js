import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {
  getAllExchangeRates,
  changeInitialValue,
  insertRates,
  removeRates
} from '../Actions'
import { 
  Button,
  Container,
  Row,
  Col,
  Dropdown,
  DropdownButton
 } from 'react-bootstrap';
 import {
   ListExchange
 } from '../Components'
 import './home.css';

class Home extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      selectedRates : "",
      addButtonVisible: true
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.props.getAllExchangeRates();
  }

  handleChange(event) {
    this.props.changeInitialValue(event.target.value);
  }

  handleSelected = (rates) => {
    const exchangeRates = rates.split(',');
    this.setState({selectedRates: exchangeRates});
  }

  handleSubmit = () => {
    this.toggleAddButton(!this.state.addButtonVisible);
    this.props.insertRates(this.state.selectedRates, this.props.listAllExchangeRates);
  }

  removeExchangeRates = (index, removedItem) => {
    console.log('addItem : ', removedItem);
    this.props.removeRates(index, removedItem, this.props.listAllExchangeRates);
  } 

  toggleAddButton = (visible) => {
    console.log('toggale ', this.state.addButtonVisible)
    this.setState({
      addButtonVisible: visible,
      selectedRates: ''
    })
  }

  render() {
    return (
      <div>
        <div style={{padding: 10, backgroundColor: '#343a40'}}>
          <Row>
            <Col>
              <h6 style={{color: '#fff'}}>USD - United State Dollars</h6>
            </Col>
          </Row>
          <Row>
            <Col><h1 style={{color: '#fff'}}>USD</h1></Col>
            <Col>
              <input className="input-currency" type="text" value={this.props.initialExchangeValue} onChange={this.handleChange} />
            </Col>
          </Row>
        </div>
        <Container>
        {this.props.listAllExchangeRatesLoading ? 'Loading. . . ..' : 
          this.props.selectedRates.map((item, index) => (
            <ListExchange clicked={this.removeExchangeRates} index={index} rates={item.rates} key={item.rates} value={item.value} initial={this.props.initialExchangeValue} />
          ))
        }
        {this.state.addButtonVisible ?
          <Button onClick={() => this.toggleAddButton(!this.state.addButtonVisible)} style={{marginTop: 10, width:'100%', padding: 10}}>
            <h5>(+) Add More Currencies</h5>
          </Button>
          :
          <div style={{marginTop: 10}}>
            <Row>
              <Col>
                <DropdownButton id="dropdown-item-button" title={this.state.selectedRates===''? 'Select Rates' : this.state.selectedRates[0]}>
                  {this.props.listAllExchangeRatesLoading ? 'Loading. . . ..' : 
                    Object.entries(this.props.listAllExchangeRates).map(([k, v]) => (
                      <Dropdown.Item as="button" eventKey={[k, v]} onSelect={this.handleSelected} key={k}>{k}</Dropdown.Item>
                    ))
                  }
                </DropdownButton>
              </Col>
              <Col sm="2" lg="1" md="1">
                <Button onClick={() => this.handleSubmit()}>
                  <h6>Submit</h6>
                </Button>
              </Col>
            </Row>
          </div> 
        }
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  listAllExchangeRates        : state.ExchangeRates.rates,
  listAllExchangeRatesLoading : state.ExchangeRates.loading,
  listAllExchangeRatesError   : state.ExchangeRates.error,
  initialExchangeValue        : state.ExchangeRates.initial,
  selectedRates               : state.ExchangeRates.selectedRates
})

const mapDispatchToProps = {
  getAllExchangeRates,
  changeInitialValue,
  insertRates,
  removeRates
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
