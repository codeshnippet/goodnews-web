import React, { Component } from 'react';

class Filter extends Component{
    render(){
      return (
        <li><a href="#" onClick={ this.props.filterClick }>{this.props.name}</a></li>
      )
    }
}

export default Filter;