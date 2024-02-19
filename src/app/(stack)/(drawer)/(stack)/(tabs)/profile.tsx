import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Redirect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';

import { PressableComponent } from '@/components/PressableComponent';
import Splash from '@/components/Splash';
import { useAppDispatch } from '@/features/hooks';
import { selectCred, selectJwt, selectUser, selectUsers, setUser, updateUserAsync } from '@/features/user/userSlice';
import { useAdaptation } from '@/hooks/useAdaptation';
import { useScreenDimensions } from '@/hooks/useScreenDimensions';
import { User } from '@/interface/User';
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '@/theme/theme';

const ProfileScreen = () => {
  const { text, icon, borderColor } = useAdaptation();
  const textStyle = { color: text, color: icon, borderColor };
  const dispatch = useAppDispatch();
  const jwt = useSelector(selectJwt);
  const users = useSelector(selectUsers);
  const cred = useSelector(selectCred);
  const user = useSelector(selectUser);
  const [isEdit, setIsEdit] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const dimensions = useScreenDimensions();

  useEffect(() => {
    if (user) {
      setEditedUser({ ...user });
      setIsLoading(false);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [user]);

  useEffect(() => {
    if (cred === null) return;
    if (users.length === 0) return;
    dispatch(
      setUser({
        ...users.find((el) => el.username === cred.username && el.password === cred.password),
        image: 'https://cameralabs.org/media/k2/items/cache/903e9b1fe43aee5c9b1041341d4bc406_L.jpg',
        banner: 'https://cameralabs.org/media/k2/items/cache/903e9b1fe43aee5c9b1041341d4bc406_L.jpg',
      }),
    );
  }, []);

  const handleUpdateUser = useCallback(
    async (updatedUser: User) => {
      if (!user) return;
      setIsLoading(true);
      await dispatch(updateUserAsync(user.id, updatedUser));
      setIsLoading(false);
    },
    [user],
  );

  const handleEditProfile = () => {
    setIsEdit(true);
  };

  const pickImage = async (isBanner: boolean) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      if (isBanner) {
        setEditedUser({ ...editedUser, banner: result.assets[0].uri });
      } else {
        setEditedUser({ ...editedUser, image: result.assets[0].uri });
      }
    }
  };

  if (jwt == null) {
    return <Redirect href="/(stack)/sign-in" />;
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Splash />
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {!isEdit && (
        <>
          <View style={styles.profileContainer}>
            {user?.banner ? (
              <Image
                source={{ uri: user?.banner }}
                style={[
                  styles.profileImage,
                  {
                    width: dimensions.width * 0.9,
                    height: 150,
                    borderRadius: BORDERRADIUS.radius_25,
                  },
                ]}
              />
            ) : (
              <View
                style={[
                  styles.placeholderImage,
                  {
                    width: dimensions.width * 0.9,
                    height: 150,
                    borderRadius: BORDERRADIUS.radius_25,
                    backgroundColor: COLORS.primaryLightGreyHex,
                  },
                ]}
              />
            )}
            {user?.image ? (
              <Image
                source={{ uri: user?.image }}
                style={[
                  styles.profileImage,
                  {
                    zIndex: 1,
                    position: 'absolute',
                    top: 90,
                  },
                ]}
              />
            ) : (
              <MaterialIcons
                name="person"
                color={COLORS.primaryLightGreyHex}
                size={100}
                style={[
                  styles.placeholderImage,
                  {
                    zIndex: 1,
                    position: 'absolute',
                    top: 90,
                  },
                ]}
              />
            )}
            <View style={styles.userInfo}>
              <Text style={[textStyle, styles.userInfoText]}>
                {user?.name?.firstname
                  ? `Name: ${user?.name?.firstname} ${user?.name?.lastname}`
                  : `Username: ${user?.username}`}
              </Text>
              <Text style={[textStyle, styles.userInfoText]}>
                {user?.phone ? `Phone: ${user?.phone}` : `Phone: +00 000 00 00 000`}
              </Text>
              <Text style={[textStyle, styles.userInfoText]}>{`Email: ${user?.email}`}</Text>
              {user?.address ? (
                <>
                  <Text style={[textStyle, styles.userInfoText]}>{`City: ${user?.address?.city}`}</Text>
                  <Text style={[textStyle, styles.userInfoText]}>{`Street: ${user?.address?.street}`}</Text>
                  <Text style={[textStyle, styles.userInfoText]}>{`Zipcode: ${user?.address?.zipcode}`}</Text>
                </>
              ) : (
                ''
              )}
            </View>
          </View>
          <PressableComponent onPress={handleEditProfile}>
            <Text style={styles.editProfileButton}>Edit Profile</Text>
          </PressableComponent>
        </>
      )}
      {isEdit && (
        <>
          <PressableComponent onPress={() => pickImage(true)}>
            <Text style={styles.uploadImageButton}>Upload Profile Banner</Text>
          </PressableComponent>
          <PressableComponent onPress={() => pickImage(false)}>
            <Text style={styles.uploadImageButton}>Upload Profile Image</Text>
          </PressableComponent>
          <TextInput
            style={[styles.input, textStyle]}
            placeholder="First Name"
            value={editedUser?.name.firstname || ''}
            onChangeText={(text) => setEditedUser({ ...editedUser, name: { ...editedUser?.name, firstname: text } })}
          />
          <TextInput
            style={[styles.input, textStyle]}
            placeholder="Last Name"
            value={editedUser?.name.lastname || ''}
            onChangeText={(text) => setEditedUser({ ...editedUser, name: { ...editedUser?.name, lastname: text } })}
          />
          <TextInput
            style={[styles.input, textStyle]}
            placeholder="Phone"
            value={editedUser?.phone || ''}
            onChangeText={(text) => setEditedUser({ ...editedUser, phone: text })}
          />
          <TextInput
            style={[styles.input, textStyle]}
            placeholder="Email"
            value={editedUser?.email || ''}
            onChangeText={(text) => setEditedUser({ ...editedUser, email: text })}
          />
          <PressableComponent
            onPress={() => {
              if (editedUser) {
                handleUpdateUser(editedUser);
                setIsEdit(false);
              }
            }}>
            <Text style={[styles.editProfileButton]}>Update Profile</Text>
          </PressableComponent>
        </>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.space_16,
    marginTop: SPACING.space_20,
    alignItems: 'center',
  },
  profileContainer: {
    marginBottom: SPACING.space_16,
    padding: SPACING.space_16,
    borderRadius: BORDERRADIUS.radius_10,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: SPACING.space_20,
  },
  editProfileButton: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryVioletHex,
    marginBottom: SPACING.space_16,
  },
  uploadImageButton: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryVioletHex,
    marginBottom: SPACING.space_16,
  },
  userInfo: {
    alignItems: 'flex-start',
  },
  userInfoText: {
    marginBottom: SPACING.space_8,
  },
  input: {
    height: 40,
    width: 200,
    borderWidth: 1,
    marginBottom: SPACING.space_18,
    paddingHorizontal: SPACING.space_8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.secondaryLightGreyHex,
    marginBottom: SPACING.space_20,
  },
});

export default ProfileScreen;
