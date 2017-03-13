import React from 'react';

function FeedEntriesList(props){
  const feedEntriesList = props.entries.map( e =>
    <div key={e.title} className="enrty" >
      <div><a href={e.link}>{e.title}</a></div>
      <div>{e.description}</div>
      <div>{e.category.name}</div>
      <CategoriesList {...props} text={e.description} />
    </div>
  );
  return (
    <div>{feedEntriesList}</div>
  );
}

function CategoriesList(props){
  const categoriesList = props.selectedFilter.categories.map( c=>
    <span key={c.id}>&nbsp;<a href="#" onClick={ (e) => props.markEntry(e, props.text, c.id) }>{c.name}</a></span>
  );
  return (
    <div>
      Mark as: {categoriesList}
    </div>
  );
}

export default FeedEntriesList;
