import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, StyleSheet, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight, Phone, Shield, Sparkles, User, Globe, MessageSquare } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ onLogin }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 20, friction: 7, useNativeDriver: true }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, { toValue: 15, duration: 3000, useNativeDriver: true }),
          Animated.timing(floatAnim, { toValue: 0, duration: 3000, useNativeDriver: true }),
        ])
      ).start()
    ]).start();
  }, []);

  const triggerShake = () => {
    setError(true);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start(() => setTimeout(() => setError(false), 2000));
  };

  const handleLogin = () => {
    if (phoneNumber.length === 10) {
      onLogin(phoneNumber);
    } else {
      triggerShake();
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#020617', '#0F172A', '#1E293B']} style={styles.background}>
        {/* Animated Background Elements */}
        <Animated.View style={[styles.glowOrb, { top: '10%', left: '10%', transform: [{ translateY: floatAnim }] }]} />
        <Animated.View style={[styles.glowOrb, { bottom: '20%', right: '5%', width: 300, height: 300, opacity: 0.1, backgroundColor: '#6366F1' }]} />

        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inner}>
            
            {/* Header: Brand & Trust */}
            <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
              <View style={styles.trustBadge}>
                <Globe size={12} color="#10B981" />
                <Text style={styles.trustText}>TRUSTED BY 50,000+ WORKERS</Text>
              </View>
              <View style={styles.logoBox}>
                <Shield size={50} color="#60A5FA" />
                <View style={styles.logoGlow} />
              </View>
              <Text style={styles.title}>Rozgar AI</Text>
              <Text style={styles.subtitle}>The Future of Local Job Discovery</Text>
            </Animated.View>

            {/* Input & Social Section */}
            <View style={styles.mainAction}>
              <Animated.View style={[
                styles.formBox, 
                { opacity: fadeAnim, transform: [{ translateX: shakeAnim }, { translateY: slideAnim }] }
              ]}>
                <View style={styles.inputLabelRow}>
                  <Text style={styles.inputLabel}>MOBILE NUMBER</Text>
                  {error && <Text style={styles.errorText}>Enter valid 10 digits</Text>}
                </View>
                
                <View style={[styles.inputContainer, error && styles.inputError]}>
                  <Text style={styles.prefix}>+91</Text>
                  <View style={styles.divider} />
                  <TextInput
                    style={styles.input}
                    placeholder="88888 00000"
                    placeholderTextColor="rgba(255,255,255,0.2)"
                    keyboardType="phone-pad"
                    maxLength={10}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    selectionColor="#60A5FA"
                  />
                </View>

                <TouchableOpacity style={styles.primaryBtn} onPress={handleLogin}>
                  <LinearGradient 
                    colors={phoneNumber.length === 10 ? ['#2563EB', '#60A5FA'] : ['#1E293B', '#334155']} 
                    start={{x:0, y:0}} end={{x:1, y:0}}
                    style={styles.btnGradient}
                  >
                    <Text style={styles.btnText}>GET VERIFICATION CODE</Text>
                    <MessageSquare size={20} color="#FFF" />
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>

              <View style={styles.separator}>
                <View style={styles.line} />
                <Text style={styles.sepText}>OR CONTINUE WITH</Text>
                <View style={styles.line} />
              </View>

              <View style={styles.socialRow}>
                <TouchableOpacity style={styles.socialBtn}>
                  <Text style={styles.socialBtnText}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialBtn}>
                  <Text style={styles.socialBtnText}>Apple ID</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Bottom: Features Highlight */}
            <View style={styles.footer}>
              <View style={styles.featRow}>
                <View style={styles.featItem}>
                  <Sparkles size={16} color="#60A5FA" />
                  <Text style={styles.featText}>AI Match</Text>
                </View>
                <View style={styles.featItem}>
                  <Shield size={16} color="#60A5FA" />
                  <Text style={styles.featText}>Verified</Text>
                </View>
                <View style={styles.featItem}>
                  <User size={16} color="#60A5FA" />
                  <Text style={styles.featText}>Zero Cost</Text>
                </View>
              </View>
              <Text style={styles.legal}>By joining, you agree to Rozgar's <Text style={styles.legalBold}>Terms of Use</Text></Text>
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
  glowOrb: { position: 'absolute', width: 250, height: 250, borderRadius: 125, backgroundColor: '#2563EB', opacity: 0.1, filter: 'blur(80px)' },
  inner: { flex: 1, paddingHorizontal: 35, justifyContent: 'space-between' },
  header: { alignItems: 'center', marginTop: 40 },
  trustBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(16,185,129,0.08)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginBottom: 30, borderWidth: 1, borderColor: 'rgba(16,185,129,0.2)' },
  trustText: { color: '#10B981', fontSize: 9, fontWeight: '900', letterSpacing: 1 },
  logoBox: { marginBottom: 20 },
  logoGlow: { position: 'absolute', top: 5, left: 5, width: 40, height: 40, backgroundColor: '#60A5FA', opacity: 0.2, filter: 'blur(15px)' },
  title: { fontSize: 42, fontWeight: '900', color: '#FFF', letterSpacing: -1.5 },
  subtitle: { fontSize: 16, color: '#94A3B8', fontWeight: '500', marginTop: 8 },
  mainAction: { gap: 35 },
  formBox: { gap: 15 },
  inputLabelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 },
  inputLabel: { fontSize: 11, fontWeight: '900', color: '#64748B', letterSpacing: 1 },
  errorText: { fontSize: 11, fontWeight: '800', color: '#F87171' },
  inputContainer: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.04)', 
    borderRadius: 24, height: 80, paddingHorizontal: 25, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' 
  },
  inputError: { borderColor: '#F87171', backgroundColor: 'rgba(248,113,113,0.05)' },
  prefix: { fontSize: 22, fontWeight: '900', color: '#FFF', marginRight: 15 },
  divider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.1)', marginRight: 15 },
  input: { flex: 1, fontSize: 24, fontWeight: '800', color: '#FFF', letterSpacing: 1 },
  primaryBtn: { height: 74, borderRadius: 24, overflow: 'hidden', shadowColor: '#2563EB', shadowOpacity: 0.4, shadowRadius: 20, elevation: 12 },
  btnGradient: { width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 15 },
  btnText: { color: '#FFF', fontSize: 14, fontWeight: '900', letterSpacing: 1 },
  separator: { flexDirection: 'row', alignItems: 'center', gap: 15, paddingHorizontal: 20 },
  line: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.05)' },
  sepText: { color: '#475569', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  socialRow: { flexDirection: 'row', gap: 15 },
  socialBtn: { flex: 1, height: 60, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', justifyContent: 'center', alignItems: 'center' },
  socialBtnText: { color: '#FFF', fontSize: 14, fontWeight: '700' },
  footer: { paddingBottom: 40, alignItems: 'center', gap: 20 },
  featRow: { flexDirection: 'row', gap: 25 },
  featItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  featText: { color: '#94A3B8', fontSize: 11, fontWeight: '700' },
  legal: { color: '#475569', fontSize: 11, textAlign: 'center' },
  legalBold: { color: '#64748B', fontWeight: '800' }
});

export default LoginScreen;
