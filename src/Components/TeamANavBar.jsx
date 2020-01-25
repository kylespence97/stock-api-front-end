import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import axios from 'axios';

class TeamANavBar extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Team A</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/ViewAllStock">View All Stock</Nav.Link>
                    <Nav.Link style={{cursor: 'auto', color: 'rgba(255,255,255,.5)'}}>|</Nav.Link>
                    <Nav.Link href="/ViewAllCustomers">View All Customers</Nav.Link>
                </Nav>
            </Navbar>
        )
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        axios.get(`${process.env.REACT_APP_APIURL}/api/Stock/GetAllStock`).then(function (resp) {
            console.log(resp);
        })
    }
}

export default TeamANavBar;