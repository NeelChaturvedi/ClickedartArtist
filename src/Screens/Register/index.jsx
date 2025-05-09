/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {styles} from './styles';
import React, {useEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {AdvancedCheckbox} from 'react-native-advanced-checkbox';
import Button from '../../components/button';
import {useNavigation} from '@react-navigation/native';
import {useRegistrationStore} from '../../store/registration';
import { API_URL } from '@env';

const Register = () => {
  const {formData, setField, nextStep} = useRegistrationStore();
  const [secure, setSecure] = useState(true);
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation();

  const checkUsernameAvailability = async username => {
    try {
      const response = await fetch(
        `${API_URL}/api/photographer/check-username?username=${username}`,
      );
      const data = await response.json();
      return data.available; // Assuming the API returns an object with an 'available' property
    } catch (error) {
      console.error('Error checking username availability:', error);
      return false;
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
        </View>

        <View style={styles.formField}>
          <Text style={styles.inputTitle}>PASSWORD</Text>
          <View style={styles.passwordInput}>
            <TextInput
              style={{color: '#ffffff', flex: 1}}
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
                color="#ffffff"
              />
            </TouchableOpacity>
          </View>

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
        </View>
      </View>

      <View style={styles.formField}>
        <Button
          btnText={'Create Account'}
          onPress={() => {
            if (!formData.username || !formData.email || !formData.password) {
              ToastAndroid.show(
                'Please fill all the fields',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
              );
              return;
            }
            if (!checked) {
              // alert('Please agree to the terms and conditions');
              ToastAndroid.show(
                'Please agree to the terms and conditions',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
              );
              return;
            }
            nextStep();
            navigation.navigate('Details');
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
