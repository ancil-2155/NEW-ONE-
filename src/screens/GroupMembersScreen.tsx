import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const GroupMembersScreen = ({ route }: any) => {
  const { groupId } = route.params;

  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const groupDoc = await firestore()
          .collection('groupChats')
          .doc(groupId)
          .get();

        const memberIds = groupDoc.data()?.members || [];

        // 🔥 FIX: if empty, stop
        if (memberIds.length === 0) {
          setMembers([]);
          return;
        }

        // 🔥 FETCH USERS ONE BY ONE (SAFE METHOD)
        const usersData: any[] = [];

        for (let id of memberIds) {
          const userDoc = await firestore()
            .collection('users')
            .doc(id)
            .get();

          if (userDoc.exists()) {
            usersData.push(userDoc.data());
          }
        }

        setMembers(usersData);

      } catch (error) {
        console.log("MEMBER ERROR:", error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👥 Members</Text>

      <FlatList
        data={members}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={{ fontWeight: 'bold' }}>
              {item.name || item.email || 'No Name'}
            </Text>
            <Text>{item.role}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default GroupMembersScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  card: {
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 8,
  },
});