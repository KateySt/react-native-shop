import { Redirect, useRouter } from 'expo-router';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Yup from 'yup';

import { PressableComponent } from '@/components/PressableComponent';
import Splash from '@/components/Splash';
import { useAppDispatch, useAppSelector } from '@/features/hooks';
import { getUsersAsync, selectUser, setCred, setUserAsync } from '@/features/user/userSlice';
import { useAdaptation } from '@/hooks/useAdaptation';
import { BORDERRADIUS, COLORS, SPACING } from '@/theme/theme';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});
const SignIn = () => {
  const dispatch = useAppDispatch();
  const { borderColor, background, text } = useAdaptation();
  const user = useAppSelector(selectUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    dispatch(getUsersAsync());
  }, []);

  const handleSignIn = async (values: { username: string; password: string }) => {
    setIsLoading(true);
    await dispatch(setUserAsync(values.username, values.password));
    dispatch(setCred(values));
    setIsLoading(false);
    router.replace('/profile');
  };

  const renderLoadingIndicator = () => (
    <View style={styles.loadingContainer}>
      <Splash />
    </View>
  );

  const renderSignInForm = () => (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: 'johnd', password: 'm38rmF$' }}
        onSubmit={handleSignIn}
        validationSchema={validationSchema}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              value={values.username}
              onChangeText={handleChange('username')}
              style={[styles.input, { borderColor }]}
              placeholder="Username"
            />
            {touched.username && errors.username && <Text>{errors.username}</Text>}
            <TextInput
              value={values.password}
              onChangeText={handleChange('password')}
              style={[styles.input, { borderColor }]}
              placeholder="Password"
              secureTextEntry
            />
            {touched.password && errors.password && <Text>{errors.password}</Text>}
            <Pressable style={styles.button} onPress={() => handleSubmit(values)}>
              <Text style={[{ color: background }]}>Sign In</Text>
            </Pressable>
          </>
        )}
      </Formik>
      <Text style={{ color: text }} onPress={() => router.push('/sign-up')}>
        Sing Up
      </Text>
    </View>
  );

  if (isLoading) {
    return renderLoadingIndicator();
  }

  if (user) {
    return <Redirect href="/profile" />;
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
    backgroundColor: COLORS.primaryVioletHex,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignIn;
