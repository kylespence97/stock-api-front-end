import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import TeamANavBar from './Components/TeamANavBar'
import GetAllStockTable from './Components/GetAllStockTable';
import GetStockByProductIDCard from './Components/GetStockByProductIDCard';
import GetStockByStockLevelTable from './Components/GetStockByStockLevelTable';
import GetResellPriceOfStockCard from './Components/GetResellPriceOfStockCard';
import GetResellHistoryOfStockTable from './Components/GetResellHistoryOfStockTable';
import GetAllCustomersTable from './Components/GetAllCustomersTable';
import GetCustomerByIDCard from './Components/GetCustomerByIDCard';
import oauth from 'axios-oauth-client';
import Cookies from 'universal-cookie';
import axios from 'axios';


class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {}
        this.token = (new Cookies()).get("AccessToken");
        axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
      }

      componentWillMount(){
        const getOwnerCredentials = oauth.client(axios.create(), {
          url: 'https://threeamigosauth.azurewebsites.net/connect/token',
          grant_type: 'password',
          client_id: 'threeamigos_app',
          client_secret: 'secret',
          username: 'admin@example.com',
          password: '.Password123',
          scope: 'thamco_account_api staff_api'
        });
    
        getOwnerCredentials().then(resp =>  {
          document.cookie = `AccessToken=${resp.access_token}`;
        });
      }

      pageRouting(){
        return (
            <Router>
                <TeamANavBar />
                <Switch>
                    <Route exact path="/ViewAllStock">
                        <GetAllStockTable />
                    </Route>
                    <Route exact path="/ViewStockByProductID/:productID">
                        <GetStockByProductIDCard />
                    </Route>
                    <Route exact path="/ViewStockByStockLevel/:stockLevel">
                        <GetStockByStockLevelTable />
                    </Route>
                    <Route exact path="/ViewResellPriceOfStock/:productID">
                        <GetResellPriceOfStockCard />
                    </Route>
                    <Route exact path="/ViewResellHistoryOfStock/:productID">
                        <GetResellHistoryOfStockTable />
                    </Route>
                    <Route exact path="/ViewAllCustomers">
                        <GetAllCustomersTable />
                    </Route>
                    <Route exact path="/ViewCustomerByID/:id">
                        <GetCustomerByIDCard />
                    </Route>
                </Switch>
            </Router>
        );
      }

      render() {
        return (
          this.pageRouting()
        );
      }
}

export default App;
