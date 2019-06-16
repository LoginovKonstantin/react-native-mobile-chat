import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Input, Button } from 'react-native-elements';
import { _setData } from './localStorage';
import { REST_HOST } from './config';

export default class LoginForm extends React.Component {
  state = {
    login: '',
    password: '',
    error: null
  }
  handleLogin(value) {
    this.setState({ login: value });
  }
  handlePassword(value) {
    this.setState({ password: value })
  }
  login() {
    const { login, password } = this.state;
    if (
      login.length > 1 &&
      login.length < 20 &&
      password.length > 1 &&
      password.length < 20
    ) {
      fetch(`${REST_HOST}/api/login/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      })
      .then((response) => response.json())
      .then(async (json) => {
        if(json && json.token) {
          await _setData('token', json.token);
          await _setData('login', login);
          this.props.navigation.push('Chat')
        } else {
          this.setState({ error: 'Invalid login | password' });
        }
      })
      .catch((error) => {
        console.error(error);
      });
    } else {
      console.log('error');
    }

  }
  render() {
    const color = '#6a739f';
    const error = this.state.error != null ? 
      (<Text style={{color: 'red'}}>{this.state.error}</Text>) :
      (<Text>{''}</Text>);

    return (
      <View style={{ flex: 1, flexDirection: 'row' }} >
        <View style={{ width: 60 }} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
          <Input
            value={this.state.login}
            onChange={(e) => this.handleLogin(e.target.value)}
            maxLength={20}
            underlineColorAndroid={color}
            containerStyle={styles.containerStyleInput}
            inputStyle={{ color: 'white' }}
            placeholder='YOUR LOGIN'
            leftIcon={<CustomIcon isPassword={false} />}
          />
          <Input
            value={this.state.password}
            onChange={(e) => this.handlePassword(e.target.value)}
            maxLength={20}
            underlineColorAndroid={color}
            containerStyle={styles.containerStyleInput}
            inputStyle={{ color: 'white' }}
            secureTextEntry={true}
            placeholder='YOUR PASSWORD'
            leftIcon={<CustomIcon isPassword={true} />}
          />
          <Button
            onClick={() => this.login()}
            buttonStyle={styles.buttonStyle}
            title="SIGN IN"
          />
          {error}
        </View>
        <View style={{ width: 60 }} />
      </View>
    )
  }
}
const CustomIcon = ({ isPassword }) => (
  <Icon
    style={{ marginRight: '10px', marginLeft: '-10px' }}
    name={isPassword ? 'lock' : 'user'}
    size={24}
    color='#6a739f'
  />
)
const styles = StyleSheet.create({
  buttonStyle: {
    width: '150px',
    padding: '15px',
    backgroundColor: '#6a739f'
  },
  containerStyleInput: {
    marginBottom: '20px',
    borderWidth: '2px',
    borderColor: '#6a739f',
    borderRadius: '20px',
    minWidth: '300px',
    maxWidth: '300px'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});