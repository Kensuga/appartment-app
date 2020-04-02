import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Badge,
  Row,
  Col,
  Button
} from "reactstrap";


class AppartmentIndex extends React.Component {
  
  render () {
      let map = this.props.appartments.map((appartment, i) => {
      return (
          <div key={i}>
            <Row>
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <Card style={{ width: "60vh", boxShadow:"0px 0px 10px", marginTop:"3vh" }}>
                  <CardImg src={appartment.image}/>
                  <CardBody>
                    <CardTitle>
                    {appartment.street},{appartment.city},{appartment.state}
                    </CardTitle>
                    <CardText>
                      {appartment.postal},{appartment.country}
                    </CardText>
                    <CardText>
                        Price: {appartment.price}<br/>
                        Rooms: {appartment.rooms}
                    </CardText>
                    <Button style={{width: "100%"}}>Appartment Details</Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <br />
          </div>
      );
    });
    return (
      <React.Fragment>
        {map}
      </React.Fragment>
    );
  }
}

export default AppartmentIndex
