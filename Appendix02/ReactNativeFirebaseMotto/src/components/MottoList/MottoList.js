import React, { Component } from 'react';
import ReactNative from 'react-native';
import Immutable from 'immutable';

import ListItem from '../ListItem';
const { View, Text, ListView } = ReactNative;

class MottoList extends Component {
  constructor(props) {
    super(props);
    this.renderListItem = this.renderListItem.bind(this);
    this.listenForItems = this.listenForItems.bind(this);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => !immutable.is(r1, r2),
    })
    this.state = {
      dataSource: ds.cloneWithRows(props.mottos.toArray()),
    }
  }
  renderListItem(item) {
    return (
      <ListItem item={item} />
    );
  }  
  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      this.props.onGetMottos(Immutable.fromJS(snap.val()));
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.props.mottos.toArray())
      });
    });
  }
  componentDidMount() {
    this.listenForItems(this.props.itemsRef);
  }
  render() {
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderListItem}
          enableEmptySections={true}
        />
      </View>
    );
  }
}

export default MottoList;
