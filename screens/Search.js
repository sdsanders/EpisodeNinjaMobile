import React from 'react';
import { Text, Image, StyleSheet, View, Keyboard } from 'react-native';
import {
  Container,
  Content,
  Item,
  Input,
  Card,
  Icon,
  CardItem
} from 'native-base';
import debounce from 'debounce';

export default class Search extends React.Component {
  static navigationOptions = {
    title: 'episode.ninja',
  };

  constructor(props) {
    super(props);

    this.state = {
      results: []
    };

    this.handleChange = debounce(this.search, 500);
  }

  async search (query) {
    if (!query) {
      return;
    }
    let results = await (await fetch(`https://episodes.stevendsanders.com/search/${encodeURIComponent(query)}`)).json();
    results = results || [];
    this.setState({results});
  }

  goToShow(show) {
    console.log('going to show');
    Keyboard.dismiss();
    this.props.navigation.navigate('Show', {
      slug: show.slug,
      seriesName: show.seriesName
    });
  }

  render() {
    return (
      <Container>
        <Content style={styles.content}>
          <Text style={{textAlign: 'center', fontSize: 32}}>Find the best episodes of any TV show</Text>
          <Card searchBar rounded>
            <Item>
              <Icon name="ios-search" style={{marginLeft: 5}} />
              <Input
                placeholder="Search for a show"
                onChangeText={(text) => {this.handleChange(text)}}
              />
            </Item>
            {
              this.state.results.map((show, index) => (
                <CardItem button
                  key={index} onPress={() => {this.goToShow(show)}}
                  style={{paddingTop: 4, paddingBottom: 4, paddingLeft: 8}}
                >
                  <Image
                    style={{height: 54, width: 97, marginRight: 10}}
                    source={{ uri: `https://cdn.episode.ninja/file/episodeninja/${show.id}-thumb.jpg` }}
                  />
                  <Text style={{fontSize: 18}}>{show.seriesName}</Text>
                </CardItem>
              ))
            }
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    padding: 8
  },
});
