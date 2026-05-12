import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Linking } from 'react-native';
import MapView from 'react-native-maps';
import { MapPin, Car, Zap, Package, ShieldCheck, Home } from 'lucide-react-native';
import AnimatedMarker from './AnimatedMarker';

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
        {jobs.map((job, i) => (
          <AnimatedMarker 
            key={job._id || i} 
            job={job} 
            index={i} 
            config={getCategoryConfig(job.category)} 
            onJobPress={onJobPress}
            onWhatsApp={handleWhatsApp}
            pulseAnim={pulseAnim}
            opacityAnim={opacityAnim}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
});

export default MapSection;
