import React, { Component } from 'react';
import Filter from './Filter'

class FiltersList extends Component {
  render() {
    const listItems = this.props.filters.map(
      f => <Filter key={f.id} name={f.name} />
    );
    return (
      <ul>{listItems}</ul>
    );
  }
}

export default FiltersList;