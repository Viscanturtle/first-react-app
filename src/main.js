import data from './data.json';
import CardComp from './card';
import './main.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function Main() {

  let [items, setItems] = useState(data)

  function handleSubmit(event) {
    event.preventDefault();
    let searchedValue = event.target.search.value;

    let filteredItems = data.filter(function(item){return item.title.toLowerCase().includes(searchedValue.toLowerCase())})
    setItems(filteredItems);
  }

  return (
    <>
    <Form className="d-flex" id="searchForm" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              name="search"
            />
            <Button variant="outline-success" type='submit'>Search</Button>
          </Form>
    <div id="container">
      {items.length > 0 ? ( // check the length of the filtered items
        items.map(function (item) {
          return(
            <CardComp image={item.image_url} title={item.title} description={item.description} category={item.category} price={item.price}/>
          )
        })
      ) : (
        <h1>There are no results matching your query.</h1> // display a message if there are no results
      )}
      </div>
    </>
  )
}

export default Main;
