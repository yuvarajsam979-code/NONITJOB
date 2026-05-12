import React, { useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, StyleSheet, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight, Phone, Shield, Sparkles } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ onLogin }) => {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 1000, useNativeDriver: true }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, { toValue: 10, duration: 2000, useNativeDriver: true }),
          Animated.timing(floatAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
        ])
      ).start()
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F172A', '#1E293B', '#334155']} style={styles.background}>
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.inner}
          >
            {/* Top Decorative Section */}
            <View style={styles.topSection}>
              <Animated.View style={[styles.glowCircle, { transform: [{ translateY: floatAnim }] }]} />
              <Animated.View style={[styles.headerBox, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                <View style={styles.iconCircle}>
                  <Shield size={40} color="#60A5FA" />
                </View>
                <Text style={styles.title}>Secure Login</Text>
                <Text style={styles.subtitle}>Enter your mobile number to explore{'\n'}premium job opportunities near you.</Text>
              </Animated.View>
            </View>

            {/* Input Section */}
            <Animated.View style={[styles.formBox, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
              <View style={styles.inputWrapper}>
                <View style={styles.inputHeader}>
                  <Phone size={14} color="#94A3B8" />
                  <Text style={styles.inputLabel}>PHONE NUMBER</Text>
                </View>
                <View style={styles.inputBox}>
                  <Text style={styles.prefix}>+91</Text>
                  <View style={styles.vDivider} />
                  <TextInput
                    style={styles.input}
                    placeholder="00000 00000"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    maxLength={10}
                    placeholderTextColor="rgba(255,255,255,0.2)"
                    selectionColor="#60A5FA"
                  />
                </View>
              </View>

              <TouchableOpacity 
                style={[styles.btn, phoneNumber.length < 10 && styles.btnDisabled]}
                onPress={() => onLogin(phoneNumber)}
                disabled={phoneNumber.length < 10}
              >
                <LinearGradient
                  colors={phoneNumber.length < 10 ? ['#334155', '#1E293B'] : ['#2563EB', '#60A5FA']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.btnGradient}
                >
                  <Text style={styles.btnText}>SEND SECURE OTP</Text>
                  <ChevronRight size={20} color="#FFF" />
                </LinearGradient>
              </TouchableOpacity>
              
              <View style={styles.aiBadge}>
                <Sparkles size={12} color="#60A5FA" />
                <Text style={styles.aiBadgeText}>AI-POWERED VERIFICATION</Text>
              </View>
            </Animated.View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                By proceeding, you agree to our {'\n'}
                <Text style={styles.link}>Terms of Service</Text> & <Text style={styles.link}>Privacy Policy</Text>
              </Text>
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
  inner: { flex: 1, paddingHorizontal: 30, justifyContent: 'space-between' },
  topSection: { height: height * 0.4, justifyContent: 'center', alignItems: 'center' },
  glowCircle: { 
    position: 'absolute', width: 200, height: 200, borderRadius: 100, 
    backgroundColor: '#2563EB', opacity: 0.15, filter: 'blur(60px)' 
  },
  headerBox: { alignItems: 'center' },
  iconCircle: { 
    width: 90, height: 90, borderRadius: 30, backgroundColor: 'rgba(255,255,255,0.05)', 
    justifyContent: 'center', alignItems: 'center', marginBottom: 25,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)'
  },
  title: { fontSize: 36, fontWeight: '900', color: '#FFF', marginBottom: 15, letterSpacing: -1 },
  subtitle: { fontSize: 16, color: '#94A3B8', textAlign: 'center', lineHeight: 26, fontWeight: '500' },
  formBox: { width: '100%', gap: 25 },
  inputWrapper: { gap: 12 },
  inputHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginLeft: 5 },
  inputLabel: { fontSize: 11, fontWeight: '900', color: '#64748B', letterSpacing: 1.5 },
  inputBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 24, paddingHorizontal: 25, height: 80, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  prefix: { fontSize: 22, fontWeight: '900', color: '#FFF', marginRight: 15 },
  vDivider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.1)', marginRight: 15 },
  input: { flex: 1, fontSize: 24, fontWeight: '800', color: '#FFF', letterSpacing: 2 },
  btn: { width: '100%', height: 74, borderRadius: 37, overflow: 'hidden', shadowColor: '#2563EB', shadowOpacity: 0.3, shadowRadius: 20, elevation: 10 },
  btnDisabled: { opacity: 0.5 },
  btnGradient: { width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12 },
  btnText: { color: '#FFF', fontSize: 15, fontWeight: '900', letterSpacing: 1.5 },
  aiBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'center', backgroundColor: 'rgba(96,165,250,0.08)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 12 },
  aiBadgeText: { fontSize: 10, fontWeight: '900', color: '#60A5FA', letterSpacing: 1 },
  footer: { paddingBottom: 40, alignItems: 'center' },
  footerText: { fontSize: 12, color: '#475569', textAlign: 'center', lineHeight: 20 },
  link: { color: '#60A5FA', fontWeight: '800' },
});

export default LoginScreen;
