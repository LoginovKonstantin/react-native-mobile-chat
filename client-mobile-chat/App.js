import React from 'react';
import { Image, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import LoginForm from './LoginForm';
import ChatScreen from './ChatScreen';
import { _getData, _removeData } from './localStorage';
import { REST_HOST } from './config';

class App extends React.Component {
  static navigationOptions = {
    header: null
  }
  async componentDidMount() {
    const token = await _getData('token');
    console.log(token)
    fetch(`${REST_HOST}/api/token/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      }).then((response) => response.json())
      .then(async (json) => {
        if(json && json.token) {
          this.props.navigation.push('Chat')
        } else {
          await _removeData('login', login);
          await _removeData('token', token);
          this.props.navigation.push('Login')
        }
      })
      .catch((error) => {
        console.error(error);
      });    
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

export default createStackNavigator(
  {
    Login: App,
    Chat: ChatScreen,
  },
  {
    initialRouteName: 'Login',
  }
);