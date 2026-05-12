import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, RefreshControl, TextInput, Animated } from 'react-native';
import { Search, MapPin, Mic, Sparkles, IndianRupee, Clock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

import JobCard from '../components/JobCard';
import MapSection from '../components/MapSection';
import SkeletonCard from '../components/SkeletonCard';

function HomeScreen({ 
  jobs, loading, fetchJobs, language, setLanguage, onVoicePress, onJobPress, 
  searchQuery, setSearchQuery, selectedCategory, setSelectedCategory 
}) {
  const [sortMode, setSortMode] = useState('Newest'); 
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  const categories = ['All', ...new Set(jobs.map(j => j.category))];

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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.premiumHeader}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerLocLabel}>YOUR LOCATION</Text>
            <View style={styles.headerLocRow}>
              <MapPin size={16} color="#2563EB" />
              <Text style={styles.headerLocText}>Chennai, Tamil Nadu</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              onPress={() => setSortMode(sortMode === 'Newest' ? 'Salary' : 'Newest')}
              style={[styles.sortBtn, sortMode === 'Salary' && styles.sortBtnActive]}
            >
              {sortMode === 'Salary' ? (
                <IndianRupee size={14} color="#FFF" />
              ) : (
                <Clock size={14} color="#2563EB" />
              )}
              <Text style={[styles.sortBtnText, sortMode === 'Salary' && styles.sortBtnTextActive]}>
                {sortMode === 'Salary' ? 'HIGH PAY' : 'NEWEST'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

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
            <View style={styles.voicePulse} />
            <Mic size={22} color="#2563EB" />
          </TouchableOpacity>
        </View>
      </View>

      <Animated.ScrollView 
        style={[styles.feed, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]} 
        contentContainerStyle={styles.feedContent}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchJobs} />}
      >
        <View style={styles.mapConnectionBox}>
          <Text style={styles.sectionTitle}>Jobs Near You (Map View)</Text>
          <View style={styles.mapInner}>
            <MapSection jobs={filteredJobs} onJobPress={onJobPress} />
          </View>
        </View>

        <View style={styles.categorySection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((cat) => (
              <TouchableOpacity 
                key={cat} 
                onPress={() => setSelectedCategory(cat)}
                style={[styles.catPill, selectedCategory === cat && styles.catPillActive]}
              >
                <Text style={[styles.catPillText, selectedCategory === cat && styles.catPillTextActive]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.aiSection}>
          <View style={styles.aiLabel}>
            <Sparkles size={16} color="#2563EB" />
            <Text style={styles.aiLabelText}>AI MATCHES FOR YOU</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {jobs.length > 0 ? jobs.slice(0, 3).map((job, i) => (
              <TouchableOpacity key={i} style={styles.aiCard} onPress={() => onJobPress(job)}>
                <LinearGradient colors={['#F0F7FF', '#FFF']} style={styles.aiCardInner}>
                  <Text style={styles.aiJobTitle}>{job.title}</Text>
                  <Text style={styles.aiJobSalary}>{job.salary}</Text>
                  <View style={styles.aiMatchBadge}>
                    <Text style={styles.aiMatchText}>98% MATCH</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            )) : <View style={styles.aiCard}><Text style={styles.aiCardEmpty}>Searching matches...</Text></View>}
          </ScrollView>
        </View>

        <Text style={styles.sectionTitle}>
          {selectedCategory === 'All' ? 'Jobs Near You' : `${selectedCategory} Jobs`}
        </Text>
        
        {loading ? (
          <SkeletonCard />
        ) : filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard key={job._id || Math.random()} job={job} onPress={() => onJobPress(job)} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Search size={48} color="#E2E8F0" />
            <Text style={styles.emptyText}>No jobs found for this search.</Text>
          </View>
        )}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  premiumHeader: { padding: 25, backgroundColor: '#FFF', borderBottomLeftRadius: 32, borderBottomRightRadius: 32, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 15, elevation: 5 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  headerLocLabel: { fontSize: 10, fontWeight: '900', color: '#94A3B8', letterSpacing: 1, marginBottom: 4 },
  headerLocRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  headerLocText: { fontSize: 15, fontWeight: '800', color: '#1E293B' },
  headerActions: { flexDirection: 'row', gap: 12 },
  sortBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#EFF6FF', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, borderWidth: 1, borderColor: '#DBEAFE' },
  sortBtnActive: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  sortBtnText: { fontSize: 11, fontWeight: '900', color: '#2563EB' },
  sortBtnTextActive: { color: '#FFF' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', borderRadius: 20, paddingHorizontal: 15, height: 60, gap: 12 },
  searchInput: { flex: 1, fontSize: 16, color: '#1E293B', fontWeight: '600' },
  voiceIconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#2563EB', shadowOpacity: 0.1, shadowRadius: 10, elevation: 2 },
  voicePulse: { position: 'absolute', width: 40, height: 40, borderRadius: 12, backgroundColor: '#2563EB', opacity: 0.1 },
  feed: { flex: 1 },
  feedContent: { padding: 25, paddingTop: 20 },
  mapConnectionBox: { marginBottom: 35 },
  mapInner: { height: 220, borderRadius: 32, overflow: 'hidden', backgroundColor: '#FFF', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 15, elevation: 5, borderWidth: 1, borderColor: '#F1F5F9' },
  categorySection: { marginBottom: 30 },
  catPill: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 15, backgroundColor: '#FFF', marginRight: 10, borderWidth: 1, borderColor: '#F1F5F9' },
  catPillActive: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  catPillText: { fontSize: 13, fontWeight: '700', color: '#64748B' },
  catPillTextActive: { color: '#FFF' },
  aiSection: { marginBottom: 35 },
  aiLabel: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 15 },
  aiLabelText: { fontSize: 12, fontWeight: '900', color: '#2563EB', letterSpacing: 1 },
  aiCard: { width: 220, marginRight: 15, borderRadius: 24, overflow: 'hidden', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#F0F7FF' },
  aiCardInner: { padding: 20 },
  aiJobTitle: { fontSize: 15, fontWeight: '800', color: '#1E293B', marginBottom: 4 },
  aiJobSalary: { fontSize: 13, fontWeight: '700', color: '#10B981', marginBottom: 12 },
  aiMatchBadge: { alignSelf: 'flex-start', backgroundColor: '#FFF', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: '#F0F7FF' },
  aiMatchText: { fontSize: 9, fontWeight: '900', color: '#2563EB' },
  sectionTitle: { fontSize: 22, fontWeight: '900', color: '#1E293B', marginBottom: 20, letterSpacing: -0.5 },
  emptyState: { alignItems: 'center', marginTop: 50, gap: 15 },
  emptyText: { fontSize: 16, color: '#94A3B8', fontWeight: '600' },
};

export default HomeScreen;
