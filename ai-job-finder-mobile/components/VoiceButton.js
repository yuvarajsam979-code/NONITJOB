import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Mic } from 'lucide-react-native';

const VoiceButton = ({ onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={onPress}
    >
      <View style={styles.badge} />
      <Mic size={28} color="#FFF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 110,
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  badge: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563EB',
  }
});

export default VoiceButton;
