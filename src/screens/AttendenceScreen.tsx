import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const AttendanceScreen = ({ navigation }: any) => {
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const snapshot = await firestore().collection('users').get();

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    setStudents(data);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
        Attendance
      </Text>

      {/* Button */}
      <TouchableOpacity
        style={{
          backgroundColor: '#10B981',
          padding: 12,
          marginTop: 20,
          borderRadius: 8,
        }}
        onPress={() => navigation.navigate('TakeAttendance')}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>
          Take Attendance
        </Text>
      </TouchableOpacity>

      {/* Students */}
      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>
        Students
      </Text>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={{ padding: 5 }}>
            {item.name} ({item.rollNo})
          </Text>
        )}
      />
    </View>
  );
};

export default AttendanceScreen;