import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { Send, X, Sparkles, User, Mic } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AIChatScreen = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Namaste! I am your Rozgar AI Assistant. How can I help you find work today?", isAI: true }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef();

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = { id: Date.now(), text: input, isAI: false };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Mock AI Response
    setTimeout(() => {
      const aiMsg = { 
        id: Date.now() + 1, 
        text: "I found 3 Driver jobs in your area with daily payments. Would you like to see them?", 
        isAI: true 
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View style={styles.overlay}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.aiIconBox}>
              <Sparkles size={20} color="#FFF" />
            </View>
            <View>
              <Text style={styles.headerTitle}>Rozgar AI</Text>
              <Text style={styles.headerStatus}>Online & Ready</Text>
            </View>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <X size={24} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Chat Area */}
        <ScrollView 
          ref={scrollRef}
          style={styles.chatArea} 
          contentContainerStyle={styles.chatContent}
        >
          {messages.map((msg) => (
            <View key={msg.id} style={[styles.messageRow, msg.isAI ? styles.aiRow : styles.userRow]}>
              {msg.isAI && (
                <View style={styles.msgAvatar}>
                  <Sparkles size={14} color="#2563EB" />
                </View>
              )}
              <View style={[styles.bubble, msg.isAI ? styles.aiBubble : styles.userBubble]}>
                <Text style={[styles.msgText, msg.isAI ? styles.aiText : styles.userText]}>
                  {msg.text}
                </Text>
              </View>
              {!msg.isAI && (
                <View style={[styles.msgAvatar, styles.userAvatar]}>
                  <User size={14} color="#FFF" />
                </View>
              )}
            </View>
          ))}
        </ScrollView>

        {/* Input Area */}
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <View style={styles.inputSection}>
            <View style={styles.inputBox}>
              <TextInput 
                style={styles.input}
                placeholder="Ask me anything..."
                value={input}
                onChangeText={setInput}
                placeholderTextColor="#94A3B8"
              />
              <TouchableOpacity style={styles.micBtn}>
                <Mic size={20} color="#64748B" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleSend} style={styles.sendBtn}>
              <LinearGradient colors={['#2563EB', '#1D4ED8']} style={styles.sendBtnInner}>
                <Send size={20} color="#FFF" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#FFF', zIndex: 3000 },
  container: { flex: 1 },
  header: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
    paddingHorizontal: 20, height: 70, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' 
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  aiIconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#2563EB', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#1E293B' },
  headerStatus: { fontSize: 11, color: '#22C55E', fontWeight: '700' },
  closeBtn: { padding: 5 },
  chatArea: { flex: 1, backgroundColor: '#F8FAFC' },
  chatContent: { padding: 20, gap: 20 },
  messageRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 10, maxWidth: '85%' },
  aiRow: { alignSelf: 'flex-start' },
  userRow: { alignSelf: 'flex-end' },
  msgAvatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#EFF6FF', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#DBEAFE' },
  userAvatar: { backgroundColor: '#1E293B', borderColor: '#1E293B' },
  bubble: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 20 },
  aiBubble: { backgroundColor: '#FFF', borderBottomLeftRadius: 4, borderTopLeftRadius: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  userBubble: { backgroundColor: '#2563EB', borderBottomRightRadius: 4, borderTopRightRadius: 20 },
  msgText: { fontSize: 15, lineHeight: 22 },
  aiText: { color: '#1E293B', fontWeight: '500' },
  userText: { color: '#FFF', fontWeight: '500' },
  inputSection: { 
    flexDirection: 'row', padding: 20, gap: 12, backgroundColor: '#FFF', 
    borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingBottom: Platform.OS === 'ios' ? 40 : 20 
  },
  inputBox: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', borderRadius: 20, paddingHorizontal: 15, height: 56 },
  input: { flex: 1, fontSize: 16, color: '#1E293B', fontWeight: '600' },
  micBtn: { padding: 5 },
  sendBtn: { width: 56, height: 56, borderRadius: 20, overflow: 'hidden' },
  sendBtnInner: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' },
});

export default AIChatScreen;
