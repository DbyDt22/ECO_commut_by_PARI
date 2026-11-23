import { useState } from 'react';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleCreateAccount() {
    if (submitting) {
      return;
    }

    const cleanedName = fullName.trim();
    const cleanedEmail = email.trim().toLowerCase();

    if (
      !cleanedName ||
      !cleanedEmail ||
      !password ||
      !confirmPassword
    ) {
      setError('Please complete all fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanedEmail)) {
      setError('Please enter a valid corporate email address.');
      return;
    }

    if (password.length < 8) {
      setError('Password must contain at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    if (!apiUrl) {
      setError('The API address has not been configured.');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: cleanedName,
          email: cleanedEmail,
          password,
        }),
      });

      const data = (await response.json()) as {
        message?: string;
      };

      if (!response.ok) {
        setError(data.message || 'Unable to create your account.');
        return;
      }

      router.push({
        pathname: '/verify-email',
        params: {
          email: cleanedEmail,
          fullName: cleanedName,
        },
      });
    } catch (requestError) {
      console.error('Registration request failed:', requestError);

      setError(
        'Cannot connect to the backend. Check your Wi-Fi, API address and backend server.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  function updateFullName(value: string) {
    setFullName(value);
    setError('');
  }

  function updateEmail(value: string) {
    setEmail(value);
    setError('');
  }

  function updatePassword(value: string) {
    setPassword(value);
    setError('');
  }

  function updateConfirmPassword(value: string) {
    setConfirmPassword(value);
    setError('');
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      <View pointerEvents="none" style={styles.topCircle} />
      <View pointerEvents="none" style={styles.bottomCircle} />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardArea}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.cardArea}>
              <View style={styles.card}>
                <Text style={styles.title}>Join the movement</Text>

                <Text style={styles.subtitle}>
                  Create a greener commute together.
                </Text>

                <View style={styles.divider} />

                <Text style={styles.label}>Full Name</Text>

                <TextInput
                  style={styles.input}
                  accessibilityLabel="Full name"
                  placeholder="Your full name"
                  placeholderTextColor="#94A3B8"
                  value={fullName}
                  onChangeText={updateFullName}
                  autoCapitalize="words"
                  autoComplete="name"
                  editable={!submitting}
                />

                <Text style={styles.label}>Corporate Email</Text>

                <TextInput
                  style={styles.input}
                  accessibilityLabel="Corporate email"
                  placeholder="name@company.com"
                  placeholderTextColor="#94A3B8"
                  value={email}
                  onChangeText={updateEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  editable={!submitting}
                />

                <Text style={styles.label}>Password</Text>

                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    accessibilityLabel="Password"
                    placeholder="Create a password"
                    placeholderTextColor="#94A3B8"
                    value={password}
                    onChangeText={updatePassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="new-password"
                    editable={!submitting}
                  />

                  <Pressable
                    style={styles.visibilityButton}
                    accessibilityRole="button"
                    accessibilityLabel={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                    disabled={submitting}
                    onPress={() =>
                      setShowPassword((currentValue) => !currentValue)
                    }
                  >
                    <Text style={styles.smallLink}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Text>
                  </Pressable>
                </View>

                <Text style={styles.helperText}>
                  Use at least 8 characters.
                </Text>

                <Text style={styles.label}>Confirm Password</Text>

                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    accessibilityLabel="Confirm password"
                    placeholder="Re-enter your password"
                    placeholderTextColor="#94A3B8"
                    value={confirmPassword}
                    onChangeText={updateConfirmPassword}
                    secureTextEntry={!showConfirmation}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="new-password"
                    returnKeyType="done"
                    editable={!submitting}
                    onSubmitEditing={handleCreateAccount}
                  />

                  <Pressable
                    style={styles.visibilityButton}
                    accessibilityRole="button"
                    accessibilityLabel={
                      showConfirmation
                        ? 'Hide confirmation password'
                        : 'Show confirmation password'
                    }
                    disabled={submitting}
                    onPress={() =>
                      setShowConfirmation(
                        (currentValue) => !currentValue
                      )
                    }
                  >
                    <Text style={styles.smallLink}>
                      {showConfirmation ? 'Hide' : 'Show'}
                    </Text>
                  </Pressable>
                </View>

                {error ? (
                  <Text
                    style={styles.errorText}
                    accessibilityRole="alert"
                    accessibilityLiveRegion="polite"
                  >
                    {error}
                  </Text>
                ) : null}

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    Employee registration
                  </Text>
                </View>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Create account"
                  accessibilityState={{ disabled: submitting }}
                  onPress={handleCreateAccount}
                  disabled={submitting}
                  style={({ pressed }) => [
                    styles.button,
                    (pressed || submitting) &&
                      styles.pressedButton,
                  ]}
                >
                  <LinearGradient
                    colors={['#00443E', '#006052', '#8CF000']}
                    locations={[0, 0.65, 1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>
                      {submitting
                        ? 'Creating Account...'
                        : 'Create Account'}
                    </Text>

                    {!submitting ? (
                      <Text style={styles.buttonArrow}>→</Text>
                    ) : null}
                  </LinearGradient>
                </Pressable>
              </View>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Already have an account?
              </Text>

              <Pressable
                accessibilityRole="button"
                hitSlop={8}
                disabled={submitting}
                onPress={() => router.replace('/')}
              >
                <Text style={styles.footerLink}>Sign in</Text>
              </Pressable>
            </View>
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
    overflow: 'hidden',
  },
  topCircle: {
    position: 'absolute',
    width: 360,
    height: 360,
    borderRadius: 180,
    borderWidth: 32,
    borderColor: '#9AFF00',
    backgroundColor: '#00594E',
    top: -140,
    right: -190,
  },
  bottomCircle: {
    position: 'absolute',
    width: 340,
    height: 340,
    borderRadius: 170,
    backgroundColor: '#ECF7F2',
    bottom: -40,
    left: -170,
  },
  safeArea: {
    flex: 1,
  },
  keyboardArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 16,
  },
  cardArea: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingVertical: 30,
    shadowColor: '#00443E',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 29,
    fontWeight: '700',
    color: '#00443E',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: '#6A8078',
    textAlign: 'center',
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#D8E6DF',
    marginVertical: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1B302B',
    marginBottom: 8,
  },
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: '#D8E6DF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1B302B',
    marginBottom: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 52,
    borderWidth: 1,
    borderColor: '#D8E6DF',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  passwordInput: {
    flex: 1,
    minWidth: 0,
    fontSize: 16,
    color: '#1B302B',
    paddingVertical: 14,
  },
  visibilityButton: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  smallLink: {
    fontSize: 13,
    fontWeight: '600',
    color: '#006052',
  },
  helperText: {
    fontSize: 12,
    color: '#6A8078',
    marginTop: 6,
    marginBottom: 18,
  },
  errorText: {
    fontSize: 13,
    lineHeight: 19,
    color: '#B83A27',
    marginTop: 14,
  },
  badge: {
    backgroundColor: '#E7F5EF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 24,
    alignSelf: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#006052',
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
    borderRadius: 14,
    shadowColor: '#00443E',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 4,
  },
  pressedButton: {
    opacity: 0.8,
  },
  buttonGradient: {
    minHeight: 54,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  buttonArrow: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  footerText: {
    fontSize: 14,
    color: '#6A8078',
  },
  footerLink: {
    fontSize: 15,
    fontWeight: '700',
    color: '#006052',
  },
});