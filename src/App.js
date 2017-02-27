import React, { Component } from 'react';
import FiltersList from './FiltersList'
import NewFilterForm from './NewFilterForm'
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      filters: [],
      newFilterName:""
    }
  }

    componentDidMount() {
      fetch('http://localhost:8080/filters')
      .then( (response) => {
        return response.json() })
      .then( (json) => {
        this.setState({filters: json});
      });
    };

  render() {
    return (
      <div>
        <NewFilterForm
          onClick={ e =>
            fetch('http://localhost:8080/filters', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.newFilterName
              })
            }).then( (response) => {
              return response.json() })
            .then( (json) => {
              this.setState({
                filters: this.state.filters.concat([{name: this.state.newFilterName}]),
                newFilterName: ""
              });
            })
          }
          inputValue={this.state.newFilterName}
          onChange={ e => this.setState(
            {
              newFilterName: e.target.value
            })}
          />
        <FiltersList {...this.state}/>
      </div>
    );
  }
}

export default App;
