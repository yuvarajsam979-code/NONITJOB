import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Phone, MessageCircle, ShieldCheck, MapPin } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const JobCard = ({ job, onPress }) => {
  const handleCall = () => Linking.openURL(`tel:${job.employer.contact}`);
  const handleWhatsApp = () => Linking.openURL(`whatsapp://send?phone=91${job.employer.contact}&text=Hi, I am interested in your job: ${job.title}`);

  return (
    <TouchableOpacity activeOpacity={0.95} onPress={onPress} style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.titleBox}>
            <View style={styles.titleRow}>
              <Text style={styles.title} numberOfLines={1}>{job.title}</Text>
              <View style={styles.verifiedBadge}>
                <ShieldCheck size={12} color="#2563EB" />
              </View>
            </View>
            <View style={styles.locRow}>
              <MapPin size={12} color="#94A3B8" />
              <Text style={styles.locText}>{job.location.address || 'Chennai'}</Text>
            </View>
          </View>
          <View style={styles.salaryBox}>
            <Text style={styles.salaryText}>{job.salary?.split('/')[0] || '15K'}</Text>
            <Text style={styles.salaryLabel}>PER MONTH</Text>
          </View>
        </View>

        <View style={styles.tagRow}>
          <View style={styles.tag}><Text style={styles.tagText}>IMMEDIATE</Text></View>
          <View style={styles.tag}><Text style={styles.tagText}>FREE FOOD</Text></View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.callBtn} onPress={handleCall}>
            <Phone size={18} color="#1E293B" />
            <Text style={styles.callBtnText}>CALL</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.waBtn} onPress={handleWhatsApp}>
            <LinearGradient colors={['#22C55E', '#15803D']} style={styles.waBtnInner}>
              <MessageCircle size={18} color="#FFF" />
              <Text style={styles.waBtnText}>WHATSAPP</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 25,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.08,
    shadowRadius: 25,
    elevation: 10,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 32,
    padding: 25,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  titleBox: { flex: 1, marginRight: 15 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  title: { fontSize: 20, fontWeight: '900', color: '#0F172A', letterSpacing: -0.5 },
  verifiedBadge: { backgroundColor: '#EFF6FF', padding: 4, borderRadius: 8 },
  locRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locText: { fontSize: 13, color: '#64748B', fontWeight: '600' },
  salaryBox: { alignItems: 'flex-end', backgroundColor: '#F0FDF4', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 15 },
  salaryText: { fontSize: 18, fontWeight: '900', color: '#10B981' },
  salaryLabel: { fontSize: 8, fontWeight: '900', color: '#10B981', letterSpacing: 1 },
  tagRow: { flexDirection: 'row', gap: 8, marginBottom: 25 },
  tag: { backgroundColor: '#F8FAFC', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, borderWidth: 1, borderColor: '#F1F5F9' },
  tagText: { fontSize: 9, fontWeight: '900', color: '#94A3B8', letterSpacing: 0.5 },
  footer: { flexDirection: 'row', gap: 12 },
  callBtn: { flex: 1, height: 56, borderRadius: 20, backgroundColor: '#F1F5F9', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  callBtnText: { fontSize: 14, fontWeight: '900', color: '#1E293B', letterSpacing: 0.5 },
  waBtn: { flex: 1.5, height: 56, borderRadius: 20, overflow: 'hidden' },
  waBtnInner: { width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  waBtnText: { fontSize: 14, fontWeight: '900', color: '#FFF', letterSpacing: 0.5 },
});

export default JobCard;
