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
  const [year, setYear] = useState('');

  const departments = ['CSE', 'ECE', 'MECH', 'CIVIL'];
  const years = ['1', '2', '3', '4'];

  const handleRegister = async () => {
    if (!email || !password || !name || !department || !year) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      // 🔥 Create user
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );

      // 🔥 Generate Roll Number
      const rollNo = `${department}-${year}-${Math.floor(
        100 + Math.random() * 900
      )}`;

      // 🔥 Save user data
      await firestore()
        .collection('users')
        .doc(userCredential.user.uid)
        .set({
          name,
          email,
          role,
          department,
          year,
          rollNo,
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
      />

      {/* Password */}
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Department */}
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
            <Text style={department === dep ? styles.selectedText : {}}>
              {dep}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Year */}
      <Text style={styles.roleTitle}>Select Year</Text>
      <View style={styles.roleContainer}>
        {years.map(y => (
          <TouchableOpacity
            key={y}
            style={[
              styles.roleButton,
              year === y && styles.selected,
            ]}
            onPress={() => setYear(y)}
          >
            <Text style={year === y ? styles.selectedText : {}}>
              Year {y}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Role */}
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
            <Text style={role === item ? styles.selectedText : {}}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* Login Link */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{ marginTop: 10 }}>
          Already have account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },

  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold' },

  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },

  roleTitle: { marginTop: 10, marginBottom: 5 },

  roleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  roleButton: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    margin: 3,
    alignItems: 'center',
    minWidth: '30%',
  },

  selected: {
    backgroundColor: '#2563EB',
  },

  selectedText: {
    color: '#000000',
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
  },
});