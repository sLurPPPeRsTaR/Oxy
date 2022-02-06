import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {Book} from '../../assets';
import {CustomButton} from '../../components';
import GlobalStyle from '../../GlobalStyle';

const Login = ({navigation}) => {
  const [loginUsername, setLoginUsername] = useState('');

  const handlerLogin = () => {
    if (loginUsername) {
      navigation.navigate('Screen_Home', {loginUsername: `${loginUsername}`});
      setLoginUsername('');
    } else {
      alert('please enter your username');
    }
  };
  return (
    <View style={GlobalStyle.Pages.Login.body}>
      <Text style={GlobalStyle.Global.text}>Rental Book Apps</Text>
      <Book />
      <Text style={GlobalStyle.Global.text}>
        Please fill it with "Admin" if you desire superpower.
      </Text>
      <View style={GlobalStyle.Pages.Login.inputWrapper}>
        <Text style={GlobalStyle.Global.text}>Username</Text>
        <TextInput
          style={GlobalStyle.Pages.Login.input}
          onChangeText={value => setLoginUsername(value)}
        />
      </View>
      <CustomButton title="Login" handler={handlerLogin} />
    </View>
  );
};

export default Login;
