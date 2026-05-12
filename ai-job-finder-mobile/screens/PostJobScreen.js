import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { Briefcase, MapPin, IndianRupee, FileText, ChevronRight, CheckCircle2, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const PostJobScreen = () => {
  const [step, setStep] = useState(1);
  const [jobData, setJobData] = useState({ title: '', category: '', salary: '', location: '', description: '' });

  const categories = ['Driver', 'Electrician', 'Delivery', 'Shop Help', 'Plumber', 'Construction'];

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>What role are you{'\n'}hiring for?</Text>
      <View style={styles.catGrid}>
        {categories.map((cat) => (
          <TouchableOpacity 
            key={cat} 
            onPress={() => { setJobData({...jobData, category: cat}); setStep(2); }}
            style={[styles.catTile, jobData.category === cat && styles.catTileActive]}
          >
            <View style={[styles.catIconBox, jobData.category === cat && styles.catIconBoxActive]}>
              <Briefcase size={24} color={jobData.category === cat ? '#FFF' : '#2563EB'} />
            </View>
            <Text style={[styles.catTileText, jobData.category === cat && styles.catTileTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Job Details & Pay</Text>
      
      <View style={styles.inputGroup}>
        <View style={styles.inputIcon}><Briefcase size={20} color="#94A3B8" /></View>
        <TextInput 
          style={styles.input}
          placeholder="Job Title (e.g. Senior Driver)"
          value={jobData.title}
          onChangeText={(t) => setJobData({...jobData, title: t})}
        />
      </View>

      <View style={styles.inputGroup}>
        <View style={styles.inputIcon}><IndianRupee size={20} color="#94A3B8" /></View>
        <TextInput 
          style={styles.input}
          placeholder="Salary (e.g. 15000/month)"
          value={jobData.salary}
          onChangeText={(t) => setJobData({...jobData, salary: t})}
        />
      </View>

      <View style={styles.inputGroup}>
        <View style={styles.inputIcon}><MapPin size={20} color="#94A3B8" /></View>
        <TextInput 
          style={styles.input}
          placeholder="Location (e.g. T-Nagar, Chennai)"
          value={jobData.location}
          onChangeText={(t) => setJobData({...jobData, location: t})}
        />
      </View>

      <TouchableOpacity style={styles.aiGenBtn}>
        <Sparkles size={16} color="#2563EB" />
        <Text style={styles.aiGenBtnText}>AI GENERATE DESCRIPTION</Text>
      </TouchableOpacity>

      <View style={[styles.inputGroup, styles.textAreaBox]}>
        <TextInput 
          style={[styles.input, styles.textArea]}
          placeholder="Describe the job requirements..."
          multiline
          numberOfLines={4}
          value={jobData.description}
          onChangeText={(t) => setJobData({...jobData, description: t})}
        />
      </View>

      <TouchableOpacity style={styles.mainBtn} onPress={() => setStep(3)}>
        <LinearGradient colors={['#2563EB', '#1D4ED8']} style={styles.btnInner}>
          <Text style={styles.btnText}>POST JOB NOW</Text>
          <CheckCircle2 size={20} color="#FFF" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.successContainer}>
      <View style={styles.successIconBox}>
        <CheckCircle2 size={80} color="#22C55E" />
      </View>
      <Text style={styles.successTitle}>Job Posted Successfully!</Text>
      <Text style={styles.successSub}>Your job for "{jobData.title}" is now live and being shown to nearby workers.</Text>
      
      <TouchableOpacity style={styles.secondaryBtn} onPress={() => setStep(1)}>
        <Text style={styles.secondaryBtnText}>DONE</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Post a Job</Text>
        <View style={styles.stepIndicator}>
          {[1, 2, 3].map((s) => (
            <View key={s} style={[styles.indicatorDot, step >= s && styles.indicatorActive]} />
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 25, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  headerTitle: { fontSize: 24, fontWeight: '900', color: '#1E293B' },
  stepIndicator: { flexDirection: 'row', gap: 6 },
  indicatorDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#E2E8F0' },
  indicatorActive: { width: 20, backgroundColor: '#2563EB' },
  scrollContent: { padding: 25 },
  stepContainer: { flex: 1 },
  stepTitle: { fontSize: 32, fontWeight: '900', color: '#1E293B', lineHeight: 42, marginBottom: 40 },
  catGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 15 },
  catTile: { width: (width - 65) / 2, backgroundColor: '#F8FAFC', padding: 20, borderRadius: 24, borderWidth: 1, borderColor: '#F1F5F9' },
  catTileActive: { backgroundColor: '#EFF6FF', borderColor: '#2563EB' },
  catIconBox: { width: 48, height: 48, borderRadius: 16, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
  catIconBoxActive: { backgroundColor: '#2563EB' },
  catTileText: { fontSize: 14, fontWeight: '800', color: '#475569' },
  catTileTextActive: { color: '#2563EB' },
  inputGroup: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', borderRadius: 18, paddingHorizontal: 15, height: 60, marginBottom: 20, borderWidth: 1, borderColor: '#F1F5F9' },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 16, fontWeight: '600', color: '#1E293B' },
  aiGenBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20, alignSelf: 'flex-start' },
  aiGenBtnText: { fontSize: 10, fontWeight: '900', color: '#2563EB', letterSpacing: 1 },
  textAreaBox: { height: 120, alignItems: 'flex-start', paddingTop: 15 },
  textArea: { textAlignVertical: 'top' },
  mainBtn: { height: 70, borderRadius: 35, overflow: 'hidden', marginTop: 20, shadowColor: '#2563EB', shadowOpacity: 0.2, shadowRadius: 20, elevation: 10 },
  btnInner: { width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: '900', letterSpacing: 1 },
  successContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 60 },
  successIconBox: { width: 140, height: 140, borderRadius: 70, backgroundColor: '#F0FDF4', justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
  successTitle: { fontSize: 24, fontWeight: '900', color: '#1E293B', textAlign: 'center', marginBottom: 12 },
  successSub: { fontSize: 16, color: '#64748B', textAlign: 'center', lineHeight: 24, marginBottom: 40 },
  secondaryBtn: { padding: 20 },
  secondaryBtnText: { fontSize: 16, fontWeight: '900', color: '#2563EB' },
});

export default PostJobScreen;
