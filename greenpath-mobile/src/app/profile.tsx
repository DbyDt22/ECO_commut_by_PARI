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

export default function ProfileScreen() {
  const [profile, setProfile] = useState({
    fullName: 'Alex Morgan',
    email: 'alex@company.com',
    phone: '',
    company: '',
  });

  const [draft, setDraft] = useState({ ...profile });
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');

  const initials = profile.fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  function startEditing() {
    setDraft({ ...profile });
    setError('');
    setEditing(true);
  }

  function saveProfile() {
    if (!draft.fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    setProfile({
      ...profile,
      fullName: draft.fullName.trim(),
      phone: draft.phone.trim(),
      company: draft.company.trim(),
    });

    setError('');
    setEditing(false);
  }

  function cancelEditing() {
    setError('');
    setEditing(false);
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      <View pointerEvents="none" style={styles.headerBackground}>
        <View style={styles.limeCircle} />
      </View>

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.safeArea}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.headingRow}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Back to sign in"
                hitSlop={12}
                onPress={() => router.replace('/')}
                style={styles.backButton}
              >
                <Text style={styles.backArrow}>‹</Text>
              </Pressable>

              <Text style={styles.heading}>My Profile</Text>

              <View style={styles.headingSpacer} />
            </View>

            <View style={styles.avatar}>
              <Text style={styles.initials}>{initials}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                {editing ? 'Edit Profile' : 'Your Profile'}
              </Text>

              <View style={styles.badge}>
                <Text style={styles.badgeText}>Demo profile</Text>
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Full Name</Text>

                {editing ? (
                  <TextInput
                    style={styles.input}
                    value={draft.fullName}
                    onChangeText={(fullName) => {
                      setDraft((current) => ({ ...current, fullName }));
                      setError('');
                    }}
                    placeholder="Your full name"
                    placeholderTextColor="#94A3B8"
                    autoCapitalize="words"
                    autoComplete="name"
                    accessibilityLabel="Full name"
                    maxLength={100}
                  />
                ) : (
                  <Text style={styles.value}>{profile.fullName}</Text>
                )}
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Corporate Email</Text>
                <Text style={styles.value}>{profile.email}</Text>

                {editing ? (
                  <Text style={styles.helper}>
                    Email changes will require verification.
                  </Text>
                ) : null}
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Phone Number</Text>

                {editing ? (
                  <TextInput
                    style={styles.input}
                    value={draft.phone}
                    onChangeText={(phone) =>
                      setDraft((current) => ({ ...current, phone }))
                    }
                    placeholder="+94 XX XXX XXXX"
                    placeholderTextColor="#94A3B8"
                    keyboardType="phone-pad"
                    autoComplete="tel"
                    accessibilityLabel="Phone number"
                    maxLength={25}
                  />
                ) : (
                  <Text style={styles.value}>
                    {profile.phone || 'Not added yet'}
                  </Text>
                )}
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Company</Text>

                {editing ? (
                  <TextInput
                    style={styles.input}
                    value={draft.company}
                    onChangeText={(company) =>
                      setDraft((current) => ({ ...current, company }))
                    }
                    placeholder="Your organization"
                    placeholderTextColor="#94A3B8"
                    autoCapitalize="words"
                    accessibilityLabel="Company"
                    maxLength={100}
                  />
                ) : (
                  <Text style={styles.value}>
                    {profile.company || 'Not added yet'}
                  </Text>
                )}
              </View>

              {error ? (
                <Text accessibilityRole="alert" style={styles.error}>
                  {error}
                </Text>
              ) : null}

              <Pressable
                accessibilityRole="button"
                onPress={editing ? saveProfile : startEditing}
                style={styles.primaryButton}
              >
                <LinearGradient
                  colors={['#00443E', '#006052', '#8CF000']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradient}
                >
                  <Text style={styles.buttonText}>
                    {editing ? 'Save Changes  ✓' : 'Edit Profile  →'}
                  </Text>
                </LinearGradient>
              </Pressable>

              {editing ? (
                <Pressable
                  accessibilityRole="button"
                  onPress={cancelEditing}
                  style={styles.cancelButton}
                >
                  <Text style={styles.linkText}>Cancel</Text>
                </Pressable>
              ) : null}

              <Text style={styles.previewNote}>
                Preview only. Changes are not saved to a database.
              </Text>
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={() => router.replace('/')}
              style={styles.exitButton}
            >
              <Text style={styles.linkText}>Back to sign in</Text>
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
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 290,
    backgroundColor: '#004F46',
    overflow: 'hidden',
  },
  limeCircle: {
    position: 'absolute',
    top: -70,
    right: -80,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#8CF000',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingBottom: 24,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  backButton: {
    width: 40,
    minHeight: 44,
    justifyContent: 'center',
  },
  backArrow: {
    color: '#FFFFFF',
    fontSize: 36,
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '700',
  },
  headingSpacer: {
    width: 40,
  },
  avatar: {
    alignSelf: 'center',
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 6,
    borderColor: '#FFFFFF',
    backgroundColor: '#E7F6F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    marginBottom: 22,
  },
  initials: {
    color: '#006052',
    fontSize: 32,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    shadowColor: '#00443E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 5,
  },
  cardTitle: {
    color: '#00443E',
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
  },
  badge: {
    alignSelf: 'center',
    backgroundColor: '#E7F6F1',
    borderRadius: 20,
    paddingHorizontal: 22,
    paddingVertical: 9,
    marginTop: 10,
    marginBottom: 8,
  },
  badgeText: {
    color: '#006052',
    fontSize: 12,
    fontWeight: '600',
  },
  field: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#D7E6DF',
  },
  label: {
    color: '#6B817A',
    fontSize: 13,
    marginBottom: 7,
  },
  value: {
    color: '#00443E',
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#BFD9CF',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#00443E',
  },
  helper: {
    color: '#6B817A',
    fontSize: 12,
    marginTop: 6,
  },
  error: {
    color: '#C53D28',
    fontSize: 13,
    marginTop: 14,
  },
  primaryButton: {
    marginTop: 24,
    borderRadius: 14,
    overflow: 'hidden',
  },
  gradient: {
    minHeight: 54,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  cancelButton: {
    alignSelf: 'center',
    padding: 12,
    marginTop: 8,
  },
  linkText: {
    color: '#006052',
    fontSize: 15,
    fontWeight: '600',
  },
  previewNote: {
    color: '#6B817A',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 16,
  },
  exitButton: {
    alignSelf: 'center',
    padding: 12,
    marginTop: 14,
  },
});