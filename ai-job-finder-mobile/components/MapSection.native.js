import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet } from 'react-native';

const MapSection = ({ jobs }) => {
  return (
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
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default MapSection;
