import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class GetResellPriceOfStockCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            stock: {}
        };
    }

    renderStock = () => {
        let stock = this.state.stock;
        return (
            <>
                <div className="container" style={{ marginTop: 50, marginBottom: 50, paddingLeft: 0 }}><b style={{ fontSize: 25 }}>View Resell Price Of Stock</b></div>
                <Card style={{ width: '27rem' }}>
                    <ListGroup variant="flush">
                        <ListGroup.Item><b>Product ID:</b> {stock.productID}</ListGroup.Item>
                        <ListGroup.Item><b>Resell Price:</b> £{stock.resellPrice}</ListGroup.Item>
                    </ListGroup>
                    <Card.Header id='btnViewResellHistory' onClick={this.viewHistory}><b>[View Resell History]</b></Card.Header>
                </Card>

                <Form onSubmit={this.updatePrice} style={{ marginTop: 50, width: '27rem' }}>
                    <Form.Label><b>New Resell Price:</b></Form.Label>

                    <Form.Group as={Row}>
                        <Form.Label column xs="1">
                            £
                    </Form.Label>
                        <Col xs="11">
                            <Form.Control name="resellPriceField" controlId="txtResellPrice" type="text" placeholder="XX.XX" />
                        </Col>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Update
                </Button>
                </Form>
            </>
        );
    }

    viewHistory = () => {
        window.location.href = `/ViewResellHistoryOfStock/${this.state.stock.productID}`;
    }

    updatePrice = (event) => {
        event.preventDefault();
        let form = event.target;
        let data = new FormData(form);

        var productID = this.state.stock.productID;
        var resellPrice = data.get("resellPriceField");
        if (resellPrice != null) {
            axios.post(`${process.env.REACT_APP_APIURL}/api/Stock/SetResellPriceOfStock`, 
            {
                ProductID: productID,
                ResellPrice: resellPrice,
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

        let productID = pathItems[pathItems.length - 1];

        axios.get(`${process.env.REACT_APP_APIURL}/api/Stock/GetResellPriceOfStock`, {
            params: {
                productID: productID
            }
        }).then(response => {
            this.setState({
                stock: response.data
            });
        });
    }

    render() {
        return (
            <div className="container" style={{ marginTop: 50 }}>
                {this.renderStock()}
            </div>
        );
    }
}

export default GetResellPriceOfStockCard;