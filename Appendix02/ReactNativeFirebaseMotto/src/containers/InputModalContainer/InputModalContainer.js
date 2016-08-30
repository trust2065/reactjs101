import { connect } from 'react-redux';
import InputModal from '../../components/InputModal';
import {
  toggleModal,
} from '../../actions';
 
export default connect(
  (state) => ({
    isModalVisible: state.getIn(['ui', 'isModalVisible'])
  }),
  (dispatch) => ({
    onToggleModal: () => (
      dispatch(toggleModal())
    )
  })
)(InputModal);
