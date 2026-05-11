import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import JobCard from './components/JobCard';
import VoiceButton from './components/VoiceButton';

const MOCK_JOBS = [
  {
    id: '1',
    title: 'Delivery Boy',
    category: 'Logistics',
    salary: '₹15,000/month',
    description: 'Looking for an active delivery person for local area deliveries.',
    location: { lat: 13.0827, lng: 80.2707, address: 'T-Nagar, Chennai' },
    employer: { contact: '9876543210' }
  },
  {
    id: '2',
    title: 'Electrician',
    category: 'Technical',
    salary: '₹800/day',
    description: 'Need an electrician for a commercial building project.',
    location: { lat: 13.0405, lng: 80.2337, address: 'Anna Nagar, Chennai' },
    employer: { contact: '9123456789' }
  }
];

export default function App() {
  const [location, setLocation] = useState(null);
  const [language, setLanguage] = useState('EN');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.langToggle}>
          {['EN', 'हिन्दी', 'தமிழ்'].map((lang) => (
            <TouchableOpacity 
              key={lang} 
              onPress={() => setLanguage(lang)}
              style={[styles.langBtn, language === lang && styles.activeLang]}
            >
              <Text style={[styles.langText, language === lang && styles.activeLangText]}>{lang}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.greeting}>Find work nearby today</Text>
      </View>

      {/* Map Section */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 13.0827,
            longitude: 80.2707,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          showsUserLocation={true}
        >
          {MOCK_JOBS.map((job) => (
            <Marker
              key={job.id}
              coordinate={{ latitude: job.location.lat, longitude: job.location.lng }}
              title={job.title}
              description={job.salary}
            />
          ))}
        </MapView>
      </View>

      {/* Job List Section */}
      <ScrollView style={styles.jobList} contentContainerStyle={styles.scrollPadding}>
        <Text style={styles.sectionTitle}>Nearby Jobs</Text>
        {MOCK_JOBS.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </ScrollView>

      {/* AI Voice Search FAB */}
      <VoiceButton onPress={() => alert('AI Voice Search: Listening...')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFF',
  },
  langToggle: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  langBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  activeLang: {
    backgroundColor: '#2E5BFF',
  },
  langText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  activeLangText: {
    color: '#FFF',
  },
  greeting: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  mapContainer: {
    height: 250,
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  jobList: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  scrollPadding: {
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
});
