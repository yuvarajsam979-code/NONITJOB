import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Animated, Platform } from 'react-native';
import { Phone, MessageCircle, ShieldCheck, MapPin, Sparkles, TrendingUp, Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const JobCard = ({ job, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, friction: 3, tension: 40, useNativeDriver: true }).start();
  };

  const handleCall = () => Linking.openURL(`tel:${job.employer.contact}`);
  const handleWhatsApp = () => Linking.openURL(`whatsapp://send?phone=91${job.employer.contact}&text=Hi, I am interested in your job: ${job.title}`);

  // Mock distance for MVP feel
  const distance = (Math.random() * 5).toFixed(1);
  const matchScore = Math.floor(Math.random() * (99 - 85 + 1) + 85);

  return (
    <Animated.View style={[styles.cardWrapper, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity 
        activeOpacity={1} 
        onPress={onPress} 
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.card}
      >
        {/* Elite Match Badge */}
        <View style={styles.matchBadge}>
          <LinearGradient colors={['#60A5FA', '#2563EB']} start={{x:0, y:0}} end={{x:1, y:1}} style={styles.matchBadgeInner}>
            <Sparkles size={10} color="#FFF" />
            <Text style={styles.matchText}>{matchScore}% AI MATCH</Text>
          </LinearGradient>
        </View>

        <View style={styles.header}>
          <View style={styles.titleBox}>
            <View style={styles.titleRow}>
              <Text style={styles.title} numberOfLines={1}>{job.title}</Text>
              <View style={styles.verifiedBadge}>
                <ShieldCheck size={14} color="#2563EB" />
              </View>
            </View>
            <View style={styles.locRow}>
              <MapPin size={12} color="#94A3B8" />
              <Text style={styles.locText}>{job.location.address || 'Chennai'}</Text>
              <View style={styles.dot} />
              <Text style={styles.distanceText}>{distance} km away</Text>
            </View>
          </View>
          <View style={styles.salaryContainer}>
            <Text style={styles.salaryValue}>₹{job.salary?.match(/\d+/)?.[0] || '15'}K</Text>
            <Text style={styles.salaryPeriod}>/mo</Text>
          </View>
        </View>

        <View style={styles.featuresRow}>
          <View style={styles.featTag}>
            <Zap size={12} color="#F59E0B" />
            <Text style={styles.featText}>IMMEDIATE</Text>
          </View>
          <View style={styles.featTag}>
            <TrendingUp size={12} color="#10B981" />
            <Text style={styles.featText}>HOT JOB</Text>
          </View>
        </View>

        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.callButton} onPress={handleCall}>
            <Phone size={18} color="#475569" />
            <Text style={styles.callText}>CALL</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.waButton} onPress={handleWhatsApp}>
            <LinearGradient colors={['#10B981', '#059669']} style={styles.waInner}>
              <MessageCircle size={18} color="#FFF" />
              <Text style={styles.waText}>WHATSAPP</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 20,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden'
  },
  matchBadge: { position: 'absolute', top: 0, right: 0 },
  matchBadgeInner: { 
    paddingHorizontal: 12, paddingVertical: 6, 
    borderBottomLeftRadius: 16, flexDirection: 'row', 
    alignItems: 'center', gap: 6 
  },
  matchText: { color: '#FFF', fontSize: 9, fontWeight: '900', letterSpacing: 0.5 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18 },
  titleBox: { flex: 1, marginRight: 10 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 5 },
  title: { fontSize: 19, fontWeight: '900', color: '#0F172A', letterSpacing: -0.5 },
  verifiedBadge: { backgroundColor: '#EFF6FF', padding: 4, borderRadius: 8 },
  locRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  locText: { fontSize: 13, color: '#64748B', fontWeight: '600' },
  dot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#CBD5E1' },
  distanceText: { fontSize: 12, color: '#2563EB', fontWeight: '700' },
  salaryContainer: { alignItems: 'flex-end', justifyContent: 'center' },
  salaryValue: { fontSize: 20, fontWeight: '900', color: '#10B981' },
  salaryPeriod: { fontSize: 10, fontWeight: '700', color: '#94A3B8' },
  featuresRow: { flexDirection: 'row', gap: 10, marginBottom: 22 },
  featTag: { 
    flexDirection: 'row', alignItems: 'center', gap: 6, 
    backgroundColor: '#F8FAFC', paddingHorizontal: 12, paddingVertical: 8, 
    borderRadius: 12, borderWidth: 1, borderColor: '#F1F5F9' 
  },
  featText: { fontSize: 10, fontWeight: '900', color: '#475569', letterSpacing: 0.5 },
  actionSection: { flexDirection: 'row', gap: 12 },
  callButton: { 
    flex: 1, height: 56, borderRadius: 18, 
    backgroundColor: '#F1F5F9', flexDirection: 'row', 
    justifyContent: 'center', alignItems: 'center', gap: 10 
  },
  callText: { fontSize: 13, fontWeight: '900', color: '#475569', letterSpacing: 1 },
  waButton: { flex: 1.6, height: 56, borderRadius: 18, overflow: 'hidden' },
  waInner: { width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  waText: { fontSize: 13, fontWeight: '900', color: '#FFF', letterSpacing: 1 },
});

export default JobCard;
