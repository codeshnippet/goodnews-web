import React, { Component } from 'react';

class NewFilterForm extends Component {
  render() {
    const categoriesList = this.props.newFilter.categories.map(
      (c, i) => <span key={i}> {c}</span>
    );
    const feedsList = this.props.newFilter.feeds.map(
      (c, i) => <span key={i}> {c}</span>
    );
    return (
      <form name="new-filter" method="post">
        <section>
          <label htmlFor="name">New filter name:</label>
          <input type="text" value={this.props.newFilterName} onChange={this.props.onNewFilterNameChange} name="name" />
        </section>
        <section>
          <span>Categories:</span>{categoriesList}
          <div>
            <label htmlFor="cat-name">New category name:</label>
            <input type="text" value={this.props.newCategoryName} onChange={this.props.onNewCategoryNameChange} name="cat-name"/>
            <button onClick={this.props.onAddCategory}>Add</button>
          </div>
        </section>
        <section>
          <span>Feeds:</span>{feedsList}
          <div>
            <label htmlFor="feed-url">New feed url:</label>
            <input type="text" value={this.props.newFeedUrl} onChange={this.props.onNewFeedUrlChange} name="feed-url"/>
            <button onClick={this.props.onAddFeed}>Add</button>
          </div>
        </section>
        <section>
          <button onClick={this.props.onSaveFilter}>Create filter</button>
        </section>
      </form>
    );
  }
}

export default NewFilterForm;