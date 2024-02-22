import { Redirect } from 'expo-router';
import React from 'react';

import { useAppSelector } from '@/features/hooks';
import { selectJwt } from '@/features/user/userSlice';

const Main = () => {
  const jwt = useAppSelector(selectJwt);
  if (jwt == null) {
    return <Redirect href="/(stack)/sign-in" />;
  }

  return <Redirect href="/carousel" />;
};

export default Main;
