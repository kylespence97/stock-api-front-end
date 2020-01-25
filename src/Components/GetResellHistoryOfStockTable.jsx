import React from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';

class GetResellHistoryOfStockTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stock: [],
            columns: [
            {
                dataField: 'productID',
                text: 'Product ID',
                events: {
                    onClick: (e, column, columnIndex, row, rowIndex) => {
                        window.location.href = `/ViewResellPriceOfStock/${row.productID}`;
                    },
                },
            },
            {
                dataField: 'resellPrice',
                text: 'Resell Price (£)',
                sort: true,
            },
            {
                dataField: 'timeUpdated',
                text: 'Time Updated',
                sort: true,
            }]
        }
    }

    componentDidMount() {
        let path = window.location.href;
        let pathItems = path.split("/");

        let productID = pathItems[pathItems.length - 1];

        axios.get(`${process.env.REACT_APP_APIURL}/api/Stock/GetResellHistoryOfStock`, {
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
            <>
            <div className="container" style={{ marginTop: 50 }}><b style={{fontSize: 25}}>View Resell History Of Stock</b></div>
            <div className="container" style={{ marginTop: 50 }}>
                <BootstrapTable
                    id='tblResellHistory'
                    striped
                    hover
                    keyField='id'
                    data={this.state.stock}
                    columns={this.state.columns} />
            </div>
            </>
        );
    }
}

export default GetResellHistoryOfStockTable;