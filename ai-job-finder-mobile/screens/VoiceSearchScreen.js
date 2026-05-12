import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, Animated } from 'react-native';
import { Mic, X, Search, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const VoiceSearchScreen = ({ onClose, onSearchResult }) => {
  const [isListening, setIsListening] = useState(true);
  const [pulseAnim] = useState(new Animated.Value(1));
  const [transcript, setTranscript] = useState('Listening...');

  useEffect(() => {
    if (isListening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.5, duration: 1000, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
        ])
      ).start();

      // Mock transcription
      setTimeout(() => setTranscript('Searching for Driver jobs in Chennai...'), 2000);
      setTimeout(() => {
        setIsListening(false);
        onSearchResult('Driver');
      }, 4000);
    }
  }, [isListening]);

  return (
    <View style={styles.overlay}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <X size={28} color="#1E293B" />
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.aiBadge}>
            <Sparkles size={16} color="#2563EB" />
            <Text style={styles.aiBadgeText}>ROZGAR AI ASSISTANT</Text>
          </View>
          
          <Text style={styles.transcriptText}>{transcript}</Text>
          
          <View style={styles.micContainer}>
            <Animated.View style={[styles.pulseCircle, { transform: [{ scale: pulseAnim }] }]} />
            <LinearGradient
              colors={['#2563EB', '#1D4ED8']}
              style={styles.micCircle}
            >
              <Mic size={40} color="#FFF" />
            </LinearGradient>
          </View>
          
          <Text style={styles.hintText}>
            {isListening ? 'Speak naturally. Try saying "Driver jobs nearby"' : 'Found 12 matching jobs for you!'}
          </Text>
        </View>

        <View style={styles.suggestionBox}>
          <Text style={styles.suggestTitle}>Try saying:</Text>
          <View style={styles.suggestRow}>
            {['Electrician', 'Delivery', 'Part-time'].map((s, i) => (
              <TouchableOpacity key={i} style={styles.suggestItem}>
                <Text style={styles.suggestText}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.95)', zIndex: 1000 },
  container: { flex: 1, padding: 30 },
  closeBtn: { alignSelf: 'flex-end', padding: 10 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  aiBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#F1F5F9', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginBottom: 40 },
  aiBadgeText: { fontSize: 10, fontWeight: '900', color: '#2563EB', letterSpacing: 1 },
  transcriptText: { fontSize: 28, fontWeight: '900', color: '#1E293B', textAlign: 'center', marginBottom: 60, lineHeight: 38 },
  micContainer: { width: 200, height: 200, justifyContent: 'center', alignItems: 'center', marginBottom: 40 },
  pulseCircle: { position: 'absolute', width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(37,99,235,0.1)' },
  micCircle: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', shadowColor: '#2563EB', shadowOpacity: 0.3, shadowRadius: 20, elevation: 15 },
  hintText: { fontSize: 16, color: '#64748B', fontWeight: '500', textAlign: 'center' },
  suggestionBox: { paddingBottom: 40 },
  suggestTitle: { fontSize: 12, fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', marginBottom: 15, textAlign: 'center' },
  suggestRow: { flexDirection: 'row', justifyContent: 'center', gap: 10 },
  suggestItem: { backgroundColor: '#F8FAFC', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: '#F1F5F9' },
  suggestText: { fontSize: 14, fontWeight: '700', color: '#475569' },
});

export default VoiceSearchScreen;
