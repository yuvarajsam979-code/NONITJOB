import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { MapPin, ChevronRight, Briefcase } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const MapSection = ({ jobs = [], onJobPress }) => {
  const region = {
    latitude: 13.0827,
    longitude: 80.2707,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  const getMarkerColor = (category) => {
    const cat = category?.toLowerCase() || '';
    if (cat.includes('driver')) return '#2563EB';
    if (cat.includes('electrician') || cat.includes('plumber')) return '#8B5CF6';
    if (cat.includes('delivery')) return '#F59E0B';
    if (cat.includes('maid') || cat.includes('helper')) return '#EC4899';
    if (cat.includes('security')) return '#1E293B';
    if (cat.includes('painter')) return '#10B981';
    return '#64748B';
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region}>
        {jobs.map((job) => (
          <Marker
            key={job._id || Math.random()}
            coordinate={{
              latitude: job.location?.latitude || (13.08 + Math.random() * 0.05),
              longitude: job.location?.longitude || (80.27 + Math.random() * 0.05),
            }}
          >
            <View style={[styles.markerCircle, { backgroundColor: getMarkerColor(job.category) }]}>
              <MapPin size={12} color="#FFF" />
            </View>
            <Callout tooltip onPress={() => onJobPress && onJobPress(job)}>
              <View style={styles.callout}>
                <View style={styles.calloutHeader}>
                  <Text style={styles.calloutTitle} numberOfLines={1}>{job.title}</Text>
                  <View style={styles.employerRow}>
                    <Briefcase size={10} color="#94A3B8" />
                    <Text style={styles.calloutEmployer}>{job.employer?.name || 'Local Business'}</Text>
                  </View>
                </View>
                
                <View style={styles.infoRow}>
                  <Text style={styles.calloutSalary}>{job.salary}</Text>
                  <View style={styles.typeBadge}>
                    <Text style={styles.typeText}>FT</Text>
                  </View>
                </View>

                <View style={styles.applyBtn}>
                  <Text style={styles.applyBtnText}>VIEW & APPLY</Text>
                  <ChevronRight size={12} color="#2563EB" />
                </View>
              </View>
            </Callout>
          </Marker>
        ))}
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
    shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 8, elevation: 10
  },
  callout: { 
    backgroundColor: '#FFF', padding: 15, borderRadius: 24, width: 200,
    borderWidth: 1, borderColor: '#F1F5F9',
    shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 20
  },
  calloutHeader: { marginBottom: 10 },
  calloutTitle: { fontSize: 14, fontWeight: '900', color: '#1E293B', marginBottom: 2 },
  employerRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  calloutEmployer: { fontSize: 10, fontWeight: '700', color: '#94A3B8' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  calloutSalary: { fontSize: 15, fontWeight: '900', color: '#10B981' },
  typeBadge: { backgroundColor: '#F1F5F9', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  typeText: { fontSize: 8, fontWeight: '900', color: '#64748B' },
  applyBtn: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', 
    backgroundColor: '#EFF6FF', paddingVertical: 10, borderRadius: 12, gap: 4 
  },
  applyBtnText: { fontSize: 10, fontWeight: '900', color: '#2563EB', letterSpacing: 0.5 },
});

export default MapSection;
