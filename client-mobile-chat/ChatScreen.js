import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Input } from 'react-native-elements';
import { _removeData } from './localStorage';
import { _getData } from './localStorage';
import SocketIOClient from 'socket.io-client';
import { SOCKET_HOST } from './config';

export default class ChatScreen extends React.Component {
  constructor(props) {
    if(__DEV__) {
      console.log("dev");
    } else {
      console.log("not dev");
    }
    super(props);
    this.state = {
      message: '',
      messages: []
    }
    // Creating the socket-client instance will automatically connect to the server.
    this.socket = SocketIOClient(SOCKET_HOST);
    this.socket.on('messages-from-server', (messages) => this.updateAllChat(messages));
    this.socket.on('message-from-server', (message) => this.updateChat(message));
  }
  updateAllChat(messages) {
    this.setState(prevState => ({
      messages: [...prevState.messages, ...messages]
    }))
  }
  updateChat(message) {
    this.setState(prevState => ({
      messages: [...prevState.messages, message]
    }))
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: { backgroundColor: '#2e3246' },
      headerRight: (
        <Icon
          style={{ marginRight: 20 }}
          onPress={async () => {
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
  async sendMessage() {
    const { message } = this.state;
    const from = await _getData('login');
    const time = new Date().getTime();
    if (message.length > 0) {
      this.setState({ message: '' });
      this.socket.emit('message-from-client', { from, time, message });
    }
  }
  render() {
    const color = '#6a739f';
    const messages = this.state.messages.map((el, i) => (
      <View style={{
        backgroundColor: 'red',
        backgroundColor: 'rgb(63, 68, 93)',
        marginTop: 10,
        padding: 10
      }} key={i}>
        <Text style={{ color: '#9e9e9e' }}>{el.from} - {getDate(el.time)}</Text>
        <Text style={{ color: 'white' }}>{el.message}</Text>
      </View>

    ));
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 10, backgroundColor: '#2e3246' }}>
          <ScrollView
            ref={ref => this.scrollView = ref}
            contentContainerStyle={{marginBottom: 10}}
            onContentSizeChange={(contentWidth, contentHeight) => {
              this.scrollView.scrollToEnd({ animated: true });
            }}>
            {messages}
          </ScrollView>
        </View>
        <View style={{ flex: 1, justifyContent: 'center',
            alignItems: 'center', backgroundColor: '#2e3246', padding: 10 }}>
          <Input
            value={this.state.message}
            onChangeText={p => this.setState({ message: p })}
            maxLength={100}
            underlineColorAndroid={color}
            containerStyle={styles.containerStyleInput}
            inputStyle={{ color: 'white' }}
            placeholder='ENTER YOUR MESSAGE...'
            rightIcon={
              <Icon
                onPress={() => this.sendMessage()}
                style={{ marginRight: 10 }}
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
    borderWidth: 2,
    borderColor: '#6a739f',
    borderRadius: 20,
  }
});

const twoDigit = (n) => (n < 10 ? '0' : '') + n;

const getDate = date => {
  try {
    const d = new Date(+date);
    const day = twoDigit(d.getDate());
    const month = twoDigit(d.getMonth());
    const hours = twoDigit(d.getHours());
    const minutes = twoDigit(d.getMinutes());
    return `${day}.${month} ${hours}:${minutes}`;
  } catch (err) {
    console.log(err);
    return '(...)';
  }
}
