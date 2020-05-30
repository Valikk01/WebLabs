import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreateSpaceStation from "./create-edit-components/create-pier.component";


const SpaceStation = props => (
  <tr>
    <td>{props.pier.piername}</td>
    <td>{props.pier.needs}</td>
    <td>{props.pier.capasity}</td>
    <td>
      <Link to={"/editstation/"+props.pier._id}>edit</Link> | <a href="#" onClick={() => { props.deleteSpaceStation(props.pier._id) }}>delete</a>
    </td>
  </tr>
)

export default class SpaceStationList extends Component {
  constructor(props) {
    super(props);

    this.deleteSpaceStation = this.deleteSpaceStation.bind(this)

    this.state = {pier: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/pier/')
      .then(response => {
        this.setState({ pier: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteSpaceStation(id) {
    axios.delete('http://localhost:5000/pier/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
        pier: this.state.pier.filter(el => el._id !== id)
    })
  }

  pierList() {
    return this.state.pier.map(currentpier => {
      return <SpaceStation pier={currentpier} deleteSpaceStation={this.deleteSpaceStation} key={currentpier._id}/>;
    })
  }

  render() {
    return (
      <div>
        <CreateSpaceStation/>
        <h3>Logged SpaceStation</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Port id</th>
              <th>Sediment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.pierList() }
          </tbody>
        </table>
      </div>
    )
  }
}