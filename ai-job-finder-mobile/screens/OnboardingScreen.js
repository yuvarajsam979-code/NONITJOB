import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight, ShieldCheck, Sparkles, MapPin } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const slides = [
  {
    title: "AI Job Discovery",
    description: "Get hyper-local job matches near your home using our smart AI engine.",
    icon: <Sparkles size={80} color="#2563EB" />,
    color: "#2563EB"
  },
  {
    title: "Safe & Verified",
    description: "Connect directly with verified employers via WhatsApp or Phone.",
    icon: <ShieldCheck size={80} color="#22C55E" />,
    color: "#22C55E"
  },
  {
    title: "Nearby Map",
    description: "See jobs exactly where they are on our interactive trade-specific map.",
    icon: <MapPin size={80} color="#8B5CF6" />,
    color: "#8B5CF6"
  }
];

const OnboardingScreen = ({ onFinish }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const fadeAnim = new Animated.Value(1);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onFinish();
    }
  };

  const slide = slides[currentSlide];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={[styles.iconBox, { opacity: fadeAnim }]}>
          {slide.icon}
        </Animated.View>
        
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.dotRow}>
          {slides.map((_, i) => (
            <View 
              key={i} 
              style={[styles.dot, currentSlide === i && styles.activeDot, { backgroundColor: currentSlide === i ? slide.color : '#E2E8F0' }]} 
            />
          ))}
        </View>

        <TouchableOpacity style={styles.btn} onPress={handleNext}>
          <LinearGradient colors={[slide.color, slide.color + 'CC']} style={styles.btnGradient}>
            <Text style={styles.btnText}>{currentSlide === slides.length - 1 ? 'GET STARTED' : 'NEXT'}</Text>
            <ChevronRight size={20} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  iconBox: { 
    width: 200, height: 200, borderRadius: 100, backgroundColor: '#F8FAFC', 
    justifyContent: 'center', alignItems: 'center', marginBottom: 50,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 20, elevation: 10
  },
  title: { fontSize: 32, fontWeight: '900', color: '#1E293B', textAlign: 'center', marginBottom: 20 },
  description: { fontSize: 18, color: '#64748B', textAlign: 'center', lineHeight: 28, fontWeight: '500' },
  footer: { padding: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dotRow: { flexDirection: 'row', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#E2E8F0' },
  activeDot: { width: 24 },
  btn: { width: 180, height: 60, borderRadius: 30, overflow: 'hidden', shadowColor: '#2563EB', shadowOpacity: 0.2, shadowRadius: 15, elevation: 8 },
  btnGradient: { width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  btnText: { color: '#FFF', fontSize: 15, fontWeight: '900', letterSpacing: 1 },
});

export default OnboardingScreen;
