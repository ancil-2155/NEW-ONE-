import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

const API_KEY = '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'; // 🔥 put your OpenRouter key

const ChatBotScreen = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'mistralai/mistral-7b-instruct:free',
            messages: [
              {
                role: 'user',
                content: input,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      console.log('AI RESPONSE:', data);

      const reply =
        data?.choices?.[0]?.message?.content ||
        'No response from AI';

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: reply,
        sender: 'bot',
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.log(error);

      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: 'Error connecting to AI 🤖',
          sender: 'bot',
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🤖 AI Assistant</Text>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.sender === 'user' ? styles.user : styles.bot,
            ]}
          >
            <Text style={{ color: item.sender === 'user' ? '#fff' : '#000' }}>
              {item.text}
            </Text>
          </View>
        )}
      />

      {loading && <Text style={{ textAlign: 'center' }}>Thinking...</Text>}

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Ask anything..."
          value={input}
          onChangeText={setInput}
          style={styles.input}
        />

        <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
          <Text style={{ color: '#fff' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },

  header: {
    fontSize: 20,
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

  bot: {
    backgroundColor: '#E5E7EB',
    alignSelf: 'flex-start',
  },

  inputContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },

  sendBtn: {
    backgroundColor: '#2563EB',
    padding: 10,
    marginLeft: 5,
    borderRadius: 8,
  },
});

export default ChatBotScreen;