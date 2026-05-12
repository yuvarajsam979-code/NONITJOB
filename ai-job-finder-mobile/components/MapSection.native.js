import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Dimensions, Animated } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { MapPin, ChevronRight, Briefcase, Car, Zap, Package, ShieldCheck, Home, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const MapSection = ({ jobs = [], onJobPress }) => {
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(pulseAnim, { toValue: 3, duration: 2000, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const region = {
    latitude: 13.0827,
    longitude: 80.2707,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  const getCategoryConfig = (category) => {
    const cat = category?.toLowerCase() || '';
    if (cat.includes('driver')) return { color: '#2563EB', icon: Car };
    if (cat.includes('electrician')) return { color: '#8B5CF6', icon: Zap };
    if (cat.includes('delivery')) return { color: '#F59E0B', icon: Package };
    if (cat.includes('security')) return { color: '#1E293B', icon: ShieldCheck };
    if (cat.includes('maid')) return { color: '#EC4899', icon: Home };
    return { color: '#64748B', icon: MapPin };
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region}>
        {jobs.map((job) => {
          const config = getCategoryConfig(job.category);
          const IconComp = config.icon;
          
          return (
            <Marker
              key={job._id || Math.random()}
              coordinate={{
                latitude: job.location?.latitude || (13.08 + Math.random() * 0.05),
                longitude: job.location?.longitude || (80.27 + Math.random() * 0.05),
              }}
            >
              <View style={styles.markerWrapper}>
                {/* Sonar Ring */}
                <Animated.View style={[
                  styles.sonarRing, 
                  { 
                    backgroundColor: config.color,
                    opacity: opacityAnim,
                    transform: [{ scale: pulseAnim }] 
                  }
                ]} />
                {/* Main Marker */}
                <View style={[styles.markerCircle, { backgroundColor: config.color }]}>
                  <IconComp size={10} color="#FFF" />
                </View>
              </View>
              
              <Callout tooltip onPress={() => onJobPress && onJobPress(job)}>
                <View style={styles.callout}>
                  <View style={styles.aiHeader}>
                    <View style={styles.aiBadge}>
                      <Sparkles size={10} color="#2563EB" />
                      <Text style={styles.aiMatchText}>98% AI MATCH</Text>
                    </View>
                    <View style={styles.matchBarBase}>
                      <View style={styles.matchBarFill} />
                    </View>
                  </View>

                  <View style={styles.calloutBody}>
                    <Text style={styles.calloutTitle} numberOfLines={1}>{job.title}</Text>
                    <Text style={styles.calloutEmployer}>{job.employer?.name || 'Local Employer'}</Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <Text style={styles.calloutSalary}>{job.salary}</Text>
                    <Text style={styles.distText}>2.4 KM</Text>
                  </View>

                  <View style={styles.applyBtnBox}>
                    <LinearGradient colors={['#3B82F6', '#1E3A8A']} style={styles.applyBtnInner}>
                      <Text style={styles.applyBtnText}>VIEW & APPLY</Text>
                      <ChevronRight size={12} color="#FFF" />
                    </LinearGradient>
                  </View>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
  markerWrapper: { alignItems: 'center', justifyContent: 'center', width: 40, height: 40 },
  sonarRing: { position: 'absolute', width: 20, height: 20, borderRadius: 10 },
  markerCircle: { 
    padding: 8, borderRadius: 20, 
    borderWidth: 2, borderColor: '#FFF',
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5, elevation: 10
  },
  callout: { 
    backgroundColor: '#FFF', padding: 18, borderRadius: 28, width: 210,
    borderWidth: 1, borderColor: '#F1F5F9', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 15
  },
  aiHeader: { marginBottom: 12 },
  aiBadge: { 
    flexDirection: 'row', alignItems: 'center', gap: 4, 
    backgroundColor: '#F0F7FF', paddingHorizontal: 8, paddingVertical: 4, 
    borderRadius: 8, alignSelf: 'flex-start', marginBottom: 6 
  },
  aiMatchText: { fontSize: 8, fontWeight: '900', color: '#2563EB' },
  matchBarBase: { height: 3, backgroundColor: '#F1F5F9', borderRadius: 2, width: '100%' },
  matchBarFill: { height: '100%', backgroundColor: '#2563EB', borderRadius: 2, width: '90%' },
  calloutBody: { marginBottom: 12 },
  calloutTitle: { fontSize: 14, fontWeight: '900', color: '#1E293B', marginBottom: 2 },
  calloutEmployer: { fontSize: 10, fontWeight: '700', color: '#94A3B8' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  calloutSalary: { fontSize: 16, fontWeight: '900', color: '#10B981' },
  distText: { fontSize: 10, fontWeight: '800', color: '#CBD5E1' },
  applyBtnBox: { height: 48, borderRadius: 14, overflow: 'hidden' },
  applyBtnInner: { width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6 },
  applyBtnText: { fontSize: 10, fontWeight: '900', color: '#FFF', letterSpacing: 0.5 },
});

export default MapSection;
