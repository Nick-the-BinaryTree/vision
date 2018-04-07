import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { Constants, Audio } from 'expo';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button 
          title="Read Full"
          onPress={async () => {
           /*
            const source = {
              uri: "http://www.fromtexttospeech.com/output/0329432001523087330/34887106.mp3" 
            };
           */ 
            try {
              await Audio.setIsEnabledAsync(true);
              const sound = new Audio.Sound();
              await sound.loadAsync(require("./assets/sounds/noscan.mp3"));
              await sound.playAsync(); 
            } catch(error) {
              console.error(error);
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
