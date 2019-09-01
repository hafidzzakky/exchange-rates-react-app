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
  Dropdown
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
      addButtonVisible: true,
      showDropDown: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.props.getAllExchangeRates();
  }

  renderList = () => {
    if(this.props.listAllExchangeRatesLoading){
      return <h5>Loading. . .</h5>
    }else{
      return this.props.selectedRates.map((item, index) => (
        <ListExchange 
          clicked={this.removeExchangeRates} 
          index={index} 
          rates={item.rates} 
          key={item.rates} 
          value={item.value} 
          initial={this.props.initialExchangeValue} />
      ))
    }
  }
  
  renderButton = () => {
    if(this.state.addButtonVisible){
      return (
        <Button 
          className="button-add" 
          onClick={() => this.toggleAddButton(!this.state.addButtonVisible)}>
          <h5>(+) Add More Currencies</h5>
        </Button>
      );
    }else{
      return (
        <div className="dropdown-container">
          <div className="row-container">
            <Row>
              <Col className="right-padder">
                <input 
                className="input-dropdown-style"
                onFocus={() => this.toggleDropdown(!this.state.showDropDown)}
                type="text" 
                value={this.state.selectedRates===''? 'Select Rates' : this.state.selectedRates[0]} 
                readOnly
                />
                <Dropdown.Menu className="dropdown-menu-container" show={this.state.showDropDown}>
                  {this.props.listAllExchangeRatesLoading ? 'Loading. . . ..' : 
                    Object.entries(this.props.listAllExchangeRates).map(([k, v]) => (
                      <Dropdown.Item 
                        as="button" 
                        eventKey={[k, v]} 
                        onSelect={this.handleSelected} 
                        key={k}>{k}</Dropdown.Item>
                    ))
                  }
                </Dropdown.Menu>
              </Col>
              <Col sm="2" lg="1" md="1" className="button-col-style">
                <Button className="button-submit-style" size="sm" disabled={this.state.selectedRates === '' ? true : false} onClick={() => this.handleSubmit()}>
                  Submit
                </Button>
              </Col>
            </Row>
          </div>
        </div> 
      );
    }
  }

  handleChange(event) {
    this.props.changeInitialValue(event.target.value);
  }

  handleSelected = (rates) => {
    const exchangeRates = rates.split(',');
    this.setState({selectedRates: exchangeRates, showDropDown: false});
  }

  handleSubmit = () => {
    this.toggleAddButton(!this.state.addButtonVisible);
    this.props.insertRates(this.state.selectedRates, this.props.listAllExchangeRates);
  }

  removeExchangeRates = (index, removedItem) => {
    this.props.removeRates(index, removedItem, this.props.listAllExchangeRates);
  } 

  toggleAddButton = (visible) => {
    this.setState({
      addButtonVisible: visible,
      selectedRates: '',
      showDropDown: false
    })
  }

  toggleDropdown = (visible) => {
    this.setState({
      showDropDown: visible,
    })
  }

  render() {
    return (
      <div>
        {/* Header */}
        <div className="navbar-style">
          <Row>
            <Col>
              <h6 className="navbar-text-color">USD - United State Dollars</h6>
            </Col>
          </Row>
          <Row>
            <Col><h1 className="navbar-text-color">USD</h1></Col>
            <Col>
              <input 
                className="input-currency" 
                type="text" 
                value={this.props.initialExchangeValue} 
                onChange={this.handleChange} />
            </Col>
          </Row>
        </div>
        {/* Body */}
        <Container className="content-container">
          {/* Render List Exchange */}
          {this.renderList()}
          {/* Render Button or Dropdown */}
          {this.renderButton()}
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
