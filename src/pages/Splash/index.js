import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {Oxy} from '../../assets';
import GlobalStyle from '../../GlobalStyle';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      // navigation.replace('Screen_DetailBook');
      navigation.replace('Screen_Login');
    }, 3000);
  }, []);
  return (
    <View style={GlobalStyle.Pages.Splash.img}>
      <Oxy />
      <Text style={GlobalStyle.Global.text}>Loading...</Text>
    </View>
  );
};

export default Splash;
