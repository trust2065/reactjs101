import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import Main from '../src/components/Main';

function shallowRender(Component) {
  const renderer = TestUtils.createRenderer();
  renderer.render(<Component/>);
  return renderer.getRenderOutput();
}

describe('Shallow Rendering', function () {
  it('Main title should be h1', function () {
    const todoItem = shallowRender(Main);
    expect(todoItem.props.children[0].type).to.equal('h1');
    expect(todoItem.props.children[0].props.children).to.equal('Todos');
  });
});