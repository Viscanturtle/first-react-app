import React, { useState, useEffect } from 'react';
import CardComp from './card';
import './main.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Main() {
  let [meals, setMeals] = useState([]);
  let [error, setError] = useState(null);
  let [searchedMeals, setSearchedMeals] = useState([]);
  let [searched, setSearched] = useState(false);

  async function getMealsData(letter) {
    try {
      let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
      let data = await response.json();
      setMeals(data.meals);
    } catch (err) {
      setError(err.message);
    }
  }

  async function getMealsByName(name) {
    try {
      let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
      let data = await response.json();
      setSearchedMeals(data.meals);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    getMealsData('b'); // Change the letter for the meals here!
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    let searchedValue = event.target.search.value;
    setMeals([]); // clear meals
    setSearched(true); // set searched flag

    if (searchedValue) { // only search if input
      await getMealsByName(searchedValue);
    }
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
        <Button variant="outline-success" type="submit" id="searchButton">
          Search
        </Button>
      </Form>

      <div id="mainContainer">
        {searchedMeals.length > 0 ? (
          searchedMeals.map((item) => (
            <CardComp
              key={item.idMeal}
              image={item.strMealThumb}
              title={item.strMeal}
              description={item.strInstructions}
              showFavorites={true}
            />
          ))
        ) : meals.length > 0 ? (
          meals.map((item) => (
            <CardComp
              key={item.idMeal}
              image={item.strMealThumb}
              title={item.strMeal}
              description={item.strInstructions}
              showFavorites={true}
            />
          ))
        ) : (
          <h1>There are no results.</h1>
        )}
      </div>
    </>
  );
}

export default Main;