import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, RefreshControl } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import JobCard from './components/JobCard';
import VoiceButton from './components/VoiceButton';
import LoginScreen from './screens/LoginScreen';
import OTPScreen from './screens/OTPScreen';

const API_URL = 'http://localhost:5001/api/jobs'; // Update to your local IP if testing on a real device

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [location, setLocation] = useState(null);
  const [language, setLanguage] = useState('EN');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('LOGIN');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchJobs();
    }
  }, [isAuthenticated]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleLogin = (phone) => {
    setPhoneNumber(phone);
    setCurrentScreen('OTP');
  };

  const handleVerify = (otp) => {
    // Demo verification logic
    if (otp === '123456') {
      setIsAuthenticated(true);
      setCurrentScreen('HOME');
    } else {
      alert('Invalid OTP. Use 123456 for demo.');
    }
  };

  if (!isAuthenticated && currentScreen === 'LOGIN') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (!isAuthenticated && currentScreen === 'OTP') {
    return <OTPScreen phoneNumber={phoneNumber} onVerify={handleVerify} />;
  }

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
          {jobs.map((job) => (
            <Marker
              key={job._id}
              coordinate={{ 
                latitude: job.location.coordinates[1], 
                longitude: job.location.coordinates[0] 
              }}
              title={job.title}
              description={job.salary}
            />
          ))}
        </MapView>
      </View>

      {/* Job List Section */}
      <ScrollView 
        style={styles.jobList} 
        contentContainerStyle={styles.scrollPadding}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchJobs} />
        }
      >
        <Text style={styles.sectionTitle}>
          {jobs.length > 0 ? 'Nearby Jobs' : 'Looking for jobs near you...'}
        </Text>
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
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
