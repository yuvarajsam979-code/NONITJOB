import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Phone, MessageCircle } from 'lucide-react-native';

const JobCard = ({ job }) => {
  const handleCall = () => {
    Linking.openURL(`tel:${job.employer.contact}`);
  };

  const handleWhatsApp = () => {
    const message = `Hello, I saw your job posting for ${job.title} on AI Job Finder. I am interested.`;
    Linking.openURL(`whatsapp://send?phone=${job.employer.contact}&text=${message}`);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.salary}>{job.salary || 'Contact for Salary'}</Text>
      </View>
      
      <Text style={styles.category}>{job.category}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {job.description}
      </Text>
      
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.button, styles.callBtn]} onPress={handleCall}>
          <Phone size={20} color="#FFF" />
          <Text style={styles.buttonText}>Call</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.waBtn]} onPress={handleWhatsApp}>
          <MessageCircle size={20} color="#FFF" />
          <Text style={styles.buttonText}>WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  salary: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E5BFF',
  },
  category: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  description: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  callBtn: {
    backgroundColor: '#2E5BFF',
  },
  waBtn: {
    backgroundColor: '#25D366',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default JobCard;
