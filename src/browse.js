import React, { useState, useEffect } from 'react';
import CardComp from './card';
import './browse.css';
import Form from 'react-bootstrap/Form';

function Browse() {
  let [meals, setMeals] = useState([]);
  let [error, setError] = useState(null);
  let [categories, setCategories] = useState([]);
  let [selectedCategory, setSelectedCategory] = useState('');
  let [areas, setAreas] = useState([]);
  let [selectedArea, setSelectedArea] = useState('');

  async function getMealsDataByLetter(letter) {
    try {
      let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
      let data = await response.json();
      setMeals(data.meals);
    } catch (err) {
      setError(err.message);
    }
  }

  async function getCategories() {
    try {
      let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
      let data = await response.json();
      setCategories(data.categories);
    } catch (err) {
      setError(err.message);
    }
  }

  async function getMealsByCategory(category) {
    try {
      let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      let data = await response.json();
      setMeals(data.meals);
    } catch (err) {
      setError(err.message);
    }
  }

  async function getAreas() {
    try {
      let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
      let data = await response.json();
      setAreas(data.meals);
    } catch (err) {
      setError(err.message);
    }
  }

  async function getMealsByArea(area) {
    try {
      let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
      let data = await response.json();
      setMeals(data.meals);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    getMealsDataByLetter('e');
    getCategories();
    getAreas();
  }, []);

  function handleCategoryChange(event) {
    let selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    setSelectedArea('');
    if (selectedCategory === '') {
      getMealsDataByLetter('e');
    } else {
      getMealsByCategory(selectedCategory);
    }
  }

  function handleAreaChange(event) {
    let selectedArea = event.target.value;
    setSelectedArea(selectedArea);
    setSelectedCategory('');
    if (selectedArea === '') {
      getMealsDataByLetter('e');
    } else {
      getMealsByArea(selectedArea);
    }
  }

  return (
    <>
      <Form className="mt-3" id="categoryFilter">
        <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.idCategory} value={category.strCategory}>
              {category.strCategory}
            </option>
          ))}
        </Form.Select>
      </Form>

      <Form className="mt-3" id="areasFilter">
        <Form.Select value={selectedArea} onChange={handleAreaChange}>
          <option value="">All Areas</option>
          {areas.map((area) => (
            <option key={area.strArea} value={area.strArea}>
              {area.strArea}
            </option>
          ))}
        </Form.Select>
      </Form>

      <div id="browserContainer">
        {error ? (
          <h1>Error: {error}</h1>
        ) : meals.length > 0 ? (
          meals.map((item) => (
            <CardComp
              key={item.idMeal}
              image={item.strMealThumb}
              title={item.strMeal}
              description={item.strInstructions}
            />
          ))
        ) : (
          <h1>No results found.</h1>
        )}
      </div>
    </>
  );
}

export default Browse;