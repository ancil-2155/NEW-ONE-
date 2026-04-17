import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const StudentHome = ({ navigation }: any) => {
  const features = [
    { id: 1, title: 'Announcements', icon: '📢', gradient: ['#FF6B6B', '#FF8E53'], screen: 'Announcements' },
    { id: 2, title: 'Join Meeting', icon: '🎥', gradient: ['#4ECDC4', '#556270'], screen: 'MeetingViewer' },
    { id: 3, title: 'Library', icon: '📚', gradient: ['#45B7D1', '#96C93D'], screen: 'Library' },
    { id: 4, title: 'WhatsApp Chat', icon: '👥', gradient: ['#25D366', '#128C7E'], screen: 'GroupChat' },
    { id: 5, title: 'Bonafide Request', icon: '📄', gradient: ['#F7B731', '#F3904F'], screen: 'Bonafide' },
    { id: 6, title: 'Gallery', icon: '📸', gradient: ['#A855F7', '#D946EF'], screen: 'Gallery' },
    { id: 7, title: 'Academic Section', icon: '📅', gradient: ['#3B82F6', '#2DD4BF'], screen: 'TimetableMenu' },
    { id: 8, title: 'View Results', icon: '📊', gradient: ['#EF4444', '#F97316'], screen: 'ViewResults' },
  ];

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />

      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          
          {/* HEADER */}
          <LinearGradient colors={['#1F2937', '#374151']} style={styles.header}>
            <Text style={styles.welcome}>Welcome back,</Text>
            <Text style={styles.name}>Student 👋</Text>
          </LinearGradient>

          {/* FEATURES */}
          <View style={styles.grid}>
            {features.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() => navigation.navigate(item.screen)}
              >
                <LinearGradient colors={item.gradient} style={styles.iconBox}>
                  <Text style={styles.icon}>{item.icon}</Text>
                </LinearGradient>
                <Text style={styles.title}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* LOGOUT */}
          <TouchableOpacity
            style={styles.logout}
            onPress={() => navigation.replace('Login')}
          >
            <Text style={{ color: '#fff' }}>Logout</Text>
          </TouchableOpacity>

        </ScrollView>

        {/* 🤖 CHATBOT BUTTON (CORRECT PLACE) */}
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => navigation.navigate('ChatBot')}
        >
          <Text style={styles.chatText}>🤖</Text>
        </TouchableOpacity>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  header: {
    padding: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  welcome: {
    color: '#9CA3AF',
  },

  name: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },

  card: {
    width: (width - 40) / 2,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },

  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  icon: {
    fontSize: 28,
  },

  title: {
    fontWeight: '600',
  },

  logout: {
    margin: 20,
    backgroundColor: '#EF4444',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  chatButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 30,
    elevation: 5,
  },

  chatText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default StudentHome;