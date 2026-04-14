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

  const handleLogin = () => {
    if (role === 'Student') {
      navigation.replace('StudentHome');
    } else if (role === 'Teacher') {
      navigation.replace('TeacherHome');
    } else {
      navigation.replace('ParentHome');
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

      <Text style={styles.roleTitle}>Select Role</Text>

      <View style={styles.roleContainer}>
        {['Student', 'Teacher', 'Parent'].map(item => (
          <TouchableOpacity
            key={item}
            style={[
              styles.roleButton,
              role === item && styles.roleSelected,
            ]}
            onPress={() => setRole(item as Role)}
          >
            <Text
              style={[
                styles.roleText,
                role === item && styles.roleTextSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login as {role}</Text>
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
  roleTitle: { marginTop: 10, fontWeight: '600' },
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
  roleTextSelected: {
    color: '#fff',
  },
  roleText: {
    color: '#000',
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