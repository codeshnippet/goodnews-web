import React, { Component } from 'react';
import Filter from './Filter'

class FiltersList extends Component {
  render() {
    const listItems = this.props.filters.map(
      f => <Filter key={f.id} name={f.name} filterClick={ () => this.props.filterClick(f.id) }/>
    );
    return (
      <div>
        <h4>Filters</h4>
        <ul>{listItems}</ul>
      </div>
    );
  }
}

export default FiltersList;