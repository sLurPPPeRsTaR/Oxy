import React from 'react';
import {Pressable, Text} from 'react-native';
import GlobalStyle from '../../../GlobalStyle';

const CustomButton = ({title, handler}) => {
  return (
    <Pressable style={GlobalStyle.Atoms.customButtonStyle} onPress={handler}>
      <Text style={GlobalStyle.Global.text}>{title}</Text>
    </Pressable>
  );
};
export default CustomButton;
