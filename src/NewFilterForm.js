import React, { Component } from 'react';

class NewFilterForm extends Component {
  render() {
    return (
      <div>
        <input type="text"
          value={this.props.inputValue}
          onChange={this.props.onChange}
        />
        <button onClick={this.props.onClick}>Add</button>
      </div>
    );
  }
}

export default NewFilterForm;