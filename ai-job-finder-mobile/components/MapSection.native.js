import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { MapPin } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const MapSection = ({ jobs = [] }) => {
  // Default region (Chennai)
  const region = {
    latitude: 13.0827,
    longitude: 80.2707,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
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
            <View style={styles.markerCircle}>
              <MapPin size={14} color="#FFF" />
            </View>
            <Callout tooltip>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{job.title}</Text>
                <Text style={styles.calloutSalary}>{job.salary}</Text>
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
    backgroundColor: '#2563EB', padding: 8, borderRadius: 20, 
    borderWidth: 2, borderColor: '#FFF',
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5, elevation: 5
  },
  callout: { 
    backgroundColor: '#FFF', padding: 12, borderRadius: 15, width: 150,
    borderWidth: 1, borderColor: '#E2E8F0', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10
  },
  calloutTitle: { fontSize: 14, fontWeight: '800', color: '#1E293B', marginBottom: 4 },
  calloutSalary: { fontSize: 12, fontWeight: '700', color: '#22C55E' },
});

export default MapSection;
