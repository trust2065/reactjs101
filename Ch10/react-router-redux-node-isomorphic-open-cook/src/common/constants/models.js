import Immutable from 'immutable';

// initstate model
export const UiState = Immutable.Map({
  spinnerVisible: false,
  isEdit: false,
});

export const RecipeState = Immutable.Map({
  recipes: [],  
  recipe: {
    id: '',
    name: '', 
    description: '', 
    imagePath: '',     
  } 
});

export const UserState = Immutable.Map({
  username: '',
  email: '',
  password: '',
  isAuthorized: false,
});
