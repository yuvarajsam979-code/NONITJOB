import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, RefreshControl, TextInput, Animated, StyleSheet, Dimensions } from 'react-native';
import { Search, MapPin, Mic, Sparkles, IndianRupee, Clock, Zap, Star, Briefcase, Filter, ChevronRight, LayoutGrid, Bell, ShieldCheck } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

import JobCard from '../components/JobCard';
import MapSection from '../components/MapSection';
import SkeletonCard from '../components/SkeletonCard';

const { width, height } = Dimensions.get('window');

function HomeScreen({ 
  jobs, loading, fetchJobs, language, setLanguage, onVoicePress, onJobPress, 
  searchQuery, setSearchQuery, selectedCategory, setSelectedCategory 
}) {
  const [sortMode, setSortMode] = useState('Newest'); 
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const orbAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 1000, useNativeDriver: true }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(orbAnim, { toValue: 20, duration: 3000, useNativeDriver: true }),
          Animated.timing(orbAnim, { toValue: 0, duration: 3000, useNativeDriver: true }),
        ])
      ).start()
    ]).start();
  }, []);

  const categories = ['All', ...new Set((jobs || []).map(j => j?.category).filter(Boolean))];
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const categoryIcons = {
    'All': <LayoutGrid size={18} color="#60A5FA" />,
    'Driver': <Briefcase size={18} color="#60A5FA" />,
    'Electrician': <Zap size={18} color="#60A5FA" />,
    'Security': <Shield size={18} color="#60A5FA" />
  };

  const filteredJobs = (jobs || []).filter(job => {
    const query = searchQuery?.toLowerCase() || '';
    return (
      job?.title?.toLowerCase().includes(query) || 
      job?.category?.toLowerCase().includes(query) ||
      job?.description?.toLowerCase().includes(query) ||
      job?.location?.address?.toLowerCase().includes(query) ||
      job?.employer?.name?.toLowerCase().includes(query)
    ) && (selectedCategory === 'All' || job?.category === selectedCategory);
  }).sort((a, b) => {
    if (sortMode === 'Salary') {
      const getSalary = (s) => parseInt(s?.match(/\d+/)?.[0] || 0);
      return getSalary(b?.salary) - getSalary(a?.salary);
    }
    return 0; 
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* DEEP SPACE BACKGROUND */}
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient colors={['#020617', '#0F172A', '#1E293B']} style={StyleSheet.absoluteFill} />
        <Animated.View style={[styles.glowOrb, { top: '20%', right: '-20%', transform: [{ translateY: orbAnim }] }]} />
        <Animated.View style={[styles.glowOrb, { bottom: '10%', left: '-20%', backgroundColor: '#6366F1', opacity: 0.05 }]} />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        {/* WONDERFUL DARK HEADER */}
        <View style={styles.premiumHeader}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greetingText}>{getGreeting()},</Text>
              <Text style={styles.userName}>Yuvaraj Sam 👋</Text>
            </View>
            <TouchableOpacity style={styles.notifBtn}>
              <Bell size={22} color="#60A5FA" />
              <View style={styles.notifDot} />
            </TouchableOpacity>
          </View>

          <View style={styles.searchBar}>
            <Search size={20} color="#64748B" />
            <TextInput 
              placeholder="Search 'Driver', 'Electrician'..." 
              style={styles.searchInput}
              placeholderTextColor="#475569"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.micBtn} onPress={onVoicePress}>
              <Mic size={20} color="#FFF" />
              <LinearGradient colors={['#2563EB', '#60A5FA']} style={StyleSheet.absoluteFill} />
            </TouchableOpacity>
          </View>
        </View>

        <Animated.ScrollView 
          style={[styles.feed, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]} 
          contentContainerStyle={styles.feedContent}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchJobs} tintColor="#60A5FA" />}
        >
          {/* MAP SECTION: GLASS STYLE */}
          <View style={styles.mapSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Jobs Near You</Text>
              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            </View>
            <View style={styles.mapCard}>
              <MapSection jobs={filteredJobs} onJobPress={onJobPress} />
            </View>
          </View>

          {/* AI TIPS: NEON STYLE */}
          <View style={styles.aiTipBox}>
            <LinearGradient colors={['rgba(37,99,235,0.1)', 'rgba(2,6,23,0.3)']} style={styles.aiTipInner}>
              <Sparkles size={16} color="#60A5FA" />
              <Text style={styles.aiTipText}>AI Insight: Jobs in <Text style={styles.boldText}>Chennai Central</Text> are hiring 2x faster today!</Text>
            </LinearGradient>
          </View>

          {/* CATEGORIES: HORIZONTAL GLASS */}
          <View style={styles.catSection}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map((cat) => (
                <TouchableOpacity 
                  key={cat} 
                  onPress={() => setSelectedCategory(cat)}
                  style={[styles.catCard, selectedCategory === cat && styles.catCardActive]}
                >
                  <View style={[styles.catIconBox, selectedCategory === cat && styles.catIconActive]}>
                    {categoryIcons[cat] || <Briefcase size={18} color={selectedCategory === cat ? '#FFF' : '#60A5FA'} />}
                  </View>
                  <Text style={[styles.catLabel, selectedCategory === cat && styles.catLabelActive]}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* JOB LIST HEADER */}
          <View style={styles.listHeader}>
            <Text style={styles.sectionTitle}>Featured Opportunities</Text>
            <TouchableOpacity style={styles.filterBtn}>
              <Filter size={16} color="#60A5FA" />
            </TouchableOpacity>
          </View>
          
          {loading ? (
            <SkeletonCard />
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard key={job._id || Math.random()} job={job} onPress={() => onJobPress(job)} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Search size={60} color="#1E293B" />
              <Text style={styles.emptyText}>No results found</Text>
            </View>
          )}
        </Animated.ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  glowOrb: { position: 'absolute', width: 300, height: 300, borderRadius: 150, backgroundColor: '#2563EB', opacity: 0.1, filter: 'blur(80px)' },
  premiumHeader: { paddingHorizontal: 25, paddingTop: 30, paddingBottom: 30 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  greetingText: { fontSize: 13, fontWeight: '700', color: '#64748B', letterSpacing: 1 },
  userName: { fontSize: 26, fontWeight: '900', color: '#FFF', marginTop: 4 },
  notifBtn: { width: 50, height: 50, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.03)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  notifDot: { position: 'absolute', top: 15, right: 15, width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444', borderWidth: 2, borderColor: '#020617' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 20, paddingHorizontal: 20, height: 65, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  searchInput: { flex: 1, marginLeft: 12, fontSize: 16, color: '#FFF', fontWeight: '600' },
  micBtn: { width: 44, height: 44, borderRadius: 12, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
  feed: { flex: 1 },
  feedContent: { paddingHorizontal: 25, paddingBottom: 150 },
  mapSection: { marginBottom: 35 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitle: { fontSize: 22, fontWeight: '900', color: '#FFF', letterSpacing: -0.5 },
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(239,68,68,0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#EF4444' },
  liveText: { fontSize: 9, fontWeight: '900', color: '#EF4444', letterSpacing: 1 },
  mapCard: { height: 220, borderRadius: 30, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', backgroundColor: '#0F172A' },
  aiTipBox: { marginBottom: 30, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(96,165,250,0.1)' },
  aiTipInner: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 18 },
  aiTipText: { flex: 1, fontSize: 13, color: '#94A3B8', lineHeight: 20, fontWeight: '500' },
  boldText: { color: '#60A5FA', fontWeight: '800' },
  catSection: { marginBottom: 35 },
  catCard: { width: 100, height: 120, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: 15, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  catCardActive: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  catIconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(96,165,250,0.05)', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  catIconActive: { backgroundColor: 'rgba(255,255,255,0.2)' },
  catLabel: { fontSize: 12, fontWeight: '800', color: '#475569' },
  catLabelActive: { color: '#FFF' },
  listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  filterBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.03)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  emptyState: { alignItems: 'center', paddingVertical: 80, opacity: 0.5 },
  emptyText: { color: '#475569', fontSize: 16, fontWeight: '600', marginTop: 15 }
});

export default HomeScreen;
