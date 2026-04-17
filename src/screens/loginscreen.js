import React from 'react';  
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold' }}>ACAMS</Text>

      <TextInput
        placeholder="Email"
        style={{ borderWidth: 1, marginTop: 20, padding: 10 }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={{ borderWidth: 1, marginTop: 10, padding: 10 }}
      />

      <TouchableOpacity style={{ marginTop: 20, backgroundColor: 'black', padding: 15 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}