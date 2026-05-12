import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, RefreshControl, Platform, TextInput, Dimensions, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { Home, User, PlusCircle, Search, MapPin, Briefcase, Phone, MessageCircle, ShieldCheck, ChevronRight, Mic, Sparkles, Users, IndianRupee, Clock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

import JobCard from './components/JobCard';
import VoiceButton from './components/VoiceButton';
import LoginScreen from './screens/LoginScreen';
import OTPScreen from './screens/OTPScreen';
import MapSection from './components/MapSection';
import ProfileScreen from './screens/ProfileScreen';
import PostJobScreen from './screens/PostJobScreen';
import SkeletonCard from './components/SkeletonCard';
import VoiceSearchScreen from './screens/VoiceSearchScreen';
import JobDetailsScreen from './screens/JobDetailsScreen';
import AIChatScreen from './screens/AIChatScreen';
import EmployerDashboard from './screens/EmployerDashboard';
import HomeScreen from './screens/HomeScreen';
import OnboardingScreen from './screens/OnboardingScreen';

const { width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();
const API_URL = 'http://localhost:5001/api/jobs';

// ---------------------------------------------------------
// COMPONENT: SPLASH (WITH PULSE ANIMATION)
// ---------------------------------------------------------
function SplashScreen({ onFinish }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.1, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();

    const timer = setTimeout(onFinish, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.splashContainer}>
      <StatusBar hidden />
      <LinearGradient colors={['#2563EB', '#1E3A8A']} style={styles.splashGradient}>
        <Animated.View style={[styles.logoCircle, { transform: [{ scale: pulseAnim }] }]}>
          <Briefcase size={70} color="#FFF" />
        </Animated.View>
        <Text style={styles.splashBrand}>ROZGAR AI</Text>
        <Text style={styles.splashTagline}>Jobs Near You • Instantly</Text>
      </LinearGradient>
    </View>
  );
}

// ---------------------------------------------------------
// MAIN APP
// ---------------------------------------------------------
export default function App() {
  const [appState, setAppState] = useState('LOGIN'); 
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const [isEmployerActive, setIsEmployerActive] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [language, setLanguage] = useState('EN');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Root Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (error) {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (appState === 'MAIN') fetchJobs();
  }, [appState, fetchJobs]);

  const handleVoiceResult = (query) => {
    setSearchQuery(query);
    setIsVoiceActive(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <PaperProvider>
        <NavigationContainer>
          {/* Overlays */}
          {isVoiceActive && (
            <VoiceSearchScreen 
              onClose={() => setIsVoiceActive(false)} 
              onSearchResult={handleVoiceResult} 
            />
          )}
          {selectedJob && <JobDetailsScreen job={selectedJob} onClose={() => setSelectedJob(null)} />}
          {isEmployerActive && <EmployerDashboard onClose={() => setIsEmployerActive(false)} />}
          {isChatActive && <AIChatScreen onClose={() => setIsChatActive(false)} />}
          
          {appState === 'SPLASH' ? (
            <SplashScreen onFinish={() => setAppState('ONBOARDING')} />
          ) : appState === 'ONBOARDING' ? (
            <OnboardingScreen onFinish={() => setAppState('LOGIN')} />
          ) : appState === 'LOGIN' ? (
            <LoginScreen onLogin={(p) => { setPhoneNumber(p); setAppState('OTP'); }} />
          ) : appState === 'OTP' ? (
            <OTPScreen phoneNumber={phoneNumber} onVerify={(o) => { if(o === '123456') setAppState('MAIN'); else alert('Use 123456'); }} />
          ) : (
            <Tab.Navigator
              screenOptions={{
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: '#2563EB',
                tabBarInactiveTintColor: '#94A3B8',
                headerShown: false
              }}
            >
              <Tab.Screen 
                name="Explore" 
                children={() => (
                  <HomeScreen 
                    jobs={jobs} 
                    loading={loading} 
                    fetchJobs={fetchJobs} 
                    language={language} 
                    setLanguage={setLanguage} 
                    onVoicePress={() => setIsVoiceActive(true)} 
                    onJobPress={setSelectedJob} 
                    onChatPress={() => setIsChatActive(true)}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />
                )}
                options={{ tabBarIcon: ({ color }) => <Home size={26} color={color} /> }}
              />
              <Tab.Screen 
                name="Post" 
                component={PostJobScreen}
                options={{ tabBarIcon: ({ color }) => <PlusCircle size={26} color={color} /> }}
              />
              <Tab.Screen 
                name="Profile" 
                children={() => <ProfileScreen onEmployerPress={() => setIsEmployerActive(true)} />}
                options={{ tabBarIcon: ({ color }) => <User size={26} color={color} /> }}
              />
            </Tab.Navigator>
          )}
        </NavigationContainer>
      </PaperProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  // --- PREMIUM SPLASH ---
  splashContainer: { flex: 1, height: '100%', width: '100%' },
  splashGradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logoCircle: { 
    width: 160, height: 160, borderRadius: 80, backgroundColor: 'rgba(255,255,255,0.15)', 
    justifyContent: 'center', alignItems: 'center', marginBottom: 30,
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)',
    shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 30, elevation: 20
  },
  splashBrand: { fontSize: 48, fontWeight: '900', color: '#FFF', letterSpacing: 4, textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: {width: 0, height: 4}, textShadowRadius: 10 },
  splashTagline: { fontSize: 18, color: 'rgba(255,255,255,0.8)', fontWeight: '600', letterSpacing: 1 },
  // --- MAP CONNECTION ---
  mapConnectionBox: { marginBottom: 35 },
  mapInner: { 
    height: 220, borderRadius: 32, overflow: 'hidden', 
    backgroundColor: '#FFF', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 15, elevation: 5,
    borderWidth: 1, borderColor: '#F1F5F9'
  },

  // --- ELITE ONBOARDING ---
  onboardContainer: { flex: 1, backgroundColor: '#FFF' },
  onboardContent: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  onboardIconBox: { 
    width: 220, height: 220, borderRadius: 110, backgroundColor: '#F8FAFC', 
    justifyContent: 'center', alignItems: 'center', marginBottom: 50,
    shadowColor: '#2563EB', shadowOpacity: 0.1, shadowRadius: 40, elevation: 15,
    borderWidth: 8, borderColor: '#FFF'
  },
  onboardTitle: { fontSize: 36, fontWeight: '900', color: '#0F172A', textAlign: 'center', marginBottom: 20, lineHeight: 44 },
  onboardSub: { fontSize: 18, color: '#64748B', textAlign: 'center', lineHeight: 30, fontWeight: '500' },
  onboardFooter: { padding: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dotRow: { flexDirection: 'row', gap: 10 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#E2E8F0' },
  activeDot: { width: 32, backgroundColor: '#2563EB' },
  nextBtn: { width: 180, height: 70, borderRadius: 35, overflow: 'hidden', shadowColor: '#2563EB', shadowOpacity: 0.4, shadowRadius: 20, elevation: 10 },
  nextBtnGradient: { width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  nextBtnText: { color: '#FFF', fontSize: 18, fontWeight: '900', letterSpacing: 1 },

  // --- GLASS DASHBOARD ---
  container: { flex: 1, backgroundColor: '#F1F5F9', height: '100%', width: '100%' },
  premiumHeader: { 
    paddingHorizontal: 25, paddingTop: 30, paddingBottom: 40, backgroundColor: '#FFF', 
    borderBottomLeftRadius: 50, borderBottomRightRadius: 50, 
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 30, elevation: 15, zIndex: 100 
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  headerActions: { flexDirection: 'row', gap: 10 },
  sortBtn: { 
    flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#F8FAFC', 
    paddingHorizontal: 15, paddingVertical: 10, borderRadius: 15, borderWidth: 1, borderColor: '#F1F5F9' 
  },
  sortBtnActive: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  sortBtnText: { fontSize: 10, fontWeight: '900', color: '#2563EB', letterSpacing: 1 },
  sortBtnTextActive: { color: '#FFF' },
  headerLocLabel: { fontSize: 11, fontWeight: '900', color: '#94A3B8', letterSpacing: 1.5, marginBottom: 6 },
  headerLocRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerLocText: { fontSize: 16, fontWeight: '800', color: '#1E293B' },
  langContainer: { flexDirection: 'row', gap: 10, backgroundColor: '#F8FAFC', padding: 4, borderRadius: 25 },
  langBadge: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  activeBadge: { backgroundColor: '#2563EB', shadowColor: '#2563EB', shadowOpacity: 0.3, shadowRadius: 10 },
  langBadgeText: { fontSize: 11, fontWeight: '800', color: '#64748B' },
  activeBadgeText: { color: '#FFF' },
  searchBar: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', 
    borderRadius: 25, paddingHorizontal: 20, height: 70, 
    borderWidth: 1, borderColor: '#F1F5F9'
  },
  searchInput: { flex: 1, marginLeft: 15, fontSize: 17, fontWeight: '600', color: '#1E293B' },
  voiceIconBox: { 
    width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFF', 
    justifyContent: 'center', alignItems: 'center', 
    shadowColor: '#2563EB', shadowOpacity: 0.2, shadowRadius: 15, elevation: 8 
  },
  voicePulse: { position: 'absolute', width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(37,99,235,0.08)' },

  // --- DYNAMIC FEED ---
  feed: { flex: 1, paddingHorizontal: 20 },
  feedContent: { paddingTop: 20, paddingBottom: 140 },
  sectionTitle: { fontSize: 24, fontWeight: '900', color: '#0F172A', marginBottom: 20, letterSpacing: -0.5 },
  
  // --- AI MATCHES (HIGH EFFECT) ---
  aiSection: { marginBottom: 40 },
  aiLabel: { 
    flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#EFF6FF', 
    paddingHorizontal: 15, paddingVertical: 8, borderRadius: 12, alignSelf: 'flex-start', marginBottom: 20,
    borderWidth: 1, borderColor: '#DBEAFE'
  },
  aiLabelText: { fontSize: 11, fontWeight: '900', color: '#2563EB', letterSpacing: 1 },
  aiCard: { 
    width: 220, marginRight: 20, borderRadius: 32, overflow: 'hidden', 
    backgroundColor: '#FFF', shadowColor: '#2563EB', shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 
  },
  aiCardInner: { padding: 25, height: 160, justifyContent: 'space-between' },
  aiJobTitle: { fontSize: 18, fontWeight: '900', color: '#1E293B', lineHeight: 24 },
  aiJobSalary: { fontSize: 15, fontWeight: '800', color: '#10B981' },
  aiMatchBadge: { backgroundColor: 'rgba(37,99,235,0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, alignSelf: 'flex-start' },
  aiMatchText: { fontSize: 10, fontWeight: '900', color: '#2563EB' },
  // --- FILTERING & CATEGORIES ---
  categorySection: { marginBottom: 30 },
  catPill: { 
    paddingHorizontal: 22, paddingVertical: 12, borderRadius: 20, 
    backgroundColor: '#FFF', marginRight: 12, borderWidth: 1, borderColor: '#F1F5F9',
    shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 5, elevation: 2
  },
  catPillActive: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  catPillText: { fontSize: 14, fontWeight: '700', color: '#64748B' },
  catPillTextActive: { color: '#FFF' },

  // --- EMPTY STATE ---
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60, opacity: 0.5 },
  emptyText: { fontSize: 16, fontWeight: '600', color: '#64748B', marginTop: 15 },

  tabBar: { 
    height: 100, paddingBottom: 40, paddingTop: 20, borderTopLeftRadius: 50, borderTopRightRadius: 50, 
    position: 'absolute', backgroundColor: '#FFF', borderTopWidth: 0,
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 25, elevation: 20
  },
  floatingAI: { 
    position: 'absolute', bottom: 125, right: 25, width: 74, height: 74, borderRadius: 37, 
    overflow: 'hidden', shadowColor: '#2563EB', shadowOpacity: 0.4, shadowRadius: 20, elevation: 15 
  },
  floatingAIInner: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' },
});
