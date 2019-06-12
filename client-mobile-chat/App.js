import React from 'react';
import { Image, View, Text, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import LoginForm from './LoginForm';

class App extends React.Component {
  static navigationOptions = {
    header: null
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#2e3246' }}>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }} >
          <Image style={{ width: 100, height: 100, marginTop: '300px' }} source={require('./assets/logo1.png')} />
        </View>
        <View style={{ flex: 1 }} >
          <LoginForm {...this.props} />
        </View>
        <View style={{ flex: 1 }} />
      </View>
    )
  }
}

class ChatScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Home Screen"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    );
  }
}

export default createStackNavigator(
  {
    Login: App,
    Chat: ChatScreen,
  },
  {
    initialRouteName: 'Login',
  }
);