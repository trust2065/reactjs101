import React from 'react';
import { Link } from 'react-router';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Main</h1>
        <h2>SubTitle</h2>
        <ul role="nav">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/repos">Repos</Link></li>
        </ul>
        <h3>{this.props.children}</h3>
      </div>
    );
  }
}

export default App;