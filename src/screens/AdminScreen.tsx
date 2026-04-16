import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const AdminScreen = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(data);
      });

    return unsubscribe;
  }, []);

  const approveUser = async (id: string) => {
    await firestore().collection('users').doc(id).update({
      approved: true,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.name} ({item.role})</Text>

            {!item.approved && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => approveUser(item.id)}
              >
                <Text style={styles.buttonText}>Approve</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  card: {
    padding: 15,
    backgroundColor: '#f3f4f6',
    marginBottom: 10,
    borderRadius: 8,
  },
  button: {
    marginTop: 8,
    backgroundColor: '#16a34a',
    padding: 8,
    borderRadius: 6,
  },
  buttonText: { color: '#fff' },
});

export default AdminScreen;