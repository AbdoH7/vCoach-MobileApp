import React from 'react';
import { View } from 'react-native';
import { Video } from 'expo-av';

function VideoDisplay({video}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Video
        source={{ uri: video }}
        style={{ width: 300, height: 200 }}
        useNativeControls
      />
    </View>
  );
};

export default VideoDisplay;
