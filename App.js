import React from 'react';
import { View, Text } from 'react-native';
import { Container } from 'native-base';
import { StackNavigator } from 'react-navigation';
import Search from './screens/Search';
import Show from './screens/Show';

const RootStack = StackNavigator(
  {
    Search: {
      screen: Search
    },
    Show: {
      screen: Show
    },
  },
  {
    initialRouteName: 'Search',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#424242',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }
  }
);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });

    this.setState({loading: false});
  }

  render() {
    if (this.state.loading) {
      return (<View />);
    }

    return (<RootStack />);
  }
}
