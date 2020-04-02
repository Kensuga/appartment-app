import React, { Component } from 'react';
import {  Button } from 'reactstrap';
import { Redirect } from "react-router-dom"


class ShowAppartment extends Component{
  constructor(props){
    super(props)
    this.state = {
      appartment: [],
      success: false,
      editable: false
    }
    this.getAppt()
  }
  componentDidMount(){
    this.getAppt()
  }

  getAppt = () => {
    const { id } = this.props.match.params
    fetch(`http://3.19.71.94:8080/appartments/${id}`)
    .then((response)=>{
     if(response.status === 200){
       return(response.json())
     }
   })
   .then((apptInfo)=>{
     this.setState({ appartment: apptInfo })
   })
 }

 handleDelete = () => {
   const { id } = this.props.match.params
   console.log(id);
   fetch(`http://3.19.71.94:8080/appartments/${id}`, {
     method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then((response) => {
    if(response.ok){
      alert("this profile is deleted")
      this.setState({ success: true })
      return this.props.getAppts()
    }
  })

}

  handleEdit = () => {
    if(this.state.editable){
      let street = this.street.value
      let city = this.city.value
      let postal = this.postal.value
      let state = this.state.value
      let country = this.country.value
      let price = this.price.value
      let rooms = this.rooms.value
      let image = this.image.value
      let appartment = { street: street, city: city, postal: parseInt(postal), state: state, country: country, price: parseFloat(price), rooms: parseInt(rooms), image: image}
      this.handleUpdate(appartment)
    }
   this.setState({
     editable: !this.state.editable
   })
 }
  handleUpdate = (appartment) => {
    const { id } = this.props.match.params
    fetch(`http://3.19.71.94:8080/appartments/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify({appartment: appartment}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
        this.updateAppt(appartment)
      })
  }

  updateAppt = (appartment) => {
    this.setState({
      appartment: appartment
    })
  }


  render(){
    let street = this.state.editable?
        <input type='text' ref={input => this.street = input} defaultValue={this.state.appartment.street}/>
        :<p>{this.state.appartment.street}</p>

    let city = this.state.editable?
        <input type='text' ref={input => this.city = input} defaultValue={this.state.appartment.city}/>
        :<p>{this.state.appartment.city}</p>

    let postal = this.state.editable?
        <input type='text' ref={input => this.postal = input} defaultValue={this.state.appartment.postal}/>
        :<p>{this.state.appartment.postal}</p>
        
    let state = this.state.editable?
        <input type='text' ref={input => this.state = input} defaultValue={this.state.appartment.state}/>
        :<p>{this.state.appartment.state}</p>
        
    let country = this.state.editable?
        <input type='text' ref={input => this.country = input} defaultValue={this.state.appartment.country}/>
        :<p>{this.state.appartment.country}</p>
        
    let price = this.state.editable?
        <input type='text' ref={input => this.price = input} defaultValue={this.state.appartment.price}/>
        :<p>{this.state.appartment.price}</p>
        
    let rooms = this.state.editable?
        <input type='text' ref={input => this.rooms = input} defaultValue={this.state.appartment.rooms}/>
        :<p>{this.state.appartment.rooms}</p>
        
    let image = this.state.editable?
        <input type='text' ref={input => this.image = input} defaultValue={this.state.appartment.image}/>
        :<p>{this.state.appartment.image}</p>

    return(
      <React.Fragment>
      <div>
        <img src={image} />
        <h4>Street: </h4>
        {street}
        <h4>City: </h4>
        {city}
        <h4>State:</h4>
        {state}
        <h4>Postal:</h4>
        {postal}
        <h4>Country:</h4>
        {country}
        <h4>Price:</h4>
        {price}
        <h4>Rooms:</h4>
        {rooms}
        <div>
        <Button onClick={() => this.handleEdit()}>{this.state.editable? 'Submit' : 'Edit'}</Button>
        <Button onClick={ this.handleDelete }>Delete Profile</Button>
        { this.state.success && <Redirect to="/"/> }
        </div>
      </div>
      </React.Fragment>
    )
  }
}
export default ShowAppartment