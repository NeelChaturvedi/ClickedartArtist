/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';
import React, {useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {AdvancedCheckbox} from 'react-native-advanced-checkbox';
import Button from '../../components/button';
import {useNavigation} from '@react-navigation/native';
import {useRegistrationStore} from '../../store/registration';
import api from '../../utils/apiClient';

const Register = () => {
  const {formData, setField} = useRegistrationStore();
  const [secure, setSecure] = useState(true);
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required.';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters.';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username =
        'Username can only contain letters, numbers, and underscores.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(
        formData.password,
      )
    ) {
      newErrors.password =
        'Password must contain at least 8 characters, including one uppercase, one lowercase, one number, and one special character.';
    }
    if (!checked) {
      newErrors.terms = 'You must agree to the terms and conditions.';
    }
    return newErrors;
  };

  const checkUsernameAvailability = async username => {
    setErrors({});
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await api.post('/photographer/checkUsernameAndEmailExists', {
        username: username,
        email: formData.email,
      });
      navigation.navigate('Details');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          if (error.response.data.usernameExists) {
            setErrors({
              ...errors,
              username: 'Username already exists.',
            });
          }
          if (error.response.data.emailExists) {
            setErrors({
              ...errors,
              email: 'Email already exists.',
            });
          }
        } else {
          console.error(
            'Error checking username availability:',
            error.response,
          );
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.title}>
        <Text style={styles.heading}>Create Account</Text>
        <Text style={styles.subHeading}>
          Let's start by knowing a little bit about you
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.formField}>
          <Text style={styles.inputTitle}>USERNAME</Text>
          <TextInput
            style={styles.inputbox}
            placeholder="Enter Username"
            placeholderTextColor="#888888"
            value={formData.username}
            onChangeText={text => setField('username', text)}
          />
          {errors.username && (
            <Text style={{color: 'red', marginTop: 5}}>{errors.username}</Text>
          )}
        </View>

        <View style={styles.formField}>
          <Text style={styles.inputTitle}>EMAIL</Text>
          <TextInput
            style={styles.inputbox}
            placeholder="Enter Email"
            placeholderTextColor="#888888"
            value={formData.email}
            onChangeText={text => setField('email', text)}
            keyboardType="email-address"
          />
          {errors.email && (
            <Text style={{color: 'red', marginTop: 5}}>{errors.email}</Text>
          )}
        </View>

        <View style={styles.formField}>
          <Text style={styles.inputTitle}>PASSWORD</Text>
          <View style={styles.passwordInput}>
            <TextInput
              style={{color: 'white', flex: 1}}
              placeholder="Enter Password"
              placeholderTextColor="#888888"
              secureTextEntry={secure}
              value={formData.password}
              onChangeText={text => setField('password', text)}
            />
            <TouchableOpacity onPress={() => setSecure(!secure)}>
              <FontAwesome5
                name={secure ? 'eye-slash' : 'eye'}
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text style={{color: 'red', marginTop: 5}}>{errors.password}</Text>
          )}

          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <AdvancedCheckbox
              value={checked}
              onValueChange={value => setChecked(Boolean(value))}
              checkedColor="#007AFF"
              uncheckedColor="#ccc"
              size={20}
            />
            <Text
              style={{
                color: 'white',
                marginLeft: 10,
                fontFamily: 'Outfit-regular',
              }}>
              Agree With{' '}
              <Text
                style={{
                  color: '#ea324a',
                  textDecorationLine: 'underline',
                  fontFamily: 'Outfit-medium',
                }}>
                Terms & Conditions
              </Text>
            </Text>
          </View>
          {errors.terms && (
            <Text style={{color: 'red', marginTop: 5}}>{errors.terms}</Text>
          )}
        </View>
      </View>

      <View style={styles.formField}>
        <Button
          btnText={'Create Account'}
          onPress={() => {
            // nextStep();
            // navigation.navigate('Details');
            checkUsernameAvailability(formData.username);
          }}
        />

        <View style={styles.LoginPage}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontFamily: 'Outfit-regular',
            }}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack('Login');
            }}>
            <Text style={{fontFamily: 'Outfit-bold', color: '#ea324a'}}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;
