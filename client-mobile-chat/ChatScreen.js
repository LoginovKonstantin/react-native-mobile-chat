import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Input, Button } from 'react-native-elements';
import { _removeData } from './localStorage';
import { host } from './config';

export default class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
    // headerTitle: <LogoTitle />,
      headerStyle: {
        backgroundColor: '#2e3246',
      },
      // headerTintColor: navigationOptions.headerStyle.backgroundColor,
      headerRight: (
        <Icon
          style={{ marginRight: '20px' }}
          onClick={async () => {
            await _removeData('token');
            await _removeData('login');
            navigation.push('Login');  
          }}
          name={'home'}
          size={32}
          color='#6a739f'
        />
      ),
      headerLeft: (null)
    }
  }
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