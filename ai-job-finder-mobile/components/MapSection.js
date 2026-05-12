import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MapSection = () => {
  return (
    <View style={styles.webMapPlaceholder}>
      <Text style={styles.webMapText}>📍 Map View (Native Only)</Text>
      <Text style={styles.webMapSubtext}>View on your phone to see local markers</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  webMapPlaceholder: {
    flex: 1,
    backgroundColor: '#EAEBFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  webMapText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E5BFF',
    marginBottom: 5,
  },
  webMapSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default MapSection;
