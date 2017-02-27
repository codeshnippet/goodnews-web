import React, { Component } from 'react';

class Filter extends Component{
    render(){
      return (
        <li>{this.props.name}</li>
      )
    }
}

export default Filter;