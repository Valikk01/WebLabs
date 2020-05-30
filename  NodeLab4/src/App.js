import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import './App.css';

import Navbar from "./components/navbar.component"
import GoodsList from "./components/ships-list.component";
import EditGoods from "./components/create-edit-components/edit-ships.component";
import PlanetList from "./components/port-list.component";
import EditPlanet from "./components/create-edit-components/edit-port.component";
import SpaceStationList from "./components/pier-list.component";
import EditSpaceStation from "./components/create-edit-components/edit-pier.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={GoodsList} />
        <Route path="/edit/:id" component={EditGoods} />
        {/* <Route path="/create" component={CreateGoods} /> */}
        <Route path="/port" component={PlanetList} />
        <Route path="/editport/:id" component={EditPlanet} />
        <Route path="/pier" component={SpaceStationList} />
        <Route path="/editstation/:id" component={EditSpaceStation} />
      </div>
    </Router>
  );
}


export default App;
