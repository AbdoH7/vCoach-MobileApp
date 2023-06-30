import React from 'react';
import { View } from 'react-native';
import { Video } from 'expo-av';

function VideoDisplay({video}) {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Video
        source={{ uri: video }}
        style={{ width: 360, height: 240 }}
        useNativeControls
      />
    </View>
  );
};

export default VideoDisplay;
