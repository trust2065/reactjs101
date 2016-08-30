import { connect } from 'react-redux';
import MottoList from '../../components/MottoList';
import uuid from 'uuid';

import {
  createMotto,
  getMottos,
  changeMottoTitle,
} from '../../actions';

export default connect(
  (state) => ({
    mottos: state.getIn(['motto', 'mottos']),
  }),
  (dispatch) => ({
    onCreateMotto: () => (
      dispatch(createMotto())
    ),
    onGetMottos: (mottos) => (
      dispatch(getMottos({ mottos }))
    ),
    onChangeMottoTitle: (title) => (
      dispatch(changeMottoTitle({ value: title }))
    )
  })
)(MottoList);