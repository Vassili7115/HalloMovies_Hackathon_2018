import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  WebView
} from "react-native";
import App from "./App";
export default class FicheFilm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      film: null,
      trailer: null,
      renderApp: false
    };
  }
  componentDidMount() {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        this.props.filmId
      }?api_key=fe92e01fc7f7de2e7bb39a4066baf3c3`
    )
      .then(resp => resp.json())
      .then(resp => this.setState({ film: resp }));
    fetch(
      `http://api.themoviedb.org/3/movie/${
        this.props.filmId
      }/videos?api_key=fe92e01fc7f7de2e7bb39a4066baf3c3`
    )
      .then(resp => resp.json())
      .then(resp => this.setState({ trailer: resp.results }));
  }
  handleClickRenderApp = () => {
    this.setState({ renderApp: true });
  };

  render() {
    if (this.state.renderApp === true) return <App />;
    if (this.state.film === null) return <Text>Loading...</Text>;
    if (this.state.trailer === null) return <Text>Loading...</Text>;

    console.log("film", this.state.film.title);
    if (this.state.trailer[0] != undefined)
      return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.container}>
            <Text style={styles.textH}>HalloMovies</Text>
            <Text style={styles.textTitle}>{this.state.film.title}</Text>
            <Image
              style={{ width: 150, height: 220 }}
              source={{
                uri: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${
                  this.state.film.poster_path
                }`
              }}
            />
            <Text style={{ color: "white", paddingTop: 5 }}>
              Original Title : {this.state.film.original_title}
            </Text>
            <Text style={{ color: "white", paddingTop: 10 }}>
              Release Date : {this.state.film.release_date}
            </Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.overview}>{this.state.film.overview}</Text>
            <Text style={styles.revenue}>
              {" "}
              Budget :{this.state.film.budget}$
            </Text>
            <Text style={styles.revenue}>
              {" "}
              Revenue : {this.state.film.revenue}$
            </Text>
            <Text style={styles.budget}>
              Note : {this.state.film.vote_average}
              /10
            </Text>

            <WebView
              style={styles.youtube}
              javaScriptEnabled={true}
              source={{
                uri: `https://www.youtube.com/embed/${
                  this.state.trailer[0].key
                }?rel=0&autoplay=0&showinfo=0&controls=0`
              }}
            />
            <View style={styles.containerback}>
              <TouchableHighlight onPress={() => this.handleClickRenderApp()}>
                <Image
                  style={{ height: 100, width: 100 }}
                  source={require("./Pumpkin.png")}
                />
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      );
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.container}>
          <Text style={styles.textH}>HalloMovies</Text>
          <Text style={styles.textTitle}>{this.state.film.title}</Text>
          <Image
            style={{ width: 150, height: 220 }}
            source={{
              uri: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${
                this.state.film.poster_path
              }`
            }}
          />
          <Text style={{ color: "white", paddingTop: 5 }}>
            Original Title : {this.state.film.original_title}
          </Text>
          <Text style={{ color: "white", paddingTop: 10 }}>
            Release Date : {this.state.film.release_date}
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.overview}>{this.state.film.overview}</Text>
          <Text style={styles.revenue}> Budget :{this.state.film.budget}$</Text>
          <Text style={styles.revenue}>
            {" "}
            Revenue : {this.state.film.revenue}$
          </Text>
          <Text style={styles.budget}>
            Note : {this.state.film.vote_average}
            /10
          </Text>

          <Text style={styles.revenue}>No Trailer Available</Text>
          <View style={styles.containerback}>
            <TouchableHighlight onPress={() => this.handleClickRenderApp()}>
              <Image
                style={{ height: 100, width: 100 }}
                source={require("./Pumpkin.png")}
              />
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerback: {
    flex: 1,
    flexDirection: "row",
    width: 300,
    justifyContent: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center"
  },

  textH: {
    fontSize: 40,
    color: "orangered",
    fontWeight: "bold",
    paddingVertical: 30
  },

  textNameFilm: {
    paddingVertical: 10,
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },

  textTitle: {
    paddingVertical: 20,
    color: "white",
    fontSize: 30,
    fontWeight: "bold"
  },

  budget: {
    color: "white",
    paddingBottom: 10
  },

  overview: {
    color: "white",
    paddingVertical: 15,
    paddingHorizontal: 40
  },

  revenue: {
    color: "white",
    paddingBottom: 18
  },

  youtube: {
    flex: 1,
    width: 350,
    height: 200
  }
});
