import React, { Component } from 'react';
import FiltersList from './FiltersList'
import NewFilterForm from './NewFilterForm'
import FeedEntriesList from './FeedEntriesList'
import './App.css';

class App extends Component {
  serverUrl(){
    return 'https://zgoodnews.herokuapp.com';
  }

  constructor(){
    super()
    this.state = {
      filters: [],
      entries:[],
      newFilterForm: {
        name: "",
        newCategoryName: "",
        newFeedUrl: ""
      },
      newFilter:{
        name: "",
        categories: [],
        feeds: []
      },
      selectedFilter: {
        categories: []
      }
    }
  }

  componentDidMount() {
    this.fetchFilters();
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <NewFilterForm
            {...this.state}
            onSaveFilter={ e => this.postNewFilter(e) }
            onNewFilterNameChange={ e => this.handleFilterNameChange(e) }
            onNewCategoryNameChange={ e => this.handleCategoryNameChange(e) }
            onAddCategory={ e => this.onAddCategory(e) }
            onNewFeedUrlChange={ e => this.handleFeedUrlChange(e) }
            onAddFeed={ e => this.onAddFeed(e) }
            />
          <FiltersList {...this.state} filterClick={ this.filterClick.bind(this) }/>
        </div>
        <div className="col-md-8">
          <FeedEntriesList {...this.state} markEntry={ this.markEntry.bind(this) } />
        </div>
      </div>
    );
  }

  markEntry(event, text, categoryId){
    event.preventDefault();
    fetch(this.serverUrl() + '/category/' + categoryId + '/mark', {
      method: 'post',
      headers: {
        'Accept': 'text/plain',
        'Content-Type': 'text/plain',
      },
      body: text
    })
    .then( (response) => {
      console.log(response);
    });
  }

  filterClick(filterId){
    let filter = this.state.filters.find(f => f.id === filterId);

    this.setState({
      ...this.state,
      selectedFilter: filter
    });

    for(var feed of filter.feeds){
      this.fetchFeed(filter.id, feed.id);
    }
  }

  handleFeedUrlChange(e){
    this.setState({
      ...this.state,
      newFilterForm: {
        ...this.state.newFilterForm,
        newFeedUrl: e.target.value
      }
    });
  }

  onAddFeed(e){
    e.preventDefault();
    this.setState({
      ...this.state,
      newFilterForm: {
        ...this.state.newFilterForm,
        newFeedUrl: ""
      },
      newFilter:{
        ...this.state.newFilter,
        feeds: this.state.newFilter.feeds.concat(this.state.newFilterForm.newFeedUrl)
      }
    });
  }

  handleFilterNameChange(e){
    this.setState({
      ...this.state,
      newFilterForm: {
        ...this.state.newFilterForm,
        name: e.target.value
      },
      newFilter:{
        ...this.state.newFilter,
        name: e.target.value
      }
    });
  }

  handleCategoryNameChange(e){
    this.setState({
      ...this.state,
      newFilterForm: {
        ...this.state.newFilterForm,
        newCategoryName: e.target.value
      }
    });
  }

  onAddCategory(e){
    e.preventDefault();
    this.setState({
      ...this.state,
      newFilterForm: {
        ...this.state.newFilterForm,
        newCategoryName: ""
      },
      newFilter:{
        ...this.state.newFilter,
        categories: this.state.newFilter.categories.concat(this.state.newFilterForm.newCategoryName)
      }
    });
  }

  postNewFilter(event){
    event.preventDefault();
    fetch(this.serverUrl() + '/filters', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.newFilter)
    })
    .then( (response) => {
      return response.json() })
    .then( (json) => {
      this.setState({
        ...this.state,
        filters: this.state.filters.concat([json]),
        newFilterForm: {
          ...this.state.newFilterForm,
           name: ""
         }
      });
    });
  }

  fetchFilters(){
    fetch(this.serverUrl() + '/filters')
      .then( (response) => {
        return response.json() })
      .then( (json) => {
        this.setState({
          ...this.state,
          filters: json
        });
      });
  }

  fetchFeed(filterId, feedId){
    fetch(this.serverUrl() + '/filters/' + filterId + '/feeds/' + feedId)
      .then( (response) => {
        return response.json() })
      .then( (json) => {
        this.setState({
          ...this.state,
          entries: this.state.entries.concat(json.entries)
        });
      });
  }
}

export default App;
