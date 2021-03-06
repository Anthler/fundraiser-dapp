
import React, { useState, useEffect } from "react";
import FundraiserFactory from "../contracts/FundraiserFactory.json";
import getWeb3 from "../utils/getWeb3";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import NewFundraiser from './NewFundraiser'
import Home from './Home'
import Receipts from './Receipts'

import "../App.css";

const App = () => {
  const [state, setState] = useState({web3: null, accounts: null, contract: null});
  //const classes = useStyles();

  useEffect(() => {
    const init = async() => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = FundraiserFactory.networks[networkId];
        const instance = new web3.eth.Contract(
          FundraiserFactory.abi,
          deployedNetwork && deployedNetwork.address
        );

        setState({web3, accounts, contract: instance});
        console.log(accounts)

      } catch(error) {

        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    }
    init();
  }, []);

  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
  });

  const runExample = async () => {
    const { accounts, contract } = state;
  };

  return (
    <div>
      <Router>
        <AppBar position="static" color="default" style={{ margin: 0 }}>
          <Toolbar>
           <Typography variant="h6" color="inherit">
             <NavLink className="nav-link" to="/">Home</NavLink>
           </Typography>
           <NavLink className="nav-link" to="/new/">New Fundraiser</NavLink>
              Your Eth Address: {state.accounts}
          </Toolbar>
       </AppBar>

        <Route path="/" exact component={Home} />
        <Route path="/new/" component={NewFundraiser} />
        <Route path="/receipts" component={Receipts} />
      </Router>
    </div>
  )
}


export default App;
