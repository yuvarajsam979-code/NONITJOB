import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { User, ShieldCheck, MapPin, Briefcase, Star, Settings, ChevronRight, LogOut, FileText, Bell, Users } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const ProfileScreen = ({ onEmployerPress }) => {
  const stats = [
    { label: 'Applied', value: '12', color: '#2563EB' },
    { label: 'Interviews', value: '3', color: '#8B5CF6' },
    { label: 'Hired', value: '1', color: '#22C55E' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity style={styles.settingsBtn}>
          <Settings size={24} color="#1E293B" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarBox}>
            <View style={styles.avatar}>
              <User size={40} color="#2563EB" />
            </View>
            <View style={styles.verifyBadge}>
              <ShieldCheck size={18} color="#FFF" />
            </View>
          </View>
          
          <Text style={styles.userName}>Yuvaraj Sam</Text>
          <View style={styles.locRow}>
            <MapPin size={14} color="#64748B" />
            <Text style={styles.locText}>Chennai, Tamil Nadu</Text>
          </View>

          <View style={styles.ratingRow}>
            <Star size={16} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratingText}>4.8 (12 Reviews)</Text>
          </View>

          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>EDIT PROFILE</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.employerModeBtn} onPress={onEmployerPress}>
            <LinearGradient colors={['#F8FAFC', '#F1F5F9']} style={styles.employerModeInner}>
              <Users size={16} color="#2563EB" />
              <Text style={styles.employerModeText}>SWITCH TO EMPLOYER MODE</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {stats.map((s, i) => (
            <View key={i} style={styles.statItem}>
              <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Section: Professional Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Info</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <Briefcase size={20} color="#2563EB" />
              <View>
                <Text style={styles.infoLabel}>Primary Role</Text>
                <Text style={styles.infoValue}>Professional Driver</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <FileText size={20} color="#2563EB" />
              <View>
                <Text style={styles.infoLabel}>Experience</Text>
                <Text style={styles.infoValue}>5+ Years</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuBox}>
          {[
            { icon: <Bell size={20} color="#475569" />, label: 'Notifications' },
            { icon: <FileText size={20} color="#475569" />, label: 'My Resume / ID' },
            { icon: <ShieldCheck size={20} color="#475569" />, label: 'Verification Status' },
          ].map((item, i) => (
            <TouchableOpacity key={i} style={styles.menuItem}>
              <View style={styles.menuLeft}>
                {item.icon}
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <ChevronRight size={20} color="#CBD5E1" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutBtn}>
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, height: 70, backgroundColor: '#FFF' },
  headerTitle: { fontSize: 22, fontWeight: '900', color: '#1E293B' },
  settingsBtn: { padding: 5 },
  content: { flex: 1 },
  scrollContent: { padding: 25, paddingBottom: 120 },
  profileCard: { backgroundColor: '#FFF', borderRadius: 32, padding: 30, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 15, elevation: 5, marginBottom: 25 },
  avatarBox: { width: 100, height: 100, marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#EFF6FF', justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: '#FFF' },
  verifyBadge: { position: 'absolute', bottom: 0, right: 0, width: 32, height: 32, borderRadius: 16, backgroundColor: '#22C55E', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#FFF' },
  userName: { fontSize: 24, fontWeight: '900', color: '#1E293B', marginBottom: 8 },
  locRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  locText: { fontSize: 14, color: '#64748B', fontWeight: '500' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 25 },
  ratingText: { fontSize: 13, fontWeight: '700', color: '#1E293B' },
  editBtn: { paddingHorizontal: 25, paddingVertical: 12, borderRadius: 15, backgroundColor: '#F1F5F9' },
  editBtnText: { fontSize: 11, fontWeight: '900', color: '#1E293B', letterSpacing: 1 },
  employerModeBtn: { width: '100%', height: 56, borderRadius: 16, overflow: 'hidden', marginTop: 20 },
  employerModeInner: { width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  employerModeText: { fontSize: 10, fontWeight: '900', color: '#2563EB', letterSpacing: 1 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 35 },
  statItem: { width: (width - 70) / 3, backgroundColor: '#FFF', borderRadius: 24, padding: 20, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 10, elevation: 3 },
  statValue: { fontSize: 24, fontWeight: '900', marginBottom: 4 },
  statLabel: { fontSize: 11, fontWeight: '700', color: '#94A3B8' },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: '900', color: '#1E293B', marginBottom: 15 },
  infoCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 20, gap: 20, shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 10, elevation: 3 },
  infoItem: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  infoLabel: { fontSize: 11, fontWeight: '700', color: '#94A3B8', marginBottom: 2 },
  infoValue: { fontSize: 15, fontWeight: '800', color: '#1E293B' },
  menuBox: { backgroundColor: '#FFF', borderRadius: 24, padding: 10, marginBottom: 30, shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 10, elevation: 3 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  menuLabel: { fontSize: 15, fontWeight: '700', color: '#475569' },
  logoutBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, padding: 20 },
  logoutText: { fontSize: 16, fontWeight: '800', color: '#EF4444' },
});

export default ProfileScreen;
