import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Input, Button } from 'react-native-elements';
import { _removeData } from './localStorage';
import InputScrollView from 'react-native-input-scroll-view'; 
import SocketIOClient from 'socket.io-client';
import { host } from './config';

export default class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      message: '',
    }
    // Creating the socket-client instance will automatically connect to the server.
    this.socket = SocketIOClient(host);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: { backgroundColor: '#2e3246' },
      headerRight: (
        <Icon
          style={{ marginRight: '20px' }}
          onClick={async () => {
            await _removeData('token');
            await _removeData('login');
            navigation.push('Login');  
          }}
          name={'home'} size={32} color='#6a739f'
        />
      ),
      headerLeft: (null)
    }
  }
  handleMessage(value) {
    this.setState({ message: value });
  }
  sendMessage() {
    const { message } = this.state;
    if(message.length > 0) {
      console.log(this.state.message);
      this.setState({ message: '' });
    }
  }
  render() {
    const color = '#6a739f';
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 10, backgroundColor:'red' }}>
          <InputScrollView>
            
          </InputScrollView>
        </View>
        <View style={{ flex: 1, backgroundColor:'#2e3246' }}>
          <Input
            value={this.state.message}
            onChange={(e) => this.handleMessage(e.target.value)}
            maxLength={100}
            underlineColorAndroid={color}
            containerStyle={styles.containerStyleInput}
            inputStyle={{ color: 'white' }}
            placeholder='ENTER YOUR MESSAGE...'
            rightIcon={
              <Icon
                onPress={() => this.sendMessage()}
                style={{ marginRight: '10px' }}
                name={'right'} size={24}
                color='#6a739f'
              />
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyleInput: {
    marginBottom: '20px',
    borderWidth: '2px',
    borderColor: '#6a739f',
    borderRadius: '20px',
  }
});