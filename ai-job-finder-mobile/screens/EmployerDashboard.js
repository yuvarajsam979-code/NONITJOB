import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Briefcase, Users, MessageCircle, ChevronRight, Clock, Plus, BarChart2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const EmployerDashboard = ({ onClose }) => {
  const activeJobs = [
    { title: 'Senior Car Driver', applicants: 12, posted: '2 days ago', status: 'Active' },
    { title: 'Shop Helper', applicants: 8, posted: '5 hours ago', status: 'Active' }
  ];

  return (
    <View style={styles.overlay}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Employer Center</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeBtnText}>DONE</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
          {/* Quick Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <BarChart2 size={24} color="#2563EB" />
              <Text style={styles.statValue}>452</Text>
              <Text style={styles.statLabel}>Job Views</Text>
            </View>
            <View style={styles.statCard}>
              <Users size={24} color="#22C55E" />
              <Text style={styles.statValue}>20</Text>
              <Text style={styles.statLabel}>Applicants</Text>
            </View>
          </View>

          {/* Active Postings */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Active Postings</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>

            {activeJobs.map((job, i) => (
              <TouchableOpacity key={i} style={styles.jobCard}>
                <View style={styles.jobInfo}>
                  <Text style={styles.jobTitle}>{job.title}</Text>
                  <View style={styles.jobMeta}>
                    <Clock size={12} color="#94A3B8" />
                    <Text style={styles.jobMetaText}>Posted {job.posted}</Text>
                  </View>
                </View>
                <View style={styles.applicantBadge}>
                  <Text style={styles.applicantCount}>{job.applicants}</Text>
                  <Text style={styles.applicantLabel}>NEW</Text>
                </View>
                <ChevronRight size={20} color="#CBD5E1" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Recent Applicants Quick-Action */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Applicants</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.applicantScroll}>
              {[1, 2, 3].map((_, i) => (
                <View key={i} style={styles.miniProfile}>
                  <View style={styles.miniAvatar}>
                    <Text style={styles.miniAvatarText}>A</Text>
                  </View>
                  <Text style={styles.miniName}>Arjun K.</Text>
                  <Text style={styles.miniRole}>Driver</Text>
                  <TouchableOpacity style={styles.quickHireBtn}>
                    <MessageCircle size={14} color="#FFF" />
                    <Text style={styles.quickHireText}>HIRE</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Post New Job CTA */}
          <TouchableOpacity style={styles.postCta}>
            <LinearGradient colors={['#2563EB', '#1D4ED8']} style={styles.postCtaInner}>
              <Plus size={24} color="#FFF" />
              <Text style={styles.postCtaText}>POST A NEW JOB</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#F8FAFC', zIndex: 4000 },
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, height: 70, backgroundColor: '#FFF' },
  headerTitle: { fontSize: 22, fontWeight: '900', color: '#1E293B' },
  closeBtn: { padding: 5 },
  closeBtnText: { fontSize: 14, fontWeight: '900', color: '#2563EB' },
  content: { flex: 1 },
  scrollContent: { padding: 25, paddingBottom: 50 },
  statsRow: { flexDirection: 'row', gap: 15, marginBottom: 30 },
  statCard: { flex: 1, backgroundColor: '#FFF', borderRadius: 24, padding: 20, shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 10, elevation: 3 },
  statValue: { fontSize: 24, fontWeight: '900', color: '#1E293B', marginVertical: 8 },
  statLabel: { fontSize: 12, fontWeight: '700', color: '#94A3B8' },
  section: { marginBottom: 40 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: '#1E293B' },
  viewAllText: { fontSize: 12, fontWeight: '800', color: '#2563EB' },
  jobCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 24, padding: 20, marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 10, elevation: 3 },
  jobInfo: { flex: 1 },
  jobTitle: { fontSize: 16, fontWeight: '800', color: '#1E293B', marginBottom: 6 },
  jobMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  jobMetaText: { fontSize: 12, color: '#94A3B8', fontWeight: '500' },
  applicantBadge: { backgroundColor: '#F0FDF4', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, marginRight: 15, alignItems: 'center' },
  applicantCount: { fontSize: 16, fontWeight: '900', color: '#15803D' },
  applicantLabel: { fontSize: 8, fontWeight: '900', color: '#15803D' },
  applicantScroll: { flexDirection: 'row', marginTop: 10 },
  miniProfile: { backgroundColor: '#FFF', borderRadius: 24, padding: 20, alignItems: 'center', marginRight: 15, width: 140, shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 10, elevation: 3 },
  miniAvatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#EFF6FF', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  miniAvatarText: { fontSize: 18, fontWeight: '900', color: '#2563EB' },
  miniName: { fontSize: 14, fontWeight: '800', color: '#1E293B', marginBottom: 2 },
  miniRole: { fontSize: 12, color: '#94A3B8', fontWeight: '500', marginBottom: 15 },
  quickHireBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#22C55E', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  quickHireText: { fontSize: 10, fontWeight: '900', color: '#FFF' },
  postCta: { height: 70, borderRadius: 35, overflow: 'hidden', marginTop: 10 },
  postCtaInner: { width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  postCtaText: { color: '#FFF', fontSize: 15, fontWeight: '900', letterSpacing: 1 },
});

export default EmployerDashboard;
