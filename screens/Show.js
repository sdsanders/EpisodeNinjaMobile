import React from 'react';
import { Text, Image, StyleSheet, View, Dimensions } from 'react-native';
import {
  Container,
  Content,
  Card,
  Body,
  Icon,
  CardItem,
  Left,
  Right,
  Spinner
} from 'native-base';

export default class Search extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    
    return {
      title: params.seriesName,
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      show: {}
    };
  }

  async componentWillMount() {
    const { params } = this.props.navigation.state;
    const slug = params ? params.slug : null;
    const show = await (await fetch(`https://api.episode.ninja/episodes/${slug}`)).json();
    this.setState({show});
  }

  render() {
    if (!this.state.show.episodes) {
      return <Spinner color='blue' />;
    }
    return (
      <Container>
        <Content style={styles.content}>
          {
            this.state.show.episodes.map((episode, index) => (
              <Card avatar key={index}>
                <CardItem>
                  <Left>
                    <Text style={{fontSize: 40, fontWeight: 'bold'}}>#{index + 1}</Text>
                    <Body>
                      <Text>{episode.episodeName}</Text>
                      <Text note>Season {episode.airedSeason} - Episode {episode.airedEpisodeNumber}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image
                    source={{ uri: `https://thetvdb.com/banners/${episode.filename || this.state.show.fanart}` }}
                    style={{height: 200, width: null, flex: 1}}
                  />
                </CardItem>
                <CardItem>
                  <Text>{episode.overview}</Text>
                </CardItem>
                <CardItem>
                  <Left>
                    <Icon active name="star" style={{marginRight: 5, color: '#f0ad4e'}} />
                    <Text>{+(episode.rating).toFixed(2)}</Text>
                  </Left>
                  <Right>
                    <Text>{episode.ratingCount} votes</Text>
                  </Right>
                </CardItem>
              </Card>
            ))
          }
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    padding: 8
  }
});
