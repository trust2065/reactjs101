import React from 'react';
import { connect } from 'react-redux';
import ShareBox from '../../components/ShareBox';

import { 
  addRecipe,
  showSpinner,
  setRecipe,
} from '../../actions';

export default connect(
  (state) => ({
    name: state.getIn(['recipe', 'name']),
    description: state.getIn(['recipe', 'description']),
    imagePath: state.getIn(['recipe', 'imagePath']),
  }),
  (dispatch) => ({
    onChangeNameInput: (event) => (
      dispatch(setRecipe({ key: 'name', value: event.target.value }))
    ),
    onChangeDescriptionInput: (event) => (
      dispatch(setRecipe({ key: 'description', value: event.target.value }))
    ),
    onChangeImageUrl: (event) => (
      dispatch(setRecipe({ key: 'imagePath', value: event.target.value }))
    ),    
    onRecipeSubmit: (name, description, imagePath) => () => {
      dispatch(addRecipe(dispatch, name, description, imagePath));
      dispatch(showSpinner());
    },    
  }),
  (stateProps, dispatchProps, ownProps) => {
    const { name, description, imagePath } = stateProps;
    const { onRecipeSubmit } = dispatchProps;
    return Object.assign({}, stateProps, dispatchProps, ownProps, {
      onRecipeSubmit: onRecipeSubmit(name, description, imagePath),
    });
  }  
)(ShareBox);

