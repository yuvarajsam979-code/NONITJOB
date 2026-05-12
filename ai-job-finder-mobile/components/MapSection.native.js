import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Dimensions, Animated, Linking } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { MapPin, ChevronRight, Briefcase, Car, Zap, Package, ShieldCheck, Home, Sparkles, MessageCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const MapSection = ({ jobs = [], onJobPress }) => {
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0.5)).current;
  const entranceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sonar Pulse
    Animated.loop(
      Animated.parallel([
        Animated.timing(pulseAnim, { toValue: 3, duration: 2000, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ])
    ).start();

    // Staggered Entrance
    Animated.spring(entranceAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true
    }).start();
  }, []);

  const handleWhatsApp = (job) => {
    const phone = job.employer?.contact || '9876543210';
    Linking.openURL(`whatsapp://send?phone=91${phone}&text=Hi, I saw your job "${job.title}" on Rozgar AI.`);
  };

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
        {jobs.map((job, index) => {
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
              <Animated.View style={[
                styles.markerWrapper, 
                { 
                  transform: [{ scale: entranceAnim }],
                  opacity: entranceAnim 
                }
              ]}>
                <Animated.View style={[
                  styles.sonarRing, 
                  { 
                    backgroundColor: config.color,
                    opacity: opacityAnim,
                    transform: [{ scale: pulseAnim }] 
                  }
                ]} />
                <View style={[styles.markerCircle, { backgroundColor: config.color }]}>
                  <IconComp size={10} color="#FFF" />
                </View>
              </Animated.View>
              
              <Callout tooltip onPress={() => onJobPress && onJobPress(job)}>
                <View style={styles.callout}>
                  <View style={styles.calloutHeader}>
                    <View style={styles.employerIcon}>
                      <Text style={styles.employerInitial}>{job.employer?.name?.charAt(0) || 'R'}</Text>
                    </View>
                    <View style={styles.headerText}>
                      <Text style={styles.calloutTitle} numberOfLines={1}>{job.title}</Text>
                      <Text style={styles.calloutEmployer}>{job.employer?.name || 'Local Business'}</Text>
                    </View>
                  </View>

                  <View style={styles.aiRow}>
                    <Sparkles size={10} color="#2563EB" />
                    <Text style={styles.aiMatchText}>98% AI MATCH</Text>
                    <View style={styles.matchDot} />
                    <Text style={styles.distText}>2.4 KM</Text>
                  </View>
                  
                  <Text style={styles.calloutSalary}>{job.salary}</Text>

                  <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.waBtn} onPress={() => handleWhatsApp(job)}>
                      <MessageCircle size={16} color="#22C55E" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.applyBtn}>
                      <LinearGradient colors={['#2563EB', '#1D4ED8']} style={styles.applyBtnInner}>
                        <Text style={styles.applyBtnText}>VIEW & APPLY</Text>
                        <ChevronRight size={10} color="#FFF" />
                      </LinearGradient>
                    </TouchableOpacity>
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
    backgroundColor: '#FFF', padding: 18, borderRadius: 32, width: 220,
    borderWidth: 1, borderColor: '#F1F5F9', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 20
  },
  calloutHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  employerIcon: { width: 34, height: 34, borderRadius: 10, backgroundColor: '#F8FAFC', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#F1F5F9' },
  employerInitial: { fontSize: 14, fontWeight: '900', color: '#2563EB' },
  headerText: { flex: 1 },
  calloutTitle: { fontSize: 14, fontWeight: '900', color: '#1E293B' },
  calloutEmployer: { fontSize: 10, fontWeight: '700', color: '#94A3B8' },
  aiRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  aiMatchText: { fontSize: 9, fontWeight: '900', color: '#2563EB' },
  matchDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#CBD5E1' },
  distText: { fontSize: 9, fontWeight: '800', color: '#94A3B8' },
  calloutSalary: { fontSize: 16, fontWeight: '900', color: '#10B981', marginBottom: 15 },
  actionRow: { flexDirection: 'row', gap: 10 },
  waBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#F0FDF4', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#DCFCE7' },
  applyBtn: { flex: 1, height: 44, borderRadius: 12, overflow: 'hidden' },
  applyBtnInner: { width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6 },
  applyBtnText: { fontSize: 10, fontWeight: '900', color: '#FFF', letterSpacing: 0.5 },
});

export default MapSection;
