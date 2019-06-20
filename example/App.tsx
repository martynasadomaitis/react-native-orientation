import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import Orientation from "@lightbase/react-native-orientation";

export default class App extends Component {
  _orientationHandler = (orientation: string) => {
    console.warn(orientation);
  };

  componentDidMount(): void {
    Orientation.addOrientationListener(this._orientationHandler);
    Orientation.lockToPortrait();
  }

  componentWillUnmount(): void {
    Orientation.removeOrientationListener(this._orientationHandler);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
