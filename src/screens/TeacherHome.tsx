import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TeacherHome = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.replace('Login')}>
        <Text style={styles.back}>⬅ Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Teacher Dashboard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold' },
  back: { position: 'absolute', top: 50, left: 20, color: 'blue' },
});

export default TeacherHome;