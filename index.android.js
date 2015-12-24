/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Component,
  PullToRefreshViewAndroid,
} = React;

import Talks from './Talks';

//var reactNativeParallaxScrollView = React.createClass({

class reactNativeParallaxScrollView extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <PullToRefreshViewAndroid
        ref={ref => { this._pullToRefresh = ref }}
        style={{ flex: 1 }}
        colors={['#000', '#999', '#fff']}
        progressBackgroundColor={'#fff'}
        enabled={true}
        refreshing={false}
        onRefresh={() => {
          this._pullToRefresh.getInnerViewNode().setNativeProps({ refreshing: true });
          setTimeout(() => {
            this._pullToRefresh.getInnerViewNode().setNativeProps({ refreshing: false });
          }, 5000);
        }}>
        <Talks
          key="talks"
          onScroll={(e) => {
            if (e.nativeEvent.contentOffset.y <= 0) {
              this._pullToRefresh.getInnerViewNode().setNativeProps({ enabled: true });
            } else {
              this._pullToRefresh.getInnerViewNode().setNativeProps({ enabled: false });
            }
          }}/>
      </PullToRefreshViewAndroid>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('reactNativeParallaxScrollView', () => reactNativeParallaxScrollView);
