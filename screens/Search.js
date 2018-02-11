import React from 'react';
import { Text, Image, StyleSheet, View } from 'react-native';
import {
  Container,
  Header,
  Content,
  Item,
  Input,
  Card,
  Thumbnail,
  Body,
  Icon,
  Title,
  List,
  ListItem
} from 'native-base';
import debounce from 'debounce';

export default class Search extends React.Component {
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

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Episode Ninja</Title>
          </Body>
        </Header>
        <Content style={styles.content}>
          <Card searchBar rounded>
            <Item>
              <Icon name="ios-search" style={{marginLeft: 5}} />
              <Input placeholder="Search" onChangeText={(text) => {this.handleChange(text)}} />
            </Item>
          </Card>

          <List>
            {
              this.state.results.map((show, index) => (
                <ListItem avatar key={index}>
                  <Thumbnail square size={80} source={{ uri: `https://cdn.episode.ninja/file/episodeninja/${show.id}-thumb.jpg` }} />
                  <Body>
                    <Text style={{fontSize: 18}}>{show.seriesName}</Text>
                  </Body>
                </ListItem>
              ))
            }
          </List>
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
