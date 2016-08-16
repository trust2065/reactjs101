import React from 'react';
import GithubBoxContainer from '../../containers/GithubBoxContainer';

const ResultPage = (props) => (
  <div> 
    <GithubBoxContainer data={props.data} userId={props.location.query.userId} />  
  </div>
);

export default ResultPage;
