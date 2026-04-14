import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen.tsx';
import StudentHome from '../screens/StudentHome.tsx';
import TeacherHome from '../screens/TeacherHome.tsx';
import ParentHome from '../screens/ParentHome.tsx';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="StudentHome" component={StudentHome} />
        <Stack.Screen name="TeacherHome" component={TeacherHome} />
        <Stack.Screen name="ParentHome" component={ParentHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;