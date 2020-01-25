import React from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';

class GetAllCustomersTable extends React.Component {

    state = {
        customers: [],
        columns: [{
            dataField: 'id',
            text: 'ID',
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    window.location.href = `/ViewCustomerByID/${row.id}`;
                },
            },
        },
        {
            dataField: 'firstName',
            text: 'First Name',
            sort: true,
        },
        {
            dataField: 'lastName',
            text: 'Last Name',
            sort: true,
        },
        {
            dataField: 'email',
            text: 'Email',
            sort: true,
        },
        {
            dataField: 'address',
            text: 'Address',
        },
        {
            dataField: 'postcode',
            text: 'Post Code',
        },
        {
            dataField: 'dob',
            text: 'DOB',
        },
        {
            dataField: 'loggedOnAt',
            text: 'Logged On At',
        },
        {
            dataField: 'phoneNumber',
            text: 'Phone Number',
        },
        {
            dataField: 'canPurchase',
            text: 'Can Purchase',
        }]
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_APIURL}/api/Stock/GetAllCustomers`)
            .then(response => {
                this.setState({
                    customers: response.data
                });
            });
    }

    render() {
        return (
            <>
            <div className="container" style={{ marginTop: 50 }}><b style={{fontSize: 25}}>View All Customers</b></div>
            <div className="container" style={{ marginTop: 50 }}>
                <BootstrapTable
                    id='tblCustomers'
                    striped
                    hover
                    keyField='id'
                    data={this.state.customers}
                    columns={this.state.columns} />
            </div>
            </>
        );
    }
}

export default GetAllCustomersTable;