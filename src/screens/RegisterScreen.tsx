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

const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('Student');
  const [department, setDepartment] = useState('');

  const departments = ['CSE', 'ECE', 'MECH', 'CIVIL'];

  const handleRegister = async () => {
    if (!name || !email || !password || !department) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );

      await firestore()
        .collection('users')
        .doc(userCredential.user.uid)
        .set({
          name,
          email,
          role,
          department,
          approved: role === 'Student' ? true : false,
          createdAt: new Date(),
        });

      Alert.alert('Success', 'Registered successfully!');
      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      {/* Name */}
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      {/* Email */}
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      {/* Password */}
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Department Selection */}
      <Text style={styles.roleTitle}>Select Department</Text>
      <View style={styles.roleContainer}>
        {departments.map(dep => (
          <TouchableOpacity
            key={dep}
            style={[
              styles.roleButton,
              department === dep && styles.selected,
            ]}
            onPress={() => setDepartment(dep)}
          >
            <Text
              style={
                department === dep ? styles.selectedText : styles.roleText
              }
            >
              {dep}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Role Selection */}
      <Text style={styles.roleTitle}>Select Role</Text>
      <View style={styles.roleContainer}>
        {['Student', 'Teacher', 'Parent'].map(item => (
          <TouchableOpacity
            key={item}
            style={[
              styles.roleButton,
              role === item && styles.selected,
            ]}
            onPress={() => setRole(item as Role)}
          >
            <Text
              style={
                role === item ? styles.selectedText : styles.roleText
              }
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* Login Redirect */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{ marginTop: 10, textAlign: 'center' }}>
          Already have account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold' },

  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },

  roleTitle: { marginTop: 10, marginBottom: 5, fontWeight: '600' },

  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  roleButton: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 3,
    alignItems: 'center',
  },

  roleText: {
    color: '#000',
    fontWeight: '600',
  },

  selected: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },

  selectedText: {
    color: '#fff',
    fontWeight: '600',
  },

  button: {
    marginTop: 15,
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 8,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;