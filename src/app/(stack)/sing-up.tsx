import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Animated, StyleSheet, Text, TextInput, View } from 'react-native';

import { PressableComponent } from '@/components/PressableComponent';
import { useAppDispatch, useAppSelector } from '@/features/hooks';
import { createUserAsync, getUsersAsync, login, selectUser, setUser } from '@/features/user/userSlice';
import { useAdaptation } from '@/hooks/useAdaptation';
import { BORDERRADIUS, COLORS, SPACING } from '@/theme/theme';

const SignUp = () => {
  const { borderColor, text, background } = useAdaptation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [username, setUsername] = useState('user');
  const [password, setPassword] = useState('12345678');
  const [email, setEmail] = useState('user1@gmail.com');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    dispatch(getUsersAsync());
  }, []);

  const handleSignUp = useCallback(async () => {
    setIsLoading(true);
    await dispatch(createUserAsync({ username, password, email }));
    dispatch(login('jwt'));
    setIsLoading(false);
    router.push('/profile');
    dispatch(setUser({ username, password, email }));
  }, []);

  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primaryVioletHex} />
      </View>
    );
  }

  if (user) {
    return null;
  }

  return (
    <Animated.View style={styles.container}>
      <TextInput
        style={[styles.input, { borderColor }]}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
        placeholderTextColor={COLORS.primaryLightGreyHex}
      />
      <TextInput
        style={[styles.input, { borderColor }]}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={[styles.input, { borderColor }]}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        placeholderTextColor={COLORS.primaryLightGreyHex}
      />
      <PressableComponent style={[styles.button, { backgroundColor: COLORS.primaryVioletHex }]} onPress={handleSignUp}>
        <Text style={[{ color: background }]}>Sign Up</Text>
      </PressableComponent>
      <Text style={{ color: text }} onPress={() => router.push('/sign-in')}>
        Sing In
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 200,
    borderWidth: 1,
    marginBottom: SPACING.space_10,
    paddingHorizontal: SPACING.space_8,
    borderRadius: BORDERRADIUS.radius_4,
  },
  button: {
    height: 40,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDERRADIUS.radius_4,
    marginBottom: SPACING.space_10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignUp;
