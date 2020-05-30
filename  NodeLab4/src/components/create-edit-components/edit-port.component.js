import React, { Component } from 'react';
import axios from 'axios';


export default class EditPlanet extends Component {
  constructor(props) {
    super(props);

    this.onChangePlanetname = this.onChangePlanetname.bind(this);
    this.onChangeStationname = this.onChangeStationname.bind(this);
    this.onChangeCapasity = this.onChangeCapasity.bind(this);
    this.onChangeMass = this.onChangeMass.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        portname: '',
        stationname: '',
        capasity: 0,
        mass: 0,
        spacestation: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/port/'+this.props.match.params.id)
      .then(response => {
        this.setState({
            portname: response.data.portname,
            stationname: response.data.stationname,
            capasity: response.data.capasity,
            mass: response.data.mass,
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/spacestation/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            spacestation: response.data.map(spacestation => spacestation.spacestationname),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangePlanetname(e) {
    this.setState({
        portname: e.target.value
    })
  }

  onChangeStationname(e) {
    this.setState({
        stationname: e.target.value
    })
  }

  onChangeCapasity(e) {
    this.setState({
        capasity: e.target.value
    })
  }

  onChangeMass(e) {
    this.setState({
        mass: e.target.value
    })
  }


  onSubmit(e) {
    e.preventDefault();

    const port = {
        portname: this.state.portname,
        stationname: this.state.stationname,
        capasity: this.state.capasity,
        mass: this.state.mass
    }

    console.log(port);

    axios.post('http://localhost:5000/port/update/' + this.props.match.params.id, port)
      .then(res => console.log(res.data));

    window.location = '/port';
  }

  render() {
    return (
    <div>
      <h3>Edit Planet Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Planet name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.portname}
              onChange={this.onChangePlanetname}
              />
        </div>

        <div className="form-group"> 
          <label>Space Station name: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.stationname}
              onChange={this.onChangeStationname}>
              {
                this.state.spacestation.map(function(spacestation) {
                  return <option 
                    key={spacestation}
                    value={spacestation}>{spacestation}
                    </option>;
                })
              }
          </select>
        </div>

        <div className="form-group">
          <label>Capasity: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.capasity}
              onChange={this.onChangeCapasity}
              />
        </div>
        <div className="form-group">
          <label>Mass: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.mass}
              onChange={this.onChangeMass}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Planet Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}