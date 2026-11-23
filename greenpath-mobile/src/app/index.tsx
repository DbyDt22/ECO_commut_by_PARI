import { router } from 'expo-router';
import { useState } from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [error, setError] = useState('');

  function handleSignIn() {
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      setError('Please enter your email and password.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');

    Alert.alert(
      'Form ready',
      'Your inputs passed the basic checks. We will connect sign-in to the backend later.'
    );
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
                <Text style={styles.title}>Welcome back</Text>

                <Text style={styles.subtitle}>
                  Empowering your sustainable journey.
                </Text>

                <View style={styles.divider} />

                <Text style={styles.label}>Corporate Email</Text>

                <View
                  style={[
                    styles.inputContainer,
                    focusedField === 'email' && styles.focusedInput,
                  ]}
                >
                  <Text style={styles.inputIcon}>✉</Text>

                  <TextInput
                    style={styles.input}
                    accessibilityLabel="Corporate email"
                    placeholder="name@company.com"
                    placeholderTextColor="#94A3B8"
                    value={email}
                    onChangeText={(value) => {
                      setEmail(value);
                      setError('');
                    }}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="email"
                  />
                </View>

                <View style={styles.passwordHeading}>
                  <Text style={styles.label}>Password</Text>

                  <Pressable
                    accessibilityRole="button"
                    hitSlop={8}
                    onPress={() => router.push('/forgot-password')}
                  >
                    <Text style={styles.forgotPasswordText}>
                      Forgot password?
                    </Text>
                  </Pressable>
                </View>

                <View
                  style={[
                    styles.inputContainer,
                    focusedField === 'password' && styles.focusedInput,
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    accessibilityLabel="Password"
                    placeholder="Enter your password"
                    placeholderTextColor="#94A3B8"
                    value={password}
                    onChangeText={(value) => {
                      setPassword(value);
                      setError('');
                    }}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="current-password"
                    returnKeyType="go"
                    onSubmitEditing={handleSignIn}
                  />

                  <Pressable
                    style={styles.visibilityButton}
                    accessibilityRole="button"
                    accessibilityLabel={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                    onPress={() => setShowPassword((current) => !current)}
                  >
                    <Text style={styles.smallLink}>
                      {showPassword ? 'Hide' : 'Show'}
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

                <Pressable
                  accessibilityRole="button"
                  onPress={handleSignIn}
                  style={({ pressed }) => [
                    styles.button,
                    pressed && styles.pressedButton,
                  ]}
                >
                  <LinearGradient
                    colors={['#00443E', '#006052', '#8CF000']}
                    locations={[0, 0.65, 1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>Sign In</Text>
                    <Text style={styles.buttonArrow}>→</Text>
                  </LinearGradient>
                </Pressable>

                <Text style={styles.accessText}>
                  ♧ Secure Corporate Access
                </Text>
              </View>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>New commuter?</Text>

              <Pressable
                accessibilityRole="button"
                hitSlop={8}
                onPress={() => router.push('/register')}
              >
                <Text style={styles.footerLink}>Create account</Text>
              </Pressable>
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={() => router.push('/profile')}
              style={styles.profilePreviewButton}
            >
              <Text style={styles.profilePreviewText}>
                Preview profile (demo)
              </Text>
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
    paddingTop: 24,
    paddingBottom: 16,
  },
  cardArea: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 24,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 42,
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
    fontSize: 32,
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
    marginTop: 28,
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1B302B',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 52,
    borderWidth: 1,
    borderColor: '#D8E6DF',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  focusedInput: {
    borderColor: '#006052',
    backgroundColor: '#F8FCFA',
  },
  inputIcon: {
    fontSize: 20,
    color: '#006052',
    marginRight: 10,
  },
  input: {
    flex: 1,
    minWidth: 0,
    fontSize: 16,
    color: '#1B302B',
    paddingVertical: 14,
  },
  passwordHeading: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    marginTop: 26,
  },
  forgotPasswordText: {
    color: '#006052',
    fontSize: 13,
    fontWeight: '600',
  },
  smallLink: {
    fontSize: 13,
    fontWeight: '600',
    color: '#006052',
  },
  visibilityButton: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  errorText: {
    fontSize: 13,
    lineHeight: 19,
    color: '#B83A27',
    marginTop: 12,
  },
  button: {
    marginTop: 32,
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
  accessText: {
    fontSize: 13,
    color: '#61796F',
    textAlign: 'center',
    marginTop: 28,
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingTop: 16,
    paddingBottom: 8,
  },
  footerText: {
    fontSize: 15,
    color: '#6A8078',
  },
  footerLink: {
    fontSize: 15,
    fontWeight: '700',
    color: '#006052',
  },
  profilePreviewButton: {
    alignSelf: 'center',
    padding: 12,
    marginTop: 2,
  },
  profilePreviewText: {
    color: '#006052',
    fontSize: 13,
    fontWeight: '600',
  },
});