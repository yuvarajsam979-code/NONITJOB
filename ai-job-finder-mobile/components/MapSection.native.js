import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { MapPin, ChevronRight, Briefcase, Car, Zap, Package, ShieldCheck, Home, UserCheck } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const MapSection = ({ jobs = [], onJobPress }) => {
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
    if (cat.includes('maid') || cat.includes('cleaner')) return { color: '#EC4899', icon: Home };
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
              <View style={[styles.markerCircle, { backgroundColor: config.color }]}>
                <IconComp size={12} color="#FFF" />
              </View>
              <Callout tooltip onPress={() => onJobPress && onJobPress(job)}>
                <View style={styles.callout}>
                  <View style={styles.calloutHeader}>
                    <View style={styles.titleRow}>
                      <Text style={styles.calloutTitle} numberOfLines={1}>{job.title}</Text>
                      <UserCheck size={12} color="#2563EB" />
                    </View>
                    <View style={styles.employerRow}>
                      <Briefcase size={10} color="#94A3B8" />
                      <Text style={styles.calloutEmployer}>{job.employer?.name || 'Local Business'}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <Text style={styles.calloutSalary}>{job.salary}</Text>
                    <View style={styles.distBadge}>
                      <Text style={styles.distText}>2.4 KM</Text>
                    </View>
                  </View>

                  <View style={styles.applyBtn}>
                    <Text style={styles.applyBtnText}>VIEW & APPLY</Text>
                    <ChevronRight size={10} color="#2563EB" />
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
  markerCircle: { 
    padding: 8, borderRadius: 20, 
    borderWidth: 2, borderColor: '#FFF',
    shadowColor: '#2563EB', shadowOpacity: 0.3, shadowRadius: 10, elevation: 12
  },
  callout: { 
    backgroundColor: '#FFF', padding: 16, borderRadius: 24, width: 200,
    borderWidth: 1, borderColor: '#F1F5F9',
    shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 25
  },
  calloutHeader: { marginBottom: 12 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 6, marginBottom: 2 },
  calloutTitle: { fontSize: 14, fontWeight: '900', color: '#0F172A', flex: 1 },
  employerRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  calloutEmployer: { fontSize: 10, fontWeight: '700', color: '#64748B' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  calloutSalary: { fontSize: 16, fontWeight: '900', color: '#10B981' },
  distBadge: { backgroundColor: '#F8FAFC', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 6, borderWidth: 1, borderColor: '#F1F5F9' },
  distText: { fontSize: 8, fontWeight: '900', color: '#94A3B8' },
  applyBtn: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', 
    backgroundColor: '#F0F7FF', paddingVertical: 10, borderRadius: 14, gap: 4 
  },
  applyBtnText: { fontSize: 10, fontWeight: '900', color: '#2563EB', letterSpacing: 0.5 },
});

export default MapSection;
