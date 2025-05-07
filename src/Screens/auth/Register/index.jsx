/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';
import React, {useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {AdvancedCheckbox} from 'react-native-advanced-checkbox';
import Button from '../../../components/button';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const [secure, setSecure] = useState(true);
  const [checked, setChecked] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

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
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.inputTitle}>EMAIL</Text>
          <TextInput
            style={styles.inputbox}
            placeholder="Enter Email"
            placeholderTextColor="#888888"
            value={email}
            onChangeText={setEmail}
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
              value={password}
              onChangeText={setPassword}
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
        <Button btnText={'Create Account'} />

        <Pressable>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontFamily: 'Outfit-regular',
              marginTop: 10,
            }}>
            Already have an account?{' '}
            <Pressable onPress={() => navigation.goBack('Login')}>
              <Text style={{fontFamily: 'Outfit-bold', color: '#ea324a'}}>
                Sign In
              </Text>
            </Pressable>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Register;
