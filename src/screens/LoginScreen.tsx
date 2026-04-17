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

type Role = 'Student' | 'Teacher' | 'Parent';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('Student');

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

      if (!userData?.approved) {
        Alert.alert('Pending', 'Waiting for admin approval');
        return;
      }

      // 🔥 Role-based navigation
      if (userData.role === 'Student') {
        navigation.replace('StudentHome');
      } else if (userData.role === 'Teacher') {
        navigation.replace('TeacherHome');
      } else {
        navigation.replace('ParentHome');
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
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

     

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={{ marginTop: 10 }}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },

  roleTitle: {
    marginTop: 10,
    fontWeight: '600',
  },

  roleContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },

  roleButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    margin: 3,
    alignItems: 'center',
  },

  roleSelected: {
    backgroundColor: '#2563EB',
  },

  roleText: {
    color: '#000',
  },

  roleTextSelected: {
    color: '#fff',
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