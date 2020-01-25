import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class GetStockByProductIDCard extends React.Component {

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
                <div className="container" style={{ marginTop: 50, marginBottom: 50, paddingLeft: 0 }}><b style={{ fontSize: 25 }}>View Stock By Product ID</b></div>
                <Card style={{ width: '27rem' }}>
                    <ListGroup variant="flush">
                        <ListGroup.Item><b>Product ID:</b> {stock.productID}</ListGroup.Item>
                        <ListGroup.Item><b>Stock Level:</b> {stock.stockLevel}</ListGroup.Item>
                        <ListGroup.Item><b>Resell Price:</b> £{stock.resellPrice}</ListGroup.Item>
                    </ListGroup>
                </Card>

                <Form onSubmit={this.updateLevel} style={{ marginTop: 50, width: '27rem' }}>
                    <Form.Label><b>New Stock Level:</b></Form.Label>

                    <Form.Group as={Row}>
                        <Col xs="12">
                            <Form.Control name="stockLevelField" controlId="txtStockLevel" type="text" placeholder="XXXX" />
                        </Col>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Update
                </Button>
                </Form>
            </>
        );
    }

    updateLevel = (event) => {
        event.preventDefault();
        let form = event.target;
        let data = new FormData(form);

        var productID = this.state.stock.productID;
        var stockLevel = data.get("stockLevelField");
        if (stockLevel != null) {
            axios.post(`${process.env.REACT_APP_APIURL}/api/Stock/SetStockLevelOfStock`, 
            {
                ProductID: productID,
                StockLevel: stockLevel,
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

        axios.get(`${process.env.REACT_APP_APIURL}/api/Stock/GetStockByProductID`, {
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

export default GetStockByProductIDCard;