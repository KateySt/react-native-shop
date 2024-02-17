import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Animated, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Yup from 'yup';

import { PressableComponent } from '@/components/PressableComponent';
import { useAppDispatch, useAppSelector } from '@/features/hooks';
import { createUserAsync, getUsersAsync, login, selectUser, setUser } from '@/features/user/userSlice';
import { useAdaptation } from '@/hooks/useAdaptation';
import { BORDERRADIUS, COLORS, SPACING } from '@/theme/theme';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'Username must be at least 4 characters')
    .max(25, 'Username must be at most 25 characters')
    .required('Username is required'),
  email: Yup.string().email('Invalid email').matches(emailRegex, 'Email is not valid').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must be at most 20 characters')
    .required('Password is required'),
});
const SignUp = () => {
  const { borderColor, text, background } = useAdaptation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    dispatch(getUsersAsync());
  }, []);

  const handleSignUp = useCallback(async (values: { username: string; password: string; email: string }) => {
    setIsLoading(true);
    await dispatch(createUserAsync({ username: values.username, password: values.password, email: values.email }));
    dispatch(login('jwt'));
    setIsLoading(false);
    router.push('/profile');
    dispatch(setUser({ username: values.username, password: values.password, email: values.email }));
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
    <Formik
      initialValues={{ username: 'user', email: 'user1@gmail.com', password: '12345678' }}
      onSubmit={handleSignUp}
      validationSchema={validationSchema}>
      {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
        <Animated.View style={styles.container}>
          <TextInput
            style={[styles.input, { borderColor }]}
            placeholder="Username"
            value={values.username}
            onChangeText={handleChange('username')}
            placeholderTextColor={COLORS.primaryLightGreyHex}
          />
          {touched.username && errors.username && <Text>{errors.username}</Text>}
          <TextInput
            value={values.email}
            style={[styles.input, { borderColor }]}
            onChangeText={handleChange('email')}
            placeholder="Email"
          />
          {touched.email && errors.email && <Text>{errors.email}</Text>}
          <TextInput
            value={values.password}
            style={[styles.input, { borderColor }]}
            placeholder="Password"
            onChangeText={handleChange('password')}
            secureTextEntry
            placeholderTextColor={COLORS.primaryLightGreyHex}
          />
          {touched.password && errors.password && <Text>{errors.password}</Text>}
          <PressableComponent
            style={[styles.button, { backgroundColor: COLORS.primaryVioletHex }]}
            onPress={() => handleSubmit(values)}>
            <Text style={[{ color: background }]}>Sign Up</Text>
          </PressableComponent>
          <Text style={{ color: text }} onPress={() => router.push('/sign-in')}>
            Sing In
          </Text>
        </Animated.View>
      )}
    </Formik>
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
