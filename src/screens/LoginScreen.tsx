import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Enter email and password');
      return;
    }

    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);

      const userDoc = await firestore()
        .collection('users')
        .doc(userCredential.user.uid)
        .get();

      const userData = userDoc.data();

      if (!userData) {
        Alert.alert('Error', 'User data not found');
        return;
      }

      if (!userData.approved) {
        Alert.alert('Pending', 'Waiting for approval');
        return;
      }

      if (userData.role === 'Student') {
        navigation.replace('StudentHome');
      } else if (userData.role === 'Teacher') {
        navigation.replace('TeacherHome');
      } else if (userData.role === 'Parent') {
        navigation.replace('ParentHome');
      } else {
        Alert.alert('Error', 'Invalid role');
      }

    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ACAMS Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={{ marginTop: 10, textAlign: 'center' }}>
          Create Account
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Admin')}>
  <Text>Go to Admin</Text>
</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#2563EB',
    padding: 12,
    marginTop: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default LoginScreen;