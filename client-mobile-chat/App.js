import React from 'react';
import { Image, View } from 'react-native';
import LoginForm from './LoginForm';

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: '#2e3246' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        <Image style={{ width: 100, height: 100, marginTop: '300px' }} source={require('./assets/logo1.png')} />
      </View>
      <View style={{ flex: 1 }} >
        <LoginForm />
      </View>
      <View style={{ flex: 1 }} />
    </View>
  )
}