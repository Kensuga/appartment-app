import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Form, Button, Input, Label } from "reactstrap";
import { Link, Redirect } from 'react-router-dom'

class NewAppt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      newAppt: {
        street: "",
        city: "",
        postal: "",
        state: "",
        country: "",
        price: "",
        rooms: "",
        user_id: ""
      }
    };
  }
  
  handleSubmit = (event) => {
    // keeps React from refreshing the page unnecessarily
    event.preventDefault()
    // a function call being passed from App.js
    // this.setState({ user_id: })
    console.log(this.state.newAppt)
    this.props.handleSubmit(this.state.newAppt)
    this.setState({
      success: true
    })
  }

  apptStreetUpdate(Street) {
    let updatedAppt = this.state.newAppt;
    updatedAppt.street = Street;
    this.setState({ newAppt: updatedAppt });
  }
  apptCityUpdate(city) {
    let updatedAppt = this.state.newAppt;
    updatedAppt.city = city;
    this.setState({ newAppt: updatedAppt });
  }
  apptPostalUpdate(postal) {
    let updatedAppt = this.state.newAppt;
    updatedAppt.postal = parseInt(postal);
    this.setState({ newAppt: updatedAppt });
  }
  apptCountryUpdate(country) {
    let updatedAppt = this.state.newAppt;
    updatedAppt.country = country;
    this.setState({ newAppt: updatedAppt });
  }
  apptPriceUpdate(price) {
    let updatedAppt = this.state.newAppt;
    updatedAppt.price = parseFloat(price);
    this.setState({ newAppt: updatedAppt });
  }
  apptRoomUpdate(rooms) {
    let updatedAppt = this.state.newAppt;
    updatedAppt.rooms = parseInt(rooms);
    this.setState({ newAppt: updatedAppt });
  }
  apptImageUpdate(image){
    let updatedAppt = this.state.newAppt;
    updatedAppt.image = image
    this.setState({ newAppt: updatedAppt })
  }
  apptStateUpdate(state){
    let updatedAppt = this.state.newAppt;
    updatedAppt.state = state;
    this.setState({ newAppt: updatedAppt})
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col style={{ display: "flex", justifyContent: "center" }} sm={12}>
              <Form>
                <p>
                  <Label for="apptStreet">Address:</Label>
                  <Input
                    type="text"
                    id="apptstreet"
                    placeholder="Address"
                    onChange={e => {
                      let street = e.target.value;
                      this.apptStreetUpdate(street);
                    }}
                  />
                </p>
                <p>
                  <Label for="apptCity">City:</Label>
                  <Input
                    type="text"
                    id="apptcity"
                    placeholder="City"
                    onChange={e => {
                      let city = e.target.value;
                      this.apptCityUpdate(city);
                    }}
                  />
                </p>
                <p>
                  <Label for="apptState">State:</Label>
                  <Input
                    type="text"
                    id="apptState"
                    placeholder="State"
                    onChange={e => {
                      let state = e.target.value;
                      this.apptStateUpdate(state);
                    }}
                  />
                </p>
                <p>
                  <Label for="apptStreet">Zip Code:</Label>
                  <Input
                    type="text"
                    id="apptzip"
                    placeholder="Zip Code"
                    onChange={e => {
                      let postal = e.target.value;
                      this.apptPostalUpdate(postal);
                    }}
                  />
                </p>
                <p>
                  <Label for="apptcountry">Country:</Label>
                  <Input
                    type="text"
                    id="apptcountry"
                    placeholder="Country"
                    onChange={e => {
                      let country = e.target.value;
                      this.apptCountryUpdate(country);
                    }}
                  />
                </p>
                <p>
                  <Label for="apptrooms">Rooms:</Label>
                  <Input
                    type="text"
                    id="apptrooms"
                    placeholder="#"
                    onChange={e => {
                      let rooms = e.target.value;
                      this.apptRoomUpdate(rooms);
                    }}
                  />
                </p>
                <p>
                  <Label for="apptprice">Price:</Label>
                  <Input
                    type="text"
                    id="apptprice"
                    placeholder="$"
                    onChange={e => {
                      let price = e.target.value;
                      this.apptPriceUpdate(price);
                    }}
                  />
                </p>
                <p>
                  <Label for="apptimage">Image:</Label>
                  <Input
                    type="text"
                    id="apptimage"
                    placeholder="URL"
                    onChange={e => {
                      let image = e.target.value;
                      this.apptImageUpdate(image);
                    }}
                  />
                </p>
              </Form>
            </Col>
          </Row>
          <Row style={{ display: "flex", justifyContent: "center" }}>
            <Link to="/">
              <Button
                street="submit"
                id="submit"
                onClick={ this.handleSubmit }
              >
                Submit
              </Button>
              { this.state.success && <Redirect to="/"/> }
            </Link>
          </Row>
        </Container>
      </div>
    );
  }
}

export default NewAppt;
