import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DetailBook, Login, Splash, Home} from '../pages';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator
      initialRouteName="Screen_Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Screen_DetailBook" component={DetailBook} />
      <Stack.Screen name="Screen_Home" component={Home} />
      <Stack.Screen name="Screen_Login" component={Login} />
      <Stack.Screen name="Screen_Splash" component={Splash} />
    </Stack.Navigator>
  );
};

export default Router;
