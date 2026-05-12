import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Animated, TouchableOpacity } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import { ChevronRight, MessageCircle, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedMarker = ({ job, index, config, onJobPress, onWhatsApp, opacityAnim, pulseAnim }) => {
  const enterAnim = useRef(new Animated.Value(0)).current;
  const IconComp = config.icon;

  useEffect(() => {
    Animated.spring(enterAnim, {
      toValue: 1,
      tension: 45,
      friction: 8,
      delay: index * 100,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <Marker
      coordinate={{
        latitude: job.location?.latitude || (13.08 + Math.random() * 0.05),
        longitude: job.location?.longitude || (80.27 + Math.random() * 0.05),
      }}
    >
      <View style={styles.container}>
        <Animated.View style={[
          styles.markerWrapper, 
          { transform: [{ scale: enterAnim }], opacity: enterAnim }
        ]}>
          {/* Sonar Ring */}
          <Animated.View style={[
            styles.sonarRing, 
            { backgroundColor: config.color, opacity: opacityAnim, transform: [{ scale: pulseAnim }] }
          ]} />
          {/* Main Marker */}
          <View style={[styles.markerCircle, { backgroundColor: config.color }]}>
            <IconComp size={10} color="#FFF" />
          </View>
        </Animated.View>
      </View>
      
      <Callout tooltip onPress={() => onJobPress && onJobPress(job)}>
        <View style={[styles.callout, { borderTopWidth: 4, borderTopColor: config.color }]}>
          <View style={styles.calloutHeader}>
            <View style={[styles.employerIcon, { backgroundColor: config.color + '15' }]}>
              <IconComp size={16} color={config.color} />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.calloutTitle} numberOfLines={1}>{job.title}</Text>
              <Text style={styles.calloutEmployer}>{job.employer?.name || 'Local Business'}</Text>
            </View>
          </View>

          <View style={styles.aiRow}>
            <Sparkles size={10} color={config.color} />
            <Text style={[styles.aiMatchText, { color: config.color }]}>98% AI MATCH</Text>
            <View style={styles.matchDot} />
            <Text style={styles.distText}>2.4 KM</Text>
          </View>
          
          <Text style={styles.calloutSalary}>{job.salary}</Text>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.waBtn} onPress={() => onWhatsApp(job)}>
              <MessageCircle size={16} color="#22C55E" />
            </TouchableOpacity>
            <View style={styles.applyBtn}>
              <LinearGradient colors={[config.color, config.color + 'CC']} style={styles.applyBtnInner}>
                <Text style={styles.applyBtnText}>VIEW & APPLY</Text>
                <ChevronRight size={10} color="#FFF" />
              </LinearGradient>
            </View>
          </View>
        </View>
      </Callout>
    </Marker>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  markerWrapper: { alignItems: 'center', justifyContent: 'center', width: 44, height: 44 },
  sonarRing: { position: 'absolute', width: 20, height: 20, borderRadius: 10 },
  markerCircle: { 
    padding: 8, borderRadius: 20, 
    borderWidth: 2, borderColor: '#FFF',
    shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 10, elevation: 12
  },
  callout: { 
    backgroundColor: '#FFF', padding: 18, borderRadius: 24, width: 220,
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 20,
    borderWidth: 1, borderColor: '#F1F5F9'
  },
  calloutHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  employerIcon: { width: 34, height: 34, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  headerText: { flex: 1 },
  calloutTitle: { fontSize: 14, fontWeight: '900', color: '#1E293B' },
  calloutEmployer: { fontSize: 10, fontWeight: '700', color: '#94A3B8' },
  aiRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  aiMatchText: { fontSize: 9, fontWeight: '900' },
  matchDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#CBD5E1' },
  distText: { fontSize: 9, fontWeight: '800', color: '#94A3B8' },
  calloutSalary: { fontSize: 16, fontWeight: '900', color: '#10B981', marginBottom: 15 },
  actionRow: { flexDirection: 'row', gap: 10 },
  waBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#F0FDF4', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#DCFCE7' },
  applyBtn: { flex: 1, height: 44, borderRadius: 12, overflow: 'hidden' },
  applyBtnInner: { width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6 },
  applyBtnText: { fontSize: 10, fontWeight: '900', color: '#FFF', letterSpacing: 0.5 },
});

export default AnimatedMarker;
