import { handleActions } from 'redux-actions';
import { 
  MottoState
} from '../../constants/models';

import {
  GET_MOTTOS,
  CREATE_MOTTO,
  CHAGE_MOTTO_TITLE,
} from '../../constants/actionTypes';

const mottoReducers = handleActions({
  GET_MOTTOS: (state, { payload }) => (
    state.set(
      'mottos',
      payload.mottos
    )
  ),  
  CREATE_MOTTO: (state) => (
    state.set(
      'mottos',
      state.get('mottos').push(state.get('motto'))
    )
  ),
  CHAGE_MOTTO_TITLE: (state, { payload }) => (
    state.merge(
      ['motto', 'title'],
      payload.value.title
    )
  )
}, MottoState);

export default mottoReducers;