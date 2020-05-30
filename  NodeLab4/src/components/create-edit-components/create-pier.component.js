import React, { Component } from 'react';
import axios from 'axios';


export default class CreateSpaceStation extends Component {
  constructor(props) {
    super(props);

    this.onChangeSpaceStationname = this.onChangeSpaceStationname.bind(this);
    this.onChangeCapasity = this.onChangeCapasity.bind(this);
    this.onChangeNeeds = this.onChangeNeeds.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        piername: '',
        capasity: 0,
        needs: 0,
        pier: []
    }
  }

  onChangeSpaceStationname(e) {
    this.setState({
        piername: e.target.value
    })
  }


  onChangeCapasity(e) {
    this.setState({
        capasity: e.target.value
    })
  }

  onChangeNeeds(e) {
    this.setState({
        needs: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const pier = {
        piername: this.state.piername,
        needs: this.state.needs,
        capasity: this.state.capasity,
    }

    console.log(pier);

    axios.post('http://localhost:5000/pier/add', pier)
      .then(res => console.log(res.data));

    window.location = '/pier';
  }

  render() {
    return (
    <div>
      <h3>Create New Pier </h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
            <label>Pier name: </label>
            <input  type="text"
                type="text"
                className="form-control"
                value={this.state.piername}
                onChange={this.onChangeSpaceStationname}
                />
        </div>

        <div className="form-group">
          <label>Port id: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.capasity}
              onChange={this.onChangeCapasity}
              />
        </div>
        <div className="form-group">
          <label>Sediment: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.needs}
              onChange={this.onChangeNeeds}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Create pier" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}