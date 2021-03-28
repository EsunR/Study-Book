import React from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';

const WebViewTest: React.FC = () => {
  return (
    <View style={{backgroundColor: 'pink', flex: 1}}>
      <WebView
        source={{uri: 'http://192.168.31.174:8080/'}}
        // style={{backgroundColor: 'pink'}}
      />
    </View>
  );
};

export default WebViewTest;
