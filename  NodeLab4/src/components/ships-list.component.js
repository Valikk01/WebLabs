import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreateGoods from "./create-edit-components/create-ships.component";


const Goods = props => (
  <tr>
    <td>{props.ships.code}</td>
    <td>{props.ships.shipsname}</td>
    <td>{props.ships.mass}</td>
    <td>
      <Link to={"/edit/"+props.ships._id}>edit</Link> | <a href="#" onClick={() => { props.deleteGoods(props.ships._id) }}>delete</a>
    </td>
  </tr>
)

export default class GoodsList extends Component {
  constructor(props) {
    super(props);

    this.deleteGoods = this.deleteGoods.bind(this)

    this.state = {ships: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/ships/')
      .then(response => {
        this.setState({ ships: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteGoods(id) {
    axios.delete('http://localhost:5000/ships/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
        ships: this.state.ships.filter(el => el._id !== id)
    })
  }

  shipsList() {
    return this.state.ships.map(currentships => {
      return <Goods ships={currentships} deleteGoods={this.deleteGoods} key={currentships._id}/>;
    })
  }

  render() {
    return (
      <div>
        <CreateGoods/>
        <h3>Logged Goods</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Mass</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.shipsList() }
          </tbody>
        </table>
      </div>
    )
  }
}