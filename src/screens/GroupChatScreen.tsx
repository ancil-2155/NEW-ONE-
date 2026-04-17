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

const GroupChatScreen = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [department, setDepartment] = useState('');

  useEffect(() => {
  const user = auth().currentUser;

  if (!user) return;

  const unsubscribeUser = firestore()
    .collection('users')
    .doc(user.uid)
    .onSnapshot(userDoc => {
      const dept = userDoc.data()?.department;

      console.log("Department:", dept);

      if (!dept) return;

      setDepartment(dept);

      firestore()
        .collection('groupChats')
        .where('department', '==', dept)
        .orderBy('createdAt', 'asc')
        .onSnapshot(snapshot => {
          if (!snapshot?.docs) return;

          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          setMessages(data);
        });
    });

  return () => unsubscribeUser();
}, []);

  const sendMessage = async () => {
    if (!input) return;

    const user = auth().currentUser;

    await firestore().collection('groupChats').add({
      text: input,
      sender: user?.email,
      department: department,
      type: 'text',
      seenBy: [],
      createdAt: new Date(),
    });

    setInput('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>💬 {department} Chat</Text>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.sender === auth().currentUser?.email
                ? styles.user
                : styles.other,
            ]}
          >
            <Text style={{ fontSize: 10 }}>{item.sender}</Text>
            <Text>{item.text}</Text>
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