import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, StyleSheet, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight, ShieldCheck, MessageSquare, RefreshCw } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const OTPScreen = ({ phoneNumber, onVerify }) => {
  const [otp, setOtp] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 1000, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#020617', '#0F172A', '#1E293B']} style={styles.background}>
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.inner}
          >
            {/* Top Section */}
            <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
              <View style={styles.iconCircle}>
                <ShieldCheck size={50} color="#10B981" />
              </View>
              <Text style={styles.title}>Verification</Text>
              <Text style={styles.subtitle}>
                We've sent a 6-digit code to{'\n'}
                <Text style={styles.phoneHighlight}>+91 {phoneNumber}</Text>
              </Text>
            </Animated.View>

            {/* OTP Input Box */}
            <Animated.View style={[styles.formBox, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>ENTER 6-DIGIT CODE</Text>
                <View style={styles.otpBox}>
                  <TextInput
                    style={styles.input}
                    placeholder="000000"
                    placeholderTextColor="rgba(255,255,255,0.1)"
                    keyboardType="number-pad"
                    maxLength={6}
                    value={otp}
                    onChangeText={setOtp}
                    autoFocus
                    selectionColor="#60A5FA"
                  />
                </View>
              </View>

              <TouchableOpacity 
                style={[styles.btn, otp.length < 6 && styles.btnDisabled]}
                onPress={() => onVerify(otp)}
                disabled={otp.length < 6}
              >
                <LinearGradient
                  colors={otp.length < 6 ? ['#334155', '#1E293B'] : ['#10B981', '#059669']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.btnGradient}
                >
                  <Text style={styles.btnText}>VERIFY & CONTINUE</Text>
                  <ChevronRight size={20} color="#FFF" />
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            {/* Footer / Resend */}
            <View style={styles.footer}>
              <TouchableOpacity style={styles.resendBtn}>
                <RefreshCw size={16} color="#60A5FA" style={{ marginRight: 10 }} />
                <Text style={styles.resendText}>Resend Code</Text>
              </TouchableOpacity>
              <Text style={styles.timerText}>Available in 00:54</Text>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1 },
  inner: { flex: 1, paddingHorizontal: 35, justifyContent: 'space-between' },
  header: { alignItems: 'center', marginTop: 60 },
  iconCircle: { 
    width: 100, height: 100, borderRadius: 35, backgroundColor: 'rgba(16,185,129,0.05)', 
    justifyContent: 'center', alignItems: 'center', marginBottom: 30,
    borderWidth: 1, borderColor: 'rgba(16,185,129,0.2)'
  },
  title: { fontSize: 36, fontWeight: '900', color: '#FFF', marginBottom: 15 },
  subtitle: { fontSize: 16, color: '#94A3B8', textAlign: 'center', lineHeight: 26, fontWeight: '500' },
  phoneHighlight: { color: '#60A5FA', fontWeight: '900' },
  formBox: { width: '100%', gap: 30 },
  inputWrapper: { gap: 15 },
  inputLabel: { fontSize: 11, fontWeight: '900', color: '#64748B', letterSpacing: 2, textAlign: 'center' },
  otpBox: {
    backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 24, height: 100, 
    justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)'
  },
  input: { fontSize: 44, fontWeight: '900', color: '#FFF', letterSpacing: 15, textAlign: 'center', width: '100%' },
  btn: { width: '100%', height: 74, borderRadius: 37, overflow: 'hidden', shadowColor: '#10B981', shadowOpacity: 0.2, shadowRadius: 20, elevation: 10 },
  btnDisabled: { opacity: 0.5 },
  btnGradient: { width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12 },
  btnText: { color: '#FFF', fontSize: 15, fontWeight: '900', letterSpacing: 1.5 },
  footer: { paddingBottom: 50, alignItems: 'center', gap: 15 },
  resendBtn: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  resendText: { color: '#60A5FA', fontSize: 14, fontWeight: '800' },
  timerText: { color: '#475569', fontSize: 12, fontWeight: '600' }
});

export default OTPScreen;
