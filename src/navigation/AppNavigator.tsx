import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen.tsx';
import StudentHome from '../screens/StudentHome.tsx';
import TeacherHome from '../screens/TeacherHome.tsx';
import ParentHome from '../screens/ParentHome.tsx';
import GalleryScreen from '../screens/GalleryScreen.tsx';
import TimetableMenuScreen from '../screens/TimetableMenuScreen.tsx';
import TimetableScreen from '../screens/TimetableScreen.tsx';
import CreateMeetingScreen from '../screens/CreateMeetingScreen.tsx';
import MeetingViewerScreen from '../screens/MeetingViewerScreen.tsx';
import AttendanceScreen from '../screens/ParentAttendanceScreen.tsx';
import RegisterScreen from '../screens/RegisterScreen.tsx';
import AdminScreen from '../screens/AdminScreen.tsx';
import UploadResultScreen from '../screens/UploadResultScreen.tsx';
import ViewResultsScreen from '../screens/ViewResultsScreen.tsx';
import LibraryScreen from '../screens/LibraryScreen.tsx';
import ChatBotScreen from '../screens/ChatBotScreen.tsx';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="StudentHome" component={StudentHome} />
        <Stack.Screen name="TeacherHome" component={TeacherHome} />
        <Stack.Screen name="ParentHome" component={ParentHome} />
        <Stack.Screen name="Gallery" component={GalleryScreen} />
        <Stack.Screen name="TimetableMenu" component={TimetableMenuScreen} />
        <Stack.Screen name="TimetableScreen" component={TimetableScreen} />
        <Stack.Screen name="CreateMeeting" component={CreateMeetingScreen} />
<Stack.Screen name="MeetingViewer" component={MeetingViewerScreen} />
<Stack.Screen name="Attendance" component={AttendanceScreen} />
<Stack.Screen name="Register" component={RegisterScreen} />
<Stack.Screen name="Admin" component={AdminScreen} />
<Stack.Screen name="UploadResult" component={UploadResultScreen} />
<Stack.Screen name="ViewResults" component={ViewResultsScreen} />
<Stack.Screen name="Library" component={LibraryScreen} />
<Stack.Screen name="ChatBot" component={ChatBotScreen} />




      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;