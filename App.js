import React from 'react';
import { View, Text } from 'react-native';
import { Container } from 'native-base';
import Search from './screens/Search';

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

    return (
      <Container style={{paddingTop: Expo.Constants.statusBarHeight}}>
        <Search />
      </Container>
    )
  }

  
}
