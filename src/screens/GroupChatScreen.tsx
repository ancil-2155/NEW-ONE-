import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const GroupChatScreen = ({ route, navigation }: any) => {
  const { groupId } = route.params;

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');

 useEffect(() => {
  const unsubscribe = firestore()
    .collection('groupMessages')
    .where('groupId', '==', groupId)
    .orderBy('createdAt', 'asc')
    .onSnapshot(
      snapshot => {
        if (!snapshot) return; // 🔥 FIX

        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMessages(data);
      },
      error => {
        console.log("FIRESTORE ERROR:", error); // 🔥 DEBUG
      }
    );

  return unsubscribe;
}, []);

  const sendMessage = async () => {
    if (!input) return;

    const user = auth().currentUser;

    await firestore().collection('groupMessages').add({
      groupId: groupId, // 🔥 IMPORTANT
      text: input,
      sender: user?.uid,
      senderEmail: user?.email,
      type: 'text',
      seenBy: [user?.uid],
      createdAt: new Date(),
    });

    setInput('');
  };
<TouchableOpacity
  onPress={() => navigation.navigate('GroupMembers', { groupId })}
>
  <Text style={{ color: 'blue' }}>👥 View Members</Text>
</TouchableOpacity>

  return (
  <View style={styles.container}>
    
    <Text style={styles.header}>💬 Group Chat</Text>

    {/* 👥 VIEW MEMBERS BUTTON */}
    <TouchableOpacity
      onPress={() => navigation.navigate('GroupMembers', { groupId })}
      style={{ marginBottom: 10 }}
    >
      <Text style={{ color: '#2563EB', fontWeight: '600' }}>
        👥 View Members
      </Text>
    </TouchableOpacity>

    <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View
          style={[
            styles.message,
            item.sender === auth().currentUser?.uid
              ? styles.user
              : styles.other,
          ]}
        >
          <Text style={{ fontSize: 10 }}>{item.senderEmail}</Text>
          <Text>{item.text}</Text>

          <Text style={{ fontSize: 10 }}>
            {item.seenBy?.length > 1 ? '✔✔' : '✔'}
          </Text>
        </View>
      )}
    />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type message..."
          value={input}
          onChangeText={setInput}
          style={styles.input}
        />

        <TouchableOpacity onPress={sendMessage} style={styles.btn}>
          <Text style={{ color: '#fff' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GroupChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },

  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  message: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    maxWidth: '75%',
  },

  user: {
    backgroundColor: '#2563EB',
    alignSelf: 'flex-end',
  },

  other: {
    backgroundColor: '#E5E7EB',
    alignSelf: 'flex-start',
  },

  inputContainer: {
    flexDirection: 'row',
  },

  input: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },

  btn: {
    backgroundColor: '#2563EB',
    padding: 10,
    marginLeft: 5,
    borderRadius: 8,
  },
});