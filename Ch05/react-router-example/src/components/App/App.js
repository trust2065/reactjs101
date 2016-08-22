import React from 'react';
import { Link } from 'react-router';
import styles from './appStyles';

const App = (props) => (
  <div>
    <h1>React Router Tutorial</h1>
    <ul>
      <li><Link to="/about" activeStyle={{ color: 'red' }}>About</Link></li>
      <li><Link to="/repos" activeStyle={styles.active}>Repos</Link></li>
      <li><Link to="/contacts" activeClassName="active">Contacts</Link></li>
    </ul>
    {props.children}
  </div>
);

App.propTypes = {
  children: React.PropTypes.object,
};

export default App;
