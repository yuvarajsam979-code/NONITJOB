import React from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { MapPin, ChevronRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const MapSection = ({ jobs = [], onJobPress }) => {
  const region = {
    latitude: 13.0827,
    longitude: 80.2707,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  const getMarkerColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'driver': return '#2563EB';
      case 'electrician': return '#8B5CF6';
      case 'delivery': return '#F59E0B';
      case 'maid': return '#EC4899';
      default: return '#64748B';
    }
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
                  <Text style={styles.calloutCategory}>{job.category?.toUpperCase()}</Text>
                </View>
                <Text style={styles.calloutSalary}>{job.salary}</Text>
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
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5, elevation: 8
  },
  callout: { 
    backgroundColor: '#FFF', padding: 15, borderRadius: 20, width: 180,
    borderWidth: 1, borderColor: '#F1F5F9',
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 15
  },
  calloutHeader: { marginBottom: 8 },
  calloutTitle: { fontSize: 14, fontWeight: '900', color: '#1E293B' },
  calloutCategory: { fontSize: 8, fontWeight: '900', color: '#94A3B8', letterSpacing: 1, marginTop: 2 },
  calloutSalary: { fontSize: 15, fontWeight: '800', color: '#10B981', marginBottom: 10 },
  applyBtn: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', 
    backgroundColor: '#EFF6FF', paddingVertical: 8, borderRadius: 10, gap: 4 
  },
  applyBtnText: { fontSize: 9, fontWeight: '900', color: '#2563EB', letterSpacing: 0.5 },
});

export default MapSection;
