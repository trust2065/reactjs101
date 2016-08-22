import Immutable from 'immutable';

export const TodoState = Immutable.Map({
  'todos': Immutable.List(),
  'todo': Immutable.Map({
    id: '',
    text: '',
    updatedAt: '',
    completed: false,
  })
});
