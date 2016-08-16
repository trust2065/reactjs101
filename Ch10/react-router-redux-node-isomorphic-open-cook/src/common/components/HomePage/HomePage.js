import React from 'react';
import RecipeBox from '../RecipeBox';

const HomePage = ({
  recipes
}) => (
  <div>        
  {
    recipes.map((recipe, index) => (
      <RecipeBox recipe={recipe} key={index} />
    )).toJS()
  }
  </div>
);

export default HomePage;