import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const LoginScreen = ({ onLogin }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inner}
      >
        <View style={styles.headerBox}>
          <View style={styles.brandBadge}>
            <Text style={styles.brandBadgeText}>SAFE & SECURE</Text>
          </View>
          <Text style={styles.title}>Enter your{'\n'}Mobile Number</Text>
          <Text style={styles.subtitle}>We will send a 6-digit code to verify.</Text>
        </View>
        
        <View style={styles.inputContainer}>
          <View style={styles.inputBox}>
            <Text style={styles.prefix}>+91</Text>
            <View style={styles.divider} />
            <TextInput
              style={styles.input}
              placeholder="00000 00000"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              maxLength={10}
              autoFocus
              placeholderTextColor="#CBD5E1"
            />
          </View>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.termsText}>
            By continuing, you agree to our {'\n'}
            <Text style={styles.termsLink}>Terms of Service</Text> & <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
          
          <TouchableOpacity 
            style={styles.btn}
            onPress={() => onLogin(phoneNumber)}
            disabled={phoneNumber.length < 10}
          >
            <LinearGradient
              colors={phoneNumber.length < 10 ? ['#F1F5F9', '#E2E8F0'] : ['#2563EB', '#1D4ED8']}
              style={styles.btnGradient}
            >
              <Text style={[styles.btnText, phoneNumber.length < 10 && styles.btnTextDisabled]}>GET OTP</Text>
              <ChevronRight size={20} color={phoneNumber.length < 10 ? '#CBD5E1' : '#FFF'} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', height: '100%', width: '100%' },
  inner: { flex: 1, paddingHorizontal: 30, justifyContent: 'space-between', paddingVertical: 40 },
  headerBox: { marginTop: 40 },
  brandBadge: { backgroundColor: '#F1F5F9', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 20 },
  brandBadgeText: { fontSize: 10, fontWeight: '900', color: '#64748B', letterSpacing: 1 },
  title: { fontSize: 36, fontWeight: '900', color: '#1E293B', lineHeight: 44, marginBottom: 12 },
  subtitle: { fontSize: 16, color: '#64748B', fontWeight: '500' },
  inputContainer: { flex: 1, justifyContent: 'center' },
  inputBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC',
    borderRadius: 24, paddingHorizontal: 25, height: 80, borderWidth: 1, borderColor: '#F1F5F9',
  },
  prefix: { fontSize: 20, fontWeight: '900', color: '#1E293B', marginRight: 15 },
  divider: { width: 1, height: 30, backgroundColor: '#E2E8F0', marginRight: 15 },
  input: { flex: 1, fontSize: 22, fontWeight: '800', color: '#1E293B', letterSpacing: 1 },
  footer: { gap: 24 },
  termsText: { fontSize: 12, color: '#94A3B8', textAlign: 'center', lineHeight: 20 },
  termsLink: { color: '#2563EB', fontWeight: '700' },
  btn: { width: '100%', height: 70, borderRadius: 35, overflow: 'hidden', shadowColor: '#2563EB', shadowOpacity: 0.2, shadowRadius: 20, elevation: 10 },
  btnGradient: { width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: '900', letterSpacing: 1 },
  btnTextDisabled: { color: '#CBD5E1' },
});

export default LoginScreen;
