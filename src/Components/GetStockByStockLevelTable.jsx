import React from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';

class GetStockByStockLevelTable extends React.Component {

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
                        window.location.href = `/ViewStockByProductID/${row.productID}`;
                    },
                },
            },
            {
                dataField: 'stockLevel',
                text: 'Stock Level',
                sort: true,
                events: {
                    onClick: (e, column, columnIndex, row, rowIndex) => {
                        window.location.href = `/ViewStockByStockLevel/${row.stockLevel}`;
                    },
                },
            },
            {
                dataField: 'resellPrice',
                text: 'Resell Price (£)',
                sort: true,
                events: {
                    onClick: (e, column, columnIndex, row, rowIndex) => {
                        window.location.href = `/ViewResellPriceOfStock/${row.productID}`;
                    },
                },
            }]
        };
    }



    componentDidMount() {
        let path = window.location.href;
        let pathItems = path.split("/");

        let stockLevel = pathItems[pathItems.length - 1];

        axios.get(`${process.env.REACT_APP_APIURL}/api/Stock/GetStockByStockLevel`, {
            params: {
                stockLevel: stockLevel
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
            <div className="container" style={{ marginTop: 50 }}><b style={{fontSize: 25}}>View Stock By Stock Level</b></div>
            <div className="container" style={{ marginTop: 50 }}>
                <BootstrapTable
                    id='tblStockByStockLevel'
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

export default GetStockByStockLevelTable;