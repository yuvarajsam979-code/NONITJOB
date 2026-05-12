import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { Phone, MessageCircle, MapPin, Calendar, Clock, ShieldCheck, ChevronLeft, Share2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MapSection from '../components/MapSection';

const { width } = Dimensions.get('window');

const JobDetailsScreen = ({ job, onClose }) => {
  const handleCall = () => Linking.openURL(`tel:${job.employer.contact}`);
  const handleWhatsApp = () => Linking.openURL(`whatsapp://send?phone=91${job.employer.contact}`);

  return (
    <View style={styles.modalOverlay}>
      <SafeAreaView style={styles.container}>
        {/* Sticky Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backBtn}>
            <ChevronLeft size={28} color="#1E293B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Job Details</Text>
          <TouchableOpacity style={styles.shareBtn}>
            <Share2 size={24} color="#1E293B" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.scrollPadding}>
          {/* Mini Map Route Section */}
          <View style={styles.mapBox}>
            <MapSection jobs={[job]} />
            <View style={styles.mapLabel}>
              <Text style={styles.mapLabelText}>📍 {job.location.coordinates[1].toFixed(2)}, {job.location.coordinates[0].toFixed(2)}</Text>
            </View>
          </View>

          {/* Job Info Section */}
          <View style={styles.infoSection}>
            <View style={styles.titleRow}>
              <View>
                <Text style={styles.categoryText}>{job.category.toUpperCase()}</Text>
                <Text style={styles.jobTitle}>{job.title}</Text>
              </View>
              <Text style={styles.salaryText}>{job.salary}</Text>
            </View>

            <View style={styles.badgeRow}>
              <View style={[styles.badge, styles.verifiedBadge]}>
                <ShieldCheck size={14} color="#22C55E" />
                <Text style={styles.verifiedBadgeText}>VERIFIED EMPLOYER</Text>
              </View>
              <View style={styles.badge}>
                <Clock size={14} color="#64748B" />
                <Text style={styles.badgeText}>IMMEDIATE JOINING</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Employer Card */}
            <View style={styles.employerCard}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{job.employer.name[0]}</Text>
              </View>
              <View>
                <Text style={styles.employerName}>{job.employer.name}</Text>
                <Text style={styles.employerSub}>Individual Employer • Chennai</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Description */}
            <Text style={styles.sectionHeading}>Job Description</Text>
            <Text style={styles.descriptionText}>{job.description}</Text>
            
            <Text style={styles.sectionHeading}>Requirements</Text>
            {['Valid License', 'Aadhar Card', 'Own Vehicle', 'Punctuality'].map((req, i) => (
              <View key={i} style={styles.reqRow}>
                <View style={styles.reqDot} />
                <Text style={styles.reqText}>{req}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Floating Action Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.callBtn} onPress={handleCall}>
            <View style={styles.btnInner}>
              <Phone size={22} color="#FFF" />
              <Text style={styles.btnText}>CALL EMPLOYER</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.waBtn} onPress={handleWhatsApp}>
            <LinearGradient colors={['#22C55E', '#15803D']} style={styles.btnInner}>
              <MessageCircle size={22} color="#FFF" />
              <Text style={styles.btnText}>WHATSAPP</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#FFF', zIndex: 2000 },
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, height: 60, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  backBtn: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
  shareBtn: { padding: 5 },
  content: { flex: 1 },
  scrollPadding: { paddingBottom: 120 },
  mapBox: { height: 240, width: '100%' },
  mapLabel: { position: 'absolute', bottom: 20, left: 20, backgroundColor: 'rgba(255,255,255,0.9)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  mapLabelText: { fontSize: 12, fontWeight: '700', color: '#1E293B' },
  infoSection: { padding: 25 },
  categoryText: { fontSize: 10, fontWeight: '900', color: '#2563EB', letterSpacing: 1.5, marginBottom: 8 },
  jobTitle: { fontSize: 30, fontWeight: '900', color: '#111827', marginBottom: 12 },
  salaryText: { fontSize: 24, fontWeight: '900', color: '#22C55E', marginBottom: 20 },
  badgeRow: { flexDirection: 'row', gap: 10, marginBottom: 30 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#F8FAFC', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  verifiedBadge: { backgroundColor: '#F0FDF4' },
  verifiedBadgeText: { fontSize: 10, fontWeight: '800', color: '#15803D' },
  badgeText: { fontSize: 10, fontWeight: '800', color: '#64748B' },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 25 },
  employerCard: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#EFF6FF', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 20, fontWeight: '900', color: '#2563EB' },
  employerName: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
  employerSub: { fontSize: 13, color: '#94A3B8' },
  sectionHeading: { fontSize: 18, fontWeight: '900', color: '#1E293B', marginBottom: 15 },
  descriptionText: { fontSize: 15, color: '#475569', lineHeight: 26, marginBottom: 30 },
  reqRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  reqDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#2563EB' },
  reqText: { fontSize: 15, color: '#1E293B', fontWeight: '500' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: '#FFF', flexDirection: 'row', gap: 15, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  callBtn: { flex: 1.2, height: 64, borderRadius: 20, backgroundColor: '#111827', overflow: 'hidden' },
  waBtn: { flex: 1, height: 64, borderRadius: 20, overflow: 'hidden' },
  btnInner: { width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  btnText: { color: '#FFF', fontSize: 13, fontWeight: '900', letterSpacing: 0.5 },
});

export default JobDetailsScreen;
