import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const UploadResultScreen = () => {
  const [subject, setSubject] = useState('');
  const [marks, setMarks] = useState('');

  const uploadResult = async () => {
    if (!subject || !marks) {
      Alert.alert('Error', 'Fill all fields');
      return;
    }

    try {
      const user = auth().currentUser;

      const userDoc = await firestore()
        .collection('users')
        .doc(user?.uid)
        .get();

      const userData = userDoc.data();

      await firestore().collection('results').add({
        subject,
        marks,
        department: userData?.department, // 🔥 auto from teacher
        createdAt: new Date(),
      });

      Alert.alert('Success', 'Result uploaded!');
      setSubject('');
      setMarks('');

    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Result</Text>

      <TextInput
        placeholder="Subject"
        style={styles.input}
        value={subject}
        onChangeText={setSubject}
      />

      <TextInput
        placeholder="Marks"
        style={styles.input}
        value={marks}
        onChangeText={setMarks}
      />

      <TouchableOpacity style={styles.button} onPress={uploadResult}>
        <Text style={styles.buttonText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, marginBottom: 15 },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', textAlign: 'center' },
});

export default UploadResultScreen;