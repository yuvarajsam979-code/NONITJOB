import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Animated, TouchableOpacity } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import { ChevronRight, MessageCircle, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedMarker = ({ job, index, config, onJobPress, onWhatsApp, opacityAnim, pulseAnim }) => {
  const enterAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const IconComp = config.icon;

  useEffect(() => {
    // Entrance Animation
    Animated.spring(enterAnim, {
      toValue: 1,
      tension: 40,
      friction: 8,
      delay: index * 100,
      useNativeDriver: true
    }).start();

    // Initial Bounce
    setTimeout(() => {
      Animated.sequence([
        Animated.timing(bounceAnim, { toValue: -15, duration: 200, useNativeDriver: true }),
        Animated.spring(bounceAnim, { toValue: 0, friction: 3, tension: 40, useNativeDriver: true }),
      ]).start();
    }, index * 100 + 500);
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
          { 
            transform: [{ scale: enterAnim }, { translateY: bounceAnim }], 
            opacity: enterAnim 
          }
        ]}>
          {/* Sonar Glow Ring */}
          <Animated.View style={[
            styles.sonarRing, 
            { 
              backgroundColor: config.color, 
              opacity: opacityAnim, 
              transform: [{ scale: pulseAnim }] 
            }
          ]} />
          
          {/* Main Marker with Elevation */}
          <View style={[styles.markerCircle, { backgroundColor: config.color }]}>
            <IconComp size={10} color="#FFF" />
          </View>
        </Animated.View>
      </View>
      
      <Callout tooltip onPress={() => onJobPress && onJobPress(job)}>
        <View style={[
          styles.callout, 
          { 
            borderColor: config.color + '20',
            backgroundColor: '#FFF'
          }
        ]}>
          <View style={[styles.calloutAccent, { backgroundColor: config.color }]} />
          
          <View style={styles.calloutHeader}>
            <View style={[styles.employerIcon, { backgroundColor: config.color + '15' }]}>
              <IconComp size={16} color={config.color} />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.calloutTitle} numberOfLines={1}>{job.title}</Text>
              <Text style={styles.calloutEmployer}>{job.employer?.name || 'Local Employer'}</Text>
            </View>
          </View>

          <View style={styles.aiRow}>
            <LinearGradient 
              colors={[config.color + '15', config.color + '05']} 
              style={styles.aiBadge}
            >
              <Sparkles size={10} color={config.color} />
              <Text style={[styles.aiMatchText, { color: config.color }]}>98% AI MATCH</Text>
            </LinearGradient>
            <View style={styles.distBadge}>
              <Text style={styles.distText}>2.4 KM AWAY</Text>
            </View>
          </View>
          
          <View style={styles.salarySection}>
            <Text style={styles.calloutSalary}>{job.salary}</Text>
            <View style={styles.verifiedTag}>
              <Text style={styles.verifiedText}>VERIFIED</Text>
            </View>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.waBtn} onPress={() => onWhatsApp(job)}>
              <MessageCircle size={18} color="#22C55E" />
            </TouchableOpacity>
            <View style={styles.applyBtn}>
              <LinearGradient colors={[config.color, config.color + 'CC']} style={styles.applyBtnInner}>
                <Text style={styles.applyBtnText}>VIEW & APPLY</Text>
                <ChevronRight size={12} color="#FFF" />
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
  markerWrapper: { alignItems: 'center', justifyContent: 'center', width: 50, height: 50 },
  sonarRing: { position: 'absolute', width: 20, height: 20, borderRadius: 10 },
  markerCircle: { 
    padding: 10, borderRadius: 25, 
    borderWidth: 2, borderColor: '#FFF',
    shadowColor: '#000', shadowOpacity: 0.4, shadowRadius: 10, elevation: 15
  },
  callout: { 
    backgroundColor: '#FFF', padding: 20, borderRadius: 32, width: 230,
    shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 30,
    borderWidth: 1, overflow: 'hidden'
  },
  calloutAccent: { position: 'absolute', top: 0, left: 0, right: 0, height: 6, opacity: 0.8 },
  calloutHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 15 },
  employerIcon: { width: 38, height: 38, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  headerText: { flex: 1 },
  calloutTitle: { fontSize: 15, fontWeight: '900', color: '#0F172A' },
  calloutEmployer: { fontSize: 10, fontWeight: '700', color: '#94A3B8' },
  aiRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 15 },
  aiBadge: { 
    flexDirection: 'row', alignItems: 'center', gap: 4, 
    paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 
  },
  aiMatchText: { fontSize: 9, fontWeight: '900' },
  distBadge: { backgroundColor: '#F8FAFC', paddingHorizontal: 8, paddingVertical: 6, borderRadius: 10, borderWidth: 1, borderColor: '#F1F5F9' },
  distText: { fontSize: 8, fontWeight: '900', color: '#94A3B8' },
  salarySection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  calloutSalary: { fontSize: 18, fontWeight: '900', color: '#10B981' },
  verifiedTag: { backgroundColor: '#F0FDF4', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  verifiedText: { fontSize: 7, fontWeight: '900', color: '#10B981', letterSpacing: 1 },
  actionRow: { flexDirection: 'row', gap: 12 },
  waBtn: { width: 48, height: 48, borderRadius: 15, backgroundColor: '#F0FDF4', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#DCFCE7' },
  applyBtn: { flex: 1, height: 48, borderRadius: 15, overflow: 'hidden' },
  applyBtnInner: { width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  applyBtnText: { fontSize: 11, fontWeight: '900', color: '#FFF', letterSpacing: 0.5 },
});

export default AnimatedMarker;
