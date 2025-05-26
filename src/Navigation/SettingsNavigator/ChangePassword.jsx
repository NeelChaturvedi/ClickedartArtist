/* eslint-disable no-catch-shadow */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Button from '@components/button';
import api from 'src/utils/apiClient';
import {useUserStore} from 'src/store/auth';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import { useTheme } from 'src/themes/useTheme';

const ChangePassword = () => {
  const {user} = useUserStore();
  const [newPassword, setNewPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [secure, setSecure] = useState(true);
  const [secureVerify, setSecureVerify] = useState(true);

  const navigation = useNavigation();

  const theme = useTheme();
  const styles = getStyles(theme);

  const validatePassword = () => {
    const newErrors = {};
    if (!newPassword) {
      newErrors.newPassword = 'Password is required';
    }
    if (
      newPassword &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        newPassword,
      )
    ) {
      newErrors.newPassword =
        'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character';
    }

    if (newPassword !== verifyPassword) {
      newErrors.verifyPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handlePassChange = async () => {
    const newErrors = validatePassword();
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    setError({});

    try {
      setLoading(true);
      await api.post('/photographer/change-password', {
        userId: user._id,
        newPassword: newPassword,
      });
      setNewPassword('');
      setVerifyPassword('');
      ToastAndroid.show('Password changed successfully', ToastAndroid.SHORT);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <View gap={24}>
          <View gap={14}>
            <Text style={styles.title}>New Password</Text>
            <View style={styles.passwordInput}>
              <TextInput
                style={{color: 'white', flex: 1}}
                placeholder="Enter Password"
                placeholderTextColor="#888888"
                secureTextEntry={secure}
                value={newPassword}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => setNewPassword(text)}
              />
              <TouchableOpacity onPress={() => setSecure(!secure)}>
                <FontAwesome5Icon
                  name={secure ? 'eye-slash' : 'eye'}
                  size={20}
                  color={theme.text}
                />
              </TouchableOpacity>
            </View>
          </View>
          {error.newPassword && (
            <Text style={{color: 'red', marginTop: 5}}>
              {error.newPassword}
            </Text>
          )}
          <View gap={14}>
            <Text style={styles.title}>Verify Password</Text>
            <View style={styles.passwordInput}>
              <TextInput
                style={{color: theme.text, flex: 1}}
                placeholder="Re-enter Password"
                placeholderTextColor="#888888"
                secureTextEntry={secureVerify}
                value={verifyPassword}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => setVerifyPassword(text)}
              />
              <TouchableOpacity onPress={() => setSecureVerify(!secureVerify)}>
                <FontAwesome5Icon
                  name={secureVerify ? 'eye-slash' : 'eye'}
                  size={20}
                  color={theme.text}
                />
              </TouchableOpacity>
            </View>
          </View>
          {error.verifyPassword && (
            <Text style={{color: 'red', marginTop: 5}}>
              {error.verifyPassword}
            </Text>
          )}
        </View>
        <Button
          btnText={'Change Password'}
          onPress={() => handlePassChange()}
        />
      </View>
    </SafeAreaView>
  );
};

const getStyles = (theme) => StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.background,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  title: {
    color: theme.text,
    fontSize: 18,
    fontFamily: 'Outfit-medium',
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 54,
    backgroundColor: theme.card,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.border,
  },
});

export default ChangePassword;
