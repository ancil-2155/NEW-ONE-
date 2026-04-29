import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Modal,
  StatusBar,
  Dimensions,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const { width } = Dimensions.get('window');

const RegisterScreen = ({ navigation }: any) => {
  const [role, setRole] = useState<'student' | 'teacher' | 'parent'>('student');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [department, setDepartment] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [year, setYear] = useState('');

  // Dropdown states
  const [showDepartmentPicker, setShowDepartmentPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  // Options
  const departments = ['CSE', 'ECE', 'ME', 'CIVIL'];
  const years = ['1', '2', '3', '4'];

  const handleRegister = async () => {
    try {
      if (!email || !password) {
        Alert.alert('Error', 'Email & Password required');
        return;
      }

      if (role !== 'parent' && !name) {
        Alert.alert('Error', 'Name required');
        return;
      }

      if (role === 'student' && (!rollNo || !department || !year)) {
        Alert.alert('Error', 'Fill all student details');
        return;
      }

      if (role === 'teacher' && (!department || !year)) {
        Alert.alert('Error', 'Fill teacher details');
        return;
      }

      // 🔥 Create Auth user
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );

      const uid = userCredential.user.uid;

      // 🔥 Save in Firestore
      await firestore().collection('users').doc(uid).set({
        name: role !== 'parent' ? name : null,
        email,
        role,

        department: role !== 'parent' ? department : null,

        rollNo: role === 'student' ? rollNo : null,
        year: role === 'student' ? year : null,

        yearIncharge: role === 'teacher' ? year : null,

        // 🔥 IMPORTANT FIX
        approved: role === 'teacher' ? false : true,

        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert('Success', 'Account created successfully');

      navigation.replace('Login');

    } catch (error: any) {
      console.log(error);
      Alert.alert('Error', error.message);
    }
  };

  const renderPickerModal = (
    visible: boolean,
    setVisible: Function,
    options: string[],
    selectedValue: string,
    setSelectedValue: Function,
    title: string
  ) => (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.modalHeader}
          >
            <Text style={styles.modalTitle}>Select {title}</Text>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </LinearGradient>
          <ScrollView showsVerticalScrollIndicator={false}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.modalOption,
                  selectedValue === option && styles.modalOptionActive,
                ]}
                onPress={() => {
                  setSelectedValue(option);
                  setVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    selectedValue === option && styles.modalOptionTextActive,
                  ]}
                >
                  {option}
                </Text>
                {selectedValue === option && (
                  <View style={styles.modalCheckIcon}>
                    <Text style={styles.modalCheckIconText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.header}
        >
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            {role === 'student' 
              ? '🎓 Join as a Student' 
              : role === 'teacher' 
              ? '👩‍🏫 Join as a Teacher' 
              : '👨‍👩‍👧 Join as a Parent'}
          </Text>
        </LinearGradient>

        <View style={styles.formContainer}>
          {/* ROLE SELECT */}
          <View style={styles.roleContainer}>
            {['student', 'teacher', 'parent'].map(r => (
              <TouchableOpacity
                key={r}
                style={[
                  styles.roleButton,
                  role === r && styles.roleActive,
                ]}
                onPress={() => setRole(r as any)}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={role === r ? ['#667eea', '#764ba2'] : ['#F3F4F6', '#F3F4F6']}
                  style={styles.roleGradient}
                >
                  <Text style={[
                    styles.roleEmoji,
                    role === r && styles.roleEmojiActive
                  ]}>
                    {r === 'student' ? '🎓' : r === 'teacher' ? '👩‍🏫' : '👨‍👩‍👧'}
                  </Text>
                  <Text style={[
                    styles.roleText,
                    role === r && styles.roleTextActive
                  ]}>
                    {r.toUpperCase()}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          {/* NAME */}
          {role !== 'parent' && (
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                placeholder="Enter your full name"
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          )}

          {/* EMAIL */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              placeholder="you@example.com"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* PASSWORD */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              placeholder="Create a secure password"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* STUDENT FIELDS */}
          {role === 'student' && (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Roll Number</Text>
                <TextInput
                  placeholder="Enter your roll number"
                  style={styles.input}
                  value={rollNo}
                  onChangeText={setRollNo}
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Department</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setShowDepartmentPicker(true)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.dropdownText, !department && styles.placeholderText]}>
                    {department || 'Select Department'}
                  </Text>
                  <Text style={styles.dropdownIcon}>▼</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Year</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setShowYearPicker(true)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.dropdownText, !year && styles.placeholderText]}>
                    {year ? `${year}${getYearSuffix(year)} Year` : 'Select Year'}
                  </Text>
                  <Text style={styles.dropdownIcon}>▼</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* TEACHER FIELDS */}
          {role === 'teacher' && (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Department</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setShowDepartmentPicker(true)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.dropdownText, !department && styles.placeholderText]}>
                    {department || 'Select Department'}
                  </Text>
                  <Text style={styles.dropdownIcon}>▼</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Year Incharge</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setShowYearPicker(true)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.dropdownText, !year && styles.placeholderText]}>
                    {year ? `${year}${getYearSuffix(year)} Year` : 'Select Year'}
                  </Text>
                  <Text style={styles.dropdownIcon}>▼</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* REGISTER BUTTON */}
          <TouchableOpacity style={styles.button} onPress={handleRegister} activeOpacity={0.8}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Create Account</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Login Link */}
          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginText}>
              Already have an account? <Text style={styles.loginTextBold}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Department Picker Modal */}
        {renderPickerModal(
          showDepartmentPicker,
          setShowDepartmentPicker,
          departments,
          department,
          setDepartment,
          'Department'
        )}

        {/* Year Picker Modal */}
        {renderPickerModal(
          showYearPicker,
          setShowYearPicker,
          years,
          year,
          setYear,
          'Year'
        )}
      </ScrollView>
    </>
  );
};

// Helper function to get year suffix
const getYearSuffix = (year: string) => {
  const y = parseInt(year);
  if (y === 1) return 'st';
  if (y === 2) return 'nd';
  if (y === 3) return 'rd';
  return 'th';
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#E0E7FF',
    textAlign: 'center',
  },
  formContainer: {
    padding: 24,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  roleButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  roleGradient: {
    paddingVertical: 12,
    alignItems: 'center',
    gap: 6,
  },
  roleEmoji: {
    fontSize: 20,
    opacity: 0.7,
  },
  roleEmojiActive: {
    opacity: 1,
  },
  roleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },
  roleTextActive: {
    color: '#fff',
  },
  roleActive: {
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#fff',
    fontSize: 14,
    color: '#1F2937',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 14,
    color: '#1F2937',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#6B7280',
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  button: {
    marginTop: 24,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonGradient: {
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginLink: {
    marginTop: 24,
    alignItems: 'center',
    paddingVertical: 12,
  },
  loginText: {
    fontSize: 14,
    color: '#6B7280',
  },
  loginTextBold: {
    color: '#667eea',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalClose: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalOptionActive: {
    backgroundColor: '#F3F4F6',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#374151',
  },
  modalOptionTextActive: {
    color: '#667eea',
    fontWeight: '600',
  },
  modalCheckIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCheckIconText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});