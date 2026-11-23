import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
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

export default function VerifyEmailScreen() {
  const params = useLocalSearchParams<{ email?: string }>();
  const email = typeof params.email === 'string' ? params.email : '';

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [now, setNow] = useState(() => Date.now());
  const [expiresAt, setExpiresAt] = useState(
    () => Date.now() + 5 * 60 * 1000,
  );
  const [resendAt, setResendAt] = useState(
    () => Date.now() + 30 * 1000,
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const secondsRemaining = Math.max(
    0,
    Math.ceil((expiresAt - now) / 1000),
  );

  const resendSeconds = Math.max(
    0,
    Math.ceil((resendAt - now) / 1000),
  );

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = String(secondsRemaining % 60).padStart(2, '0');

  const [emailName, emailDomain] = email.split('@');
  const maskedEmail = emailDomain
    ? `${emailName.slice(0, 2)}••@${emailDomain}`
    : 'your corporate email';

  function verifyCode() {
    if (Date.now() >= expiresAt) {
      setError('This code has expired. Please request a new code.');
      return;
    }

    if (code.length !== 6) {
      setError('Please enter all six digits.');
      return;
    }

    // Frontend demonstration only. Replace with an API call later.
    if (code !== '123456') {
      setError('Invalid code. Please try again.');
      return;
    }

    setError('');

    Alert.alert(
      'Demo completed',
      'The verification screen works. Real account verification will be connected to the backend.',
      [
        {
          text: 'Back to login',
          onPress: () => router.replace('/'),
        },
      ],
    );
  }

  function resendCode() {
    const currentTime = Date.now();

    if (currentTime < resendAt) {
      return;
    }

    setNow(currentTime);
    setExpiresAt(currentTime + 5 * 60 * 1000);
    setResendAt(currentTime + 30 * 1000);
    setCode('');
    setError('');

    Alert.alert(
      'Demo code reset',
      'Use 123456 again. Email delivery will be added with the backend.',
    );
  }

  function changeEmail() {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/register');
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <View pointerEvents="none" style={styles.topCircle} />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.safeArea}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.cardArea}>
              <View style={styles.card}>
                <View
                  style={[
                    styles.iconCircle,
                    Boolean(error) && styles.errorCircle,
                  ]}
                >
                  <Text style={styles.icon}>
                    {error ? '!' : '✉'}
                  </Text>
                </View>

                <Text style={styles.title}>
                  {error ? "Let's try that again" : 'Check your email'}
                </Text>

                <Text style={styles.subtitle}>
                  {error
                    ? 'Check your code and try again.'
                    : 'Enter the six-digit verification code for'}
                </Text>

                <Text style={styles.email}>{maskedEmail}</Text>

                <TextInput
                  style={[
                    styles.codeInput,
                    Boolean(error) && styles.invalidInput,
                  ]}
                  accessibilityLabel="Six-digit verification code"
                  placeholder="000000"
                  placeholderTextColor="#A4B7AE"
                  value={code}
                  onChangeText={(value) => {
                    setCode(value.replace(/\D/g, '').slice(0, 6));
                    setError('');
                  }}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  autoComplete="one-time-code"
                  maxLength={6}
                  autoCorrect={false}
                  selectionColor="#006052"
                />

                {error ? (
                  <Text
                    style={styles.errorText}
                    accessibilityRole="alert"
                    accessibilityLiveRegion="polite"
                  >
                    {error}
                  </Text>
                ) : null}

                <Text style={styles.subtitle}>Code expires in</Text>

                <View style={styles.timerBadge}>
                  <Text style={styles.timerText}>
                    {secondsRemaining > 0
                      ? `${minutes}:${seconds} remaining`
                      : 'Code expired'}
                  </Text>
                </View>

                <Pressable
                  accessibilityRole="button"
                  onPress={verifyCode}
                  style={({ pressed }) => [
                    styles.button,
                    pressed && styles.pressed,
                  ]}
                >
                  <LinearGradient
                    colors={['#00443E', '#006052', '#8CF000']}
                    locations={[0, 0.65, 1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradient}
                  >
                    <Text style={styles.buttonText}>
                      {error ? 'Try Again' : 'Verify Email'} →
                    </Text>
                  </LinearGradient>
                </Pressable>

                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{
                    disabled: resendSeconds > 0,
                  }}
                  disabled={resendSeconds > 0}
                  onPress={resendCode}
                  style={styles.resendButton}
                >
                  <Text style={styles.link}>
                    {resendSeconds > 0
                      ? `Resend in 0:${String(resendSeconds).padStart(2, '0')}`
                      : 'Resend verification code'}
                  </Text>
                </Pressable>

                <Text style={styles.demoNote}>
                  Frontend preview · Demo code 123456
                </Text>
              </View>
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={changeEmail}
              style={styles.changeEmail}
            >
              <Text style={styles.link}>Change email address</Text>
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
  safeArea: {
    flex: 1,
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
  content: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingVertical: 20,
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
    paddingVertical: 32,
    shadowColor: '#00443E',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 5,
  },
  iconCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#E7F5EF',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  errorCircle: {
    backgroundColor: '#FFF0EB',
  },
  icon: {
    fontSize: 38,
    fontWeight: '700',
    color: '#006052',
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#00443E',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: '#6A8078',
    textAlign: 'center',
    marginTop: 12,
  },
  email: {
    fontSize: 15,
    fontWeight: '600',
    color: '#006052',
    textAlign: 'center',
    marginTop: 6,
  },
  codeInput: {
    height: 60,
    borderWidth: 1.5,
    borderColor: '#006052',
    borderRadius: 12,
    fontSize: 26,
    letterSpacing: 8,
    textAlign: 'center',
    color: '#00443E',
    paddingHorizontal: 12,
    marginTop: 30,
    marginBottom: 10,
  },
  invalidInput: {
    borderColor: '#FF684D',
  },
  errorText: {
    color: '#B83A27',
    backgroundColor: '#FFF0EB',
    borderRadius: 10,
    padding: 10,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 8,
  },
  timerBadge: {
    alignSelf: 'center',
    backgroundColor: '#E7F5EF',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 9,
    marginTop: 6,
  },
  timerText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#006052',
  },
  button: {
    marginTop: 24,
    borderRadius: 14,
    overflow: 'hidden',
  },
  gradient: {
    minHeight: 54,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  pressed: {
    opacity: 0.8,
  },
  resendButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  link: {
    fontSize: 14,
    fontWeight: '600',
    color: '#006052',
    textAlign: 'center',
  },
  demoNote: {
    fontSize: 11,
    color: '#6A8078',
    textAlign: 'center',
    marginTop: 12,
  },
  changeEmail: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});