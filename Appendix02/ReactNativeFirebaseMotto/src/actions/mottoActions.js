import { createAction } from 'redux-actions';
import {
  GET_MOTTOS,
  CREATE_MOTTO,
  CHAGE_MOTTO_TITLE,
} from '../constants/actionTypes';

export const getMottos = createAction('GET_MOTTOS');
export const createMotto = createAction('CREATE_MOTTO');
export const changeMottoTitle = createAction('CHAGE_MOTTO_TITLE');
