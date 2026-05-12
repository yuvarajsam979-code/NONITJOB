import React from 'react';
import { View, StyleSheet } from 'react-native';

const SkeletonCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.title} />
        <View style={styles.badge} />
      </View>
      <View style={styles.lineFull} />
      <View style={styles.lineShort} />
      <View style={styles.btnRow}>
        <View style={styles.btn} />
        <View style={styles.btn} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#F1F5F9', borderRadius: 24, padding: 20, marginBottom: 15, height: 160 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  title: { width: '50%', height: 20, backgroundColor: '#E2E8F0', borderRadius: 8 },
  badge: { width: '20%', height: 20, backgroundColor: '#E2E8F0', borderRadius: 8 },
  lineFull: { width: '100%', height: 12, backgroundColor: '#E2E8F0', borderRadius: 6, marginBottom: 8 },
  lineShort: { width: '70%', height: 12, backgroundColor: '#E2E8F0', borderRadius: 6, marginBottom: 20 },
  btnRow: { flexDirection: 'row', gap: 10 },
  btn: { flex: 1, height: 40, backgroundColor: '#E2E8F0', borderRadius: 12 },
});

export default SkeletonCard;
