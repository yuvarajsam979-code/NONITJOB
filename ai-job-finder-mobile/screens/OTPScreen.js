import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { ShieldCheck } from 'lucide-react-native';

const OTPScreen = ({ phoneNumber, onVerify }) => {
  const [otp, setOtp] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.iconContainer}>
          <ShieldCheck size={60} color="#25D366" />
        </View>
        
        <Text style={styles.title}>Verify Code</Text>
        <Text style={styles.subtitle}>Enter the 6-digit code sent to {'\n'} +91 {phoneNumber}</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="000000"
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
            maxLength={6}
            autoFocus
            letterSpacing={10}
          />
        </View>
        
        <TouchableOpacity 
          style={[styles.button, otp.length < 6 && styles.buttonDisabled]}
          onPress={() => onVerify(otp)}
          disabled={otp.length < 6}
        >
          <Text style={styles.buttonText}>Verify & Continue</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.resendBtn}>
          <Text style={styles.resendText}>Didn't receive code? <Text style={styles.resendLink}>Resend</Text></Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E8FBF0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 24,
  },
  inputContainer: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 16,
    paddingHorizontal: 16,
    width: '100%',
    height: 70,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 32,
    color: '#333',
    fontWeight: '700',
    textAlign: 'center',
    width: '100%',
  },
  button: {
    width: '100%',
    height: 60,
    backgroundColor: '#2E5BFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#CCC',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  resendBtn: {
    marginTop: 25,
  },
  resendText: {
    fontSize: 14,
    color: '#666',
  },
  resendLink: {
    color: '#2E5BFF',
    fontWeight: '600',
  }
});

export default OTPScreen;
