import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { ShieldCheck, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const OTPScreen = ({ phoneNumber, onVerify }) => {
  const [otp, setOtp] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inner}
      >
        <View style={styles.headerBox}>
          <View style={styles.iconCircle}>
            <ShieldCheck size={48} color="#22C55E" />
          </View>
          <Text style={styles.title}>Verify Code</Text>
          <Text style={styles.subtitle}>
            Enter the 6-digit code sent to{'\n'} 
            <Text style={styles.phoneText}>+91 {phoneNumber}</Text>
          </Text>
        </View>
        
        <View style={styles.inputContainer}>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="000000"
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
              maxLength={6}
              autoFocus
              placeholderTextColor="#CBD5E1"
            />
          </View>
        </View>
        
        <View style={styles.footer}>
          <TouchableOpacity style={styles.resendBtn}>
            <Text style={styles.resendText}>Didn't receive code? <Text style={styles.resendAction}>Resend</Text></Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btn}
            onPress={() => onVerify(otp)}
          >
            <LinearGradient
              colors={['#2563EB', '#1D4ED8']}
              style={styles.btnGradient}
            >
              <Text style={styles.btnText}>VERIFY & CONTINUE</Text>
              <ChevronRight size={20} color="#FFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  inner: { flex: 1, paddingHorizontal: 30, justifyContent: 'space-between', paddingVertical: 40 },
  headerBox: { marginTop: 40, alignItems: 'center' },
  iconCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#F0FDF4', justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
  title: { fontSize: 32, fontWeight: '900', color: '#1E293B', marginBottom: 12 },
  subtitle: { fontSize: 16, color: '#64748B', textAlign: 'center', lineHeight: 24 },
  phoneText: { color: '#2563EB', fontWeight: '900' },
  inputContainer: { flex: 1, justifyContent: 'center' },
  inputBox: {
    backgroundColor: '#F8FAFC', borderRadius: 24, height: 90, justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: '#F1F5F9',
  },
  input: { fontSize: 40, fontWeight: '900', color: '#1E293B', letterSpacing: 12, textAlign: 'center', width: '100%' },
  footer: { gap: 30, alignItems: 'center' },
  resendBtn: { padding: 10 },
  resendText: { fontSize: 14, color: '#94A3B8' },
  resendAction: { color: '#1E293B', fontWeight: '800' },
  btn: { width: '100%', height: 70, borderRadius: 35, overflow: 'hidden', shadowColor: '#2563EB', shadowOpacity: 0.2, shadowRadius: 20, elevation: 10 },
  btnGradient: { width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  btnText: { color: '#FFF', fontSize: 15, fontWeight: '900', letterSpacing: 1 },
});

export default OTPScreen;
