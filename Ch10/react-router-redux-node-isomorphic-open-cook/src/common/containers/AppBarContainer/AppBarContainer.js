import React from 'react';
import { connect } from 'react-redux';
import AppBar from '../../components/AppBar';

import {
  startLogout,
} from '../../actions';

export default connect(
  (state) => ({
    isAuthorized: state.getIn(['user', 'isAuthorized']),
  }),
  (dispatch) => ({
    onLogout: () => (
      dispatch(startLogout(dispatch))
    ),
  })
)(AppBar);

