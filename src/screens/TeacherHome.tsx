import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const TeacherHome = ({ navigation }: any) => {
  return (
    <ScrollView style={styles.container}>
      
      <Text style={styles.header}>👨‍🏫 Welcome Teacher</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>📅 Upload Timetable</Text>
      </TouchableOpacity>
      
<TouchableOpacity onPress={() => navigation.navigate('UploadResult')}>
  <Text>Upload Results</Text>
</TouchableOpacity>

<TouchableOpacity onPress={() => navigation.navigate('CreateGroup')}>
  <Text>Create WhatsApp Group</Text>
</TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>📚 Upload Resources</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>📢 Post Announcements</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>📸 Upload Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate('CreateMeeting')}
>
  <Text style={styles.text}>🎥 Host Meeting</Text>
</TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity
        style={styles.logout}
        onPress={() => navigation.replace('Login')}
      >
        <Text style={styles.logoutText}>🚪 Logout</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f3f4f6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  logout: {
    marginTop: 30,
    backgroundColor: '#ef4444',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TeacherHome;