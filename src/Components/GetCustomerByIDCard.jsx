import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class GetCustomerByIDCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            customers: {}
        };
    }

    renderCustomer = () => {
        let customers = this.state.customers;
        return (
            <>
                <div className="container" style={{ marginTop: 50, marginBottom: 50, paddingLeft: 0 }}><b style={{ fontSize: 25 }}>View Customer By ID</b></div>
                <Card style={{ width: '27rem' }}>
                    <ListGroup variant="flush">
                        <ListGroup.Item><b>ID:</b> {customers.id}</ListGroup.Item>
                        <ListGroup.Item><b>First Name:</b> {customers.firstName}</ListGroup.Item>
                        <ListGroup.Item><b>Last Name:</b> {customers.lastName}</ListGroup.Item>
                        <ListGroup.Item><b>Email:</b> {customers.email}</ListGroup.Item>
                        <ListGroup.Item><b>Address:</b> {customers.address}</ListGroup.Item>
                        <ListGroup.Item><b>Post Code:</b> {customers.postcode}</ListGroup.Item>
                        <ListGroup.Item><b>DOB:</b> {customers.dob}</ListGroup.Item>
                        <ListGroup.Item><b>Logged On At:</b> {customers.loggedOnAt}</ListGroup.Item>
                        <ListGroup.Item><b>Phone Number:</b> {customers.phoneNumber}</ListGroup.Item>
                        <ListGroup.Item><b>Can Purchase:</b> {String(customers.canPurchase)}</ListGroup.Item>
                    </ListGroup>
                </Card>

                <Form onSubmit={this.updatePurchaseAbility} style={{ marginTop: 50, width: '27rem' }}>
                    <Form.Label><b>Update Purchase Ability:</b></Form.Label>
                    <Form.Group as={Row}>
                        <Col sm={10}>
                            <Form.Check
                                type="radio"
                                label="True"
                                name="purchaseAbilityTrue"
                                id="rdoTrue"
                            />
                            <Form.Check
                                type="radio"
                                label="False"
                                name="purchaseAbilityFalse"
                                id="rdoFalse"
                            />
                        </Col>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Update
                </Button>
                </Form>
            </>
        );
    }

    updatePurchaseAbility = (event) => {
        debugger;
        event.preventDefault();
        let form = event.target;
        let data = new FormData(form);

        var id = this.state.customers.id;
        var isTrue = data.get("purchaseAbilityTrue");
        var isFalse = data.get("purchaseAbilityFalse");
        var canPurchase = null;

        if (isTrue != null) 
        {
            canPurchase = true;
        } 
        else if (isFalse != null) 
        {
            canPurchase = false;
        }

        if (canPurchase != null) {
            axios.post(`${process.env.REACT_APP_APIURL}/api/Stock/SetPurchaseAbilityOfCustomer`,
                {
                    ID: id,
                    CanPurchase: canPurchase,
                })
                .then(function (response) {
                    window.location.reload();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    componentDidMount() {
        let path = window.location.href;
        let pathItems = path.split("/");

        let id = pathItems[pathItems.length - 1];

        axios.get(`${process.env.REACT_APP_APIURL}/api/Stock/GetCustomerByID`, {
            params: {
                id: id
            }
        }).then(response => {
            this.setState({
                customers: response.data
            });
        });
    }

    render() {
        return (
            <div className="container" style={{ marginTop: 50 }}>
                {this.renderCustomer()}
            </div>
        );
    }
}

export default GetCustomerByIDCard;