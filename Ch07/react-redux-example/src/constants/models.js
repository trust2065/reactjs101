import Immutable from 'immutable';

export const TodoState = Immutable.fromJS({
  'todos': [],
  'todo': {
    id: '',
    text: '',
    updatedAt: '',
    completed: false,
  }
});

// import Immutable from 'immutable';

// export const TodoState = Immutable.Map({
//   'todos': Immutable.List(),
//   'todo': Immutable.Map({
//     id: '',
//     text: '',
//     updatedAt: '',
//     completed: false,
//   })
// });