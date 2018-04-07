import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {stage: "read"}
    // start, scanning, read, return
  }
  render() {
    return (this.state.stage === "start" ?
        <View style={styles.container}>
          <Text style={styles.title}>Good Name</Text>
        </View>
    : this.state.stage === "scanning" ?
      // camera business
      <Text> hey </Text>
    : this.state.stage === "read" ?
        <View style={styles.container}>
          <TouchableNativeFeedback style={styles.buttonWrapper} onLongPress={() => (console.log())}>
            <View style={[styles.button, styles.topButton]}>
                <Text style={styles.buttonText}>Read Full</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback style={styles.buttonWrapper} onLongPress={() => (console.log())}>
            <View style={[styles.button, styles.bottomButton]}>
                <Text style={styles.buttonText}>Read Quick</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        : <Text> hey </Text>
      );
  }
}

/*
<TouchableNativeFeedback style={styles.buttonWrapper} onLongPress={() => (console.log())}>
  <View style={styles.button, styles.topButton}>
      <Text style={styles.buttonText}> hey </Text>
  </View>
</TouchableNativeFeedback>
<View>
  <TouchableNativeFeedback style={styles.buttonWrapper} onLongPress={() => (console.log())}>
    <View style={styles.button, styles.bottomButton}>
        <Text style={styles.buttonText}> hey </Text>
    </View>
  </TouchableNativeFeedback>
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#4FC3F7',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  buttonWrapper: {
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  topButton: {
    backgroundColor: '#4DD0E1'
  },
  bottomButton: {
    backgroundColor: '#E57373'
  },
  buttonText: {
    fontSize: 50,
    color: '#fff'
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.60)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 10
  }
});
