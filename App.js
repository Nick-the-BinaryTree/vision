import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, Vibration, View } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {stage: "scanning", hasCameraPermission: null,
      photoId: 0}
    // start, scanning, read, return
    this.takePicture = this.takePicture.bind(this);
  };
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };
  async takePicture() {
    console.log('hey')
    console.log(this.camera)
    if (this.camera) {
      this.camera.takePictureAsync().then(data => {
        FileSystem.moveAsync({
          from: data.uri,
          to: `${FileSystem.documentDirectory}photos/Photo_${this.state.photoId}.jpg`,
        }).then(() => {
          this.setState({
            photoId: this.state.photoId + 1,
          });
          Vibration.vibrate();
        });
      });
    }
  }
  render() {
    const { hasCameraPermission } = this.state;
    return (this.state.stage === "start" ?
        <View style={styles.container}>
          <Text style={styles.title}>Good Name</Text>
        </View>
    : this.state.stage === "scanning" ?
      // camera business
      <TouchableNativeFeedback onPress={this.takePicture}>
        <View style={styles.container}>
          <Camera style={{ flex: .8 }} type={this.state.type} ref={ref => {
            this.camera = ref; }}>
            <TouchableNativeFeedback
              style={{ flex: 0.3, alignSelf: 'flex-end' }}
              onPress={this.takePicture.bind(this)}>
            <Text style={styles.buttonText}> SNAP </Text>
          </TouchableNativeFeedback>
          </Camera>
        </View>
      </TouchableNativeFeedback>
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
