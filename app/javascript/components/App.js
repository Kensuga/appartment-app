import React from "react"
import { Row, Col, Button } from 'reactstrap';
import { FaChevronCircleDown } from 'react-icons/fa'
import AppartmentIndex from './pages/AppartmentIndex'
import NewAppt from './pages/NewAppt'
import ShowAppartment from './pages/ShowAppartment'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


class App extends React.Component {
      constructor(props) {
    super(props);
    this.state = {
      allAppts: [],
      user_id: this.setId(props)
      // We start with an empty array, so the component can finish rendering before we make our fetch request
    };
    this.getAppts();
  }
  
  componentWillMount() {
    this.getAppts();
  }
  
  getAppts = () => {
    // Making a fetch request to the url of our Rails app
    // fetch returns a promise
    fetch("http://3.19.71.94:8080/appartments")
      .then(response => {
        //Make sure we get a successful response back
        if (response.status === 200) {
          // We need to convert the response to JSON
          // This also returns a promise
          return response.json();
        }
      })
      .then(apptArray => {
        //Finally, we can assign the appartments to state, and they will render
        this.setState({ allAppts: apptArray });
      });
  };
  
  createAppt = (newAppt) => {
    console.log(newAppt)
    return fetch("http://3.19.71.94:8080/appartments", {
      // converting an object to a string
    	body: JSON.stringify(newAppt),
      // specify the info being sent in JSON and the info returning should be JSON
    	headers: {
    		"Content-Type": "application/json"
    	},
      // HTTP verb so the correct endpoint is invoked on the server
    	method: "POST"
    })
    .then((response) => {
      // if the response is good call the getAppts method
      if(response.ok){
        return this.getAppts()
      }
    })
  }
  
  setId = (props) => {
    const {
      current_user
    } = this.props
    
    console.log(current_user)
    return current_user.id
  }
  
  render () {
    
    console.log(this.state.user_id)
    
    const {
      logged_in,
      sign_in_route,
      sign_out_route
    } = this.props
    
    
    return (
      <React.Fragment>
        <Row style={{backgroundColor:'rgb(55,55,55)'}}>
          <Col style={{display:'flex'}}>
            <FaChevronCircleDown style={{ marginLeft:"1vh",marginTop:"1vh",marginBottom:"1vh", color:"white",fontSize:"50px"}} />
            <h1 style={{color:"white",marginLeft:"1vw"}}>Alpha Appartments</h1>
            </Col>
          <Col style={{display:'flex', justifyContent:"flex-end",marginRight:"1vh"}}>
            {logged_in?<h3><a href={sign_out_route} style={{color:'white'}}>Log Out</a></h3>:<h3><a href={sign_in_route} style={{color:'white'}}>Log In</a></h3>}
          </Col>
        </Row>
                <Router>
          <Row
            style={{
              backgroundColor: "rgb(13.7,12.2,12.5)",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Col
              style={{
                color: "white",
                display: "flex",
                justifyContent: "center"
              }}
              sm={1}
            >
              <Link to="/">
                <Button
                  style={{
                    backgroundColor: "rgb(13.7,12.2,12.5)",
                    borderColor: "white",
                    borderRadius: "0px"
                  }}
                >
                  All Appts
                </Button>
              </Link>
              <Link to="/newlisting">
                <Button
                  style={{
                    backgroundColor: "rgb(13.7,12.2,12.5)",
                    borderColor: "white",
                    borderRadius: "0px"
                  }}
                >
                  Create Listing
                </Button>
              </Link>
            </Col>
          </Row>
          <Switch>
            <Route exact path="/newlisting" render={ (props) => <NewAppt handleSubmit={ this.createAppt } /> }/>
            <Route exact path="/appartment/:id"
            render={ (props) => <ShowAppartment {...props} getAppts={this.getAppts} /> } />
            <Route
              exact
              path="/"
              render={props => <AppartmentIndex appartments={this.state.allAppts} />}
            />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App
