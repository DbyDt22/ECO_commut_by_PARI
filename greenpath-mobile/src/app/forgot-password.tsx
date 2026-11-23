import { useState } from 'react';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function handleResetPassword() {
    const cleanedEmail = email.trim();

    if (!cleanedEmail) {
      setError('Please enter your corporate email address.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');

    Alert.alert(
      'Frontend preview',
      'Your email format is valid. No reset email has been sent yet. We will connect this button to the backend later.'
    );
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      <View pointerEvents="none" style={styles.decorativeCircle} />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.safeArea}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.card}>
              <View style={styles.iconCircle}>
                <Text style={styles.icon}>✉</Text>
              </View>

              <Text style={styles.title}>Forgot password?</Text>

              <Text style={styles.subtitle}>
                Enter your corporate email to request a password reset.
              </Text>

              <View style={styles.divider} />

              <Text style={styles.label}>Corporate Email</Text>

              <TextInput
                style={[
                  styles.input,
                  error ? styles.inputError : undefined,
                ]}
                value={email}
                onChangeText={(value) => {
                  setEmail(value);
                  setError('');
                }}
                placeholder="name@company.com"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                textContentType="emailAddress"
                accessibilityLabel="Corporate email address"
                returnKeyType="done"
                onSubmitEditing={handleResetPassword}
              />

              {error ? (
                <Text accessibilityRole="alert" style={styles.error}>
                  {error}
                </Text>
              ) : null}

              <Pressable
                accessibilityRole="button"
                onPress={handleResetPassword}
                style={styles.button}
              >
                <LinearGradient
                  colors={['#00443E', '#006052', '#8CF000']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradient}
                >
                  <Text style={styles.buttonText}>
                    Request Password Reset →
                  </Text>
                </LinearGradient>
              </Pressable>

              <Text style={styles.previewNote}>
                Frontend preview — email sending is not connected yet.
              </Text>
            </View>

            <Pressable
              accessibilityRole="button"
              hitSlop={8}
              onPress={() => {
                if (router.canGoBack()) {
                  router.back();
                } else {
                  router.replace('/');
                }
              }}
              style={styles.backButton}
            >
              <Text style={styles.backText}>← Back to sign in</Text>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F4FAF7',
  },
  safeArea: {
    flex: 1,
  },
  decorativeCircle: {
    position: 'absolute',
    top: -155,
    right: -165,
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: '#00594F',
    borderWidth: 28,
    borderColor: '#9AFF00',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 22,
    paddingVertical: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingVertical: 34,
    shadowColor: '#00443E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  iconCircle: {
    alignSelf: 'center',
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: '#E7F6F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  icon: {
    fontSize: 34,
    color: '#006052',
  },
  title: {
    color: '#00443E',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: '#6B817A',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#D7E6DF',
    marginVertical: 28,
  },
  label: {
    color: '#19352F',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    minHeight: 54,
    borderWidth: 1,
    borderColor: '#D7E6DF',
    borderRadius: 13,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: '#19352F',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#FF684D',
  },
  error: {
    color: '#C53D28',
    fontSize: 13,
    marginTop: 10,
  },
  button: {
    marginTop: 26,
    borderRadius: 14,
    overflow: 'hidden',
  },
  gradient: {
    minHeight: 54,
    paddingHorizontal: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  previewNote: {
    color: '#6B817A',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 18,
  },
  backButton: {
    alignSelf: 'center',
    marginTop: 30,
    padding: 10,
  },
  backText: {
    color: '#006052',
    fontSize: 15,
    fontWeight: '600',
  },
});