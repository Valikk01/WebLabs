import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreatePlanet from "./create-edit-components/create-port.component";


const Planet = props => (
  <tr>
    <td>{props.port.portname}</td>
    <td>{props.port.stationname}</td>
    <td>{props.port.capasity}</td>
    <td>{props.port.mass}</td>
    <td>
      <Link to={"/editport/"+props.port._id}>edit</Link> | <a href="#" onClick={() => { props.deletePlanet(props.port._id) }}>delete</a>
    </td>
  </tr>
)

export default class PlanetList extends Component {
  constructor(props) {
    super(props);

    this.deletePlanet = this.deletePlanet.bind(this)

    this.state = {port: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/port/')
      .then(response => {
        this.setState({ port: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deletePlanet(id) {
    axios.delete('http://localhost:5000/port/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
        port: this.state.port.filter(el => el._id !== id)
    })
  }

  portList() {
    return this.state.port.map(currentport => {
      return <Planet port={currentport} deletePlanet={this.deletePlanet} key={currentport._id}/>;
    })
  }

  render() {
    return (
      <div>
        <CreatePlanet/>
        <h3>Logged Planet</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Adress</th>
              <th>Country</th>
              <th>Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.portList() }
          </tbody>
        </table>
      </div>
    )
  }
}