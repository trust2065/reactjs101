import Immutable from 'immutable';

export const UiState = Immutable.Map({
  spinnerVisible: false,
});

export const GithubState = Immutable.Map({
  userId: '',
  data: Immutable.Map(),
});