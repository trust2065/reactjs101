import React from 'react';
import TodoHeader from '../TodoHeader';
import TodoList from '../TodoList';

const Main = () => (
  <div>
    <h1>Todos</h1>
    <TodoHeader />
    <TodoList />
  </div>
);

export default Main;