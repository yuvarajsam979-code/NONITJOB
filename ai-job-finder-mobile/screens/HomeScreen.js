import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, RefreshControl, TextInput, Animated, StyleSheet, Dimensions } from 'react-native';
import { Search, MapPin, Mic, Sparkles, IndianRupee, Clock, Zap, Star, Briefcase, Filter, ChevronRight, LayoutGrid } from 'lucide-react-native';
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
  const orb1Anim = useRef(new Animated.Value(0)).current;
  const orb2Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(orb1Anim, { toValue: 20, duration: 4000, useNativeDriver: true }),
          Animated.timing(orb1Anim, { toValue: 0, duration: 4000, useNativeDriver: true }),
        ])
      ).start(),
      Animated.loop(
        Animated.sequence([
          Animated.timing(orb2Anim, { toValue: -20, duration: 5000, useNativeDriver: true }),
          Animated.timing(orb2Anim, { toValue: 0, duration: 5000, useNativeDriver: true }),
        ])
      ).start()
    ]).start();
  }, []);

  const categories = ['All', ...new Set(jobs.map(j => j.category))];
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const categoryIcons = {
    'All': <LayoutGrid size={18} color="#2563EB" />,
    'Driver': <Briefcase size={18} color="#2563EB" />,
    'Electrician': <Zap size={18} color="#2563EB" />,
    'Security': <Shield size={18} color="#2563EB" />
  };

  const filteredJobs = jobs.filter(job => {
    const query = searchQuery.toLowerCase();
    return (
      job.title.toLowerCase().includes(query) || 
      job.category.toLowerCase().includes(query) ||
      job.description?.toLowerCase().includes(query) ||
      job.location?.address?.toLowerCase().includes(query) ||
      job.employer?.name?.toLowerCase().includes(query)
    ) && (selectedCategory === 'All' || job.category === selectedCategory);
  }).sort((a, b) => {
    if (sortMode === 'Salary') {
      const getSalary = (s) => parseInt(s?.match(/\d+/)?.[0] || 0);
      return getSalary(b.salary) - getSalary(a.salary);
    }
    return 0; 
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* ELITE MESH BACKGROUND */}
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient colors={['#F8FAFC', '#F1F5F9']} style={StyleSheet.absoluteFill} />
        <Animated.View style={[styles.orb, styles.orb1, { transform: [{ translateY: orb1Anim }] }]} />
        <Animated.View style={[styles.orb, styles.orb2, { transform: [{ translateX: orb2Anim }] }]} />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        {/* Elite Header */}
        <View style={styles.premiumHeader}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greetingText}>{getGreeting()},</Text>
              <Text style={styles.userName}>Yuvaraj Sam 👋</Text>
            </View>
            <TouchableOpacity style={styles.profileBtn}>
              <LinearGradient colors={['#F1F5F9', '#E2E8F0']} style={styles.profileBtnInner}>
                <Filter size={20} color="#1E293B" />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Search size={22} color="#94A3B8" />
              <TextInput 
                placeholder="Search 'Driver', 'Helper'..." 
                style={styles.searchInput}
                placeholderTextColor="#94A3B8"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity style={styles.voiceIconBox} onPress={onVoicePress}>
                <Mic size={22} color="#2563EB" />
                <View style={styles.voicePulse} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.locationBar}>
            <View style={styles.locLeft}>
              <MapPin size={14} color="#2563EB" />
              <Text style={styles.locText}>Chennai, Tamil Nadu</Text>
            </View>
            <TouchableOpacity onPress={() => setSortMode(sortMode === 'Newest' ? 'Salary' : 'Newest')} style={styles.sortToggle}>
              <Text style={styles.sortText}>{sortMode === 'Salary' ? 'HIGH PAY' : 'NEWEST'}</Text>
              <ChevronRight size={14} color="#64748B" />
            </TouchableOpacity>
          </View>
        </View>

        <Animated.ScrollView 
          style={[styles.feed, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]} 
          contentContainerStyle={styles.feedContent}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchJobs} />}
        >
          {/* Content sections same as before but now over the mesh background */}
          <View style={styles.mapSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Explore Nearby Jobs</Text>
              <TouchableOpacity style={styles.viewAllBtn}>
                <Text style={styles.viewAllText}>LIVE MAP</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.mapContainer}>
              <MapSection jobs={filteredJobs} onJobPress={onJobPress} />
            </View>
          </View>

          <View style={styles.tipMarquee}>
            <Zap size={14} color="#F59E0B" />
            <Text style={styles.tipText}>PRO TIP: Verified profiles get 3x more interview calls!</Text>
          </View>

          <View style={styles.categoryFlow}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map((cat) => (
                <TouchableOpacity 
                  key={cat} 
                  onPress={() => setSelectedCategory(cat)}
                  style={[styles.catCard, selectedCategory === cat && styles.catCardActive]}
                >
                  <View style={[styles.catIconBox, selectedCategory === cat && styles.catIconBoxActive]}>
                    {categoryIcons[cat] || <Briefcase size={18} color={selectedCategory === cat ? '#FFF' : '#2563EB'} />}
                  </View>
                  <Text style={[styles.catCardText, selectedCategory === cat && styles.catCardTextActive]}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.aiRecommend}>
            <View style={styles.aiHeader}>
              <Sparkles size={18} color="#2563EB" />
              <Text style={styles.aiTitle}>AI Top Matches</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.aiScroll}>
              {jobs.length > 0 ? jobs.slice(0, 3).map((job, i) => (
                <TouchableOpacity key={i} style={styles.aiMatchCard} onPress={() => onJobPress(job)}>
                  <LinearGradient colors={['#F8FAFC', '#FFF']} style={styles.aiMatchInner}>
                    <Text style={styles.aiJobTitle} numberOfLines={1}>{job.title}</Text>
                    <View style={styles.aiSalaryRow}>
                      <IndianRupee size={12} color="#10B981" />
                      <Text style={styles.aiSalaryText}>{job.salary?.match(/\d+/)?.[0] || '15'}K</Text>
                    </View>
                    <View style={styles.matchTag}>
                      <Text style={styles.matchTagText}>98% FIT</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              )) : <View style={styles.aiCardEmpty}><Text>Searching...</Text></View>}
            </ScrollView>
          </View>

          <View style={styles.feedHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory === 'All' ? 'Available Jobs' : `${selectedCategory} Jobs`}
            </Text>
            <Text style={styles.countText}>{filteredJobs.length} Results</Text>
          </View>
          
          {loading ? (
            <SkeletonCard />
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard key={job._id || Math.random()} job={job} onPress={() => onJobPress(job)} />
            ))
          ) : (
            <View style={styles.emptyFeed}>
              <Search size={60} color="#E2E8F0" />
              <Text style={styles.emptyFeedText}>No jobs matching your criteria.</Text>
            </View>
          )}
        </Animated.ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  orb: { position: 'absolute', borderRadius: 1000, opacity: 0.15, filter: 'blur(80px)' },
  orb1: { width: 400, height: 400, backgroundColor: '#2563EB', top: -100, right: -100 },
  orb2: { width: 350, height: 350, backgroundColor: '#8B5CF6', bottom: 100, left: -100 },
  premiumHeader: { backgroundColor: 'rgba(255,255,255,0.8)', paddingHorizontal: 25, paddingTop: 20, paddingBottom: 25, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 20, elevation: 5 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  greetingText: { fontSize: 13, fontWeight: '700', color: '#94A3B8' },
  userName: { fontSize: 24, fontWeight: '900', color: '#1E293B', marginTop: 2 },
  profileBtn: { width: 50, height: 50, borderRadius: 15, overflow: 'hidden' },
  profileBtnInner: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' },
  searchContainer: { marginBottom: 20 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', borderRadius: 20, paddingHorizontal: 20, height: 65, gap: 15 },
  searchInput: { flex: 1, fontSize: 16, fontWeight: '600', color: '#1E293B' },
  voiceIconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#2563EB', shadowOpacity: 0.1, shadowRadius: 10 },
  voicePulse: { position: 'absolute', width: 44, height: 44, borderRadius: 12, backgroundColor: '#2563EB', opacity: 0.05 },
  locationBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  locLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  locText: { fontSize: 14, fontWeight: '800', color: '#1E293B' },
  sortToggle: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  sortText: { fontSize: 10, fontWeight: '900', color: '#64748B', letterSpacing: 1 },
  feed: { flex: 1 },
  feedContent: { padding: 25, paddingBottom: 150 },
  mapSection: { marginBottom: 35 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitle: { fontSize: 22, fontWeight: '900', color: '#1E293B', letterSpacing: -0.5 },
  viewAllBtn: { backgroundColor: 'rgba(37,99,235,0.05)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 12 },
  viewAllText: { fontSize: 10, fontWeight: '900', color: '#2563EB', letterSpacing: 1 },
  mapContainer: { height: 220, borderRadius: 32, overflow: 'hidden', borderWidth: 1, borderColor: '#F1F5F9', backgroundColor: '#FFF', shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 10 },
  tipMarquee: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'rgba(254,243,199,0.5)', padding: 12, borderRadius: 15, marginBottom: 30, borderWidth: 1, borderColor: '#FEF3C7' },
  tipText: { fontSize: 12, fontWeight: '700', color: '#B45309' },
  categoryFlow: { marginBottom: 35 },
  catCard: { width: 100, height: 120, backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: 15, borderWidth: 1, borderColor: '#F1F5F9' },
  catCardActive: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  catIconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#EFF6FF', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  catIconBoxActive: { backgroundColor: 'rgba(255,255,255,0.2)' },
  catCardText: { fontSize: 12, fontWeight: '800', color: '#64748B' },
  catCardTextActive: { color: '#FFF' },
  aiRecommend: { marginBottom: 40 },
  aiHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20 },
  aiTitle: { fontSize: 12, fontWeight: '900', color: '#2563EB', letterSpacing: 1 },
  aiScroll: { overflow: 'visible' },
  aiMatchCard: { width: 220, marginRight: 20, borderRadius: 28, overflow: 'hidden', borderWidth: 1, borderColor: '#E2E8F0' },
  aiMatchInner: { padding: 20, height: 140, justifyContent: 'space-between' },
  aiJobTitle: { fontSize: 17, fontWeight: '900', color: '#1E293B' },
  aiSalaryRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  aiSalaryText: { fontSize: 15, fontWeight: '800', color: '#10B981' },
  matchTag: { backgroundColor: '#F0FDF4', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, alignSelf: 'flex-start' },
  matchTagText: { fontSize: 10, fontWeight: '900', color: '#10B981' },
  feedHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  countText: { fontSize: 13, fontWeight: '700', color: '#94A3B8' },
  emptyFeed: { alignItems: 'center', paddingVertical: 80, gap: 20, opacity: 0.5 },
  emptyFeedText: { fontSize: 16, fontWeight: '600', color: '#64748B' }
});

export default HomeScreen;
