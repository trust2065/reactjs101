import Immutable from 'immutable';

// initstate model
export const UiState = Immutable.Map({
  spinnerVisible: false,
});

export const RecipeState = Immutable.Map({
  recipes: [],
  recipeId: '',
});

export const UserState = Immutable.Map({
  username: '',
  email: '',
  password: '',
  isAuthorized: false,
});
