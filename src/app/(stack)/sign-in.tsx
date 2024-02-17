import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { PressableComponent } from '@/components/PressableComponent';
import { useAppDispatch, useAppSelector } from '@/features/hooks';
import { getUsersAsync, selectUser, setCred, setUserAsync } from '@/features/user/userSlice';
import { useAdaptation } from '@/hooks/useAdaptation';
import { BORDERRADIUS, COLORS, SPACING } from '@/theme/theme';
const SignIn = () => {
  const dispatch = useAppDispatch();
  const { borderColor, background, text } = useAdaptation();
  const user = useAppSelector(selectUser);
  const [username, setUsername] = useState<string>('johnd');
  const [password, setPassword] = useState<string>('m38rmF$');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    dispatch(getUsersAsync());
  }, []);

  const handleSignIn = useCallback(async () => {
    setIsLoading(true);
    await dispatch(setUserAsync(username, password));
    dispatch(setCred({ username, password }));
    setIsLoading(false);
    router.replace('/profile');
  }, []);

  const renderLoadingIndicator = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={COLORS.primaryVioletHex} />
    </View>
  );

  const renderSignInForm = () => (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { borderColor }]}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={[styles.input, { borderColor }]}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <PressableComponent style={[styles.button, { backgroundColor: COLORS.primaryVioletHex }]} onPress={handleSignIn}>
        <Text style={[{ color: background }]}>Sign In</Text>
      </PressableComponent>
      <Text style={{ color: text }} onPress={() => router.push('/sing-up')}>
        Sing Up
      </Text>
    </View>
  );

  if (isLoading) {
    return renderLoadingIndicator();
  }

  if (user) {
    router.replace('/profile');
    return null;
  }

  return renderSignInForm();
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

export default SignIn;
