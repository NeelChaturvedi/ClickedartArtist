import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Button from '../../../components/button';
import {useNavigation} from '@react-navigation/native';
import {useUserStore} from '../../../store/auth';
import axios from 'axios';
import {useRegistrationStore} from '../../../store/registration';
import { API_URL } from '@env';

const Login = () => {
  const {reset} = useRegistrationStore();
  const [secure, setSecure] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const {setUser} = useUserStore();

  const navigation = useNavigation();

  const handleLogin = async () => {
    if (formData.email.length < 1 || formData.password.length < 1) {
      ToastAndroid.show(
        'Please fill all the fields',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return;
    }
    try {
      const response = await axios.post(
        `${API_URL}/api/photographer/login`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = response.data;
      console.log('Data', data);
      setUser(data.photographer);
    } catch (error) {
      console.log('Error', error);
      ToastAndroid.show(
        'Invalid email or password',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.title}>
        <Text style={styles.heading}>Sign In</Text>
        <Text style={styles.subHeading}>Hi! Welcome Back</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.formField}>
          <Text style={styles.inputTitle}>EMAIL</Text>
          <TextInput
            onChangeText={text => setFormData({...formData, email: text})}
            value={formData.email}
            style={styles.inputbox}
            placeholder="Enter Email"
            placeholderTextColor="#ffffff"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.inputTitle}>PASSWORD</Text>
          <View style={styles.passwordInput}>
            <TextInput
              onChangeText={text => setFormData({...formData, password: text})}
              value={formData.password}
              style={styles.passwordTextInput}
              placeholder="Enter Password"
              placeholderTextColor="#ffffff"
              secureTextEntry={secure}
            />
            <TouchableOpacity onPress={() => setSecure(!secure)}>
              <FontAwesome5
                name={secure ? 'eye-slash' : 'eye'}
                size={20}
                color="#ffffff"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </View>
      </View>

      <View style={styles.formField}>
        <Button
          btnText={'Login'}
          onPress={() => {
            // setUser({
            //   name: 'Bhanu',
            //   email: 'Bhanu@gmail.com',
            // });
            handleLogin();
          }}
        />
        <View style={styles.createAccount}>
          <Text style={styles.createAccountText}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Register');
              reset();
            }}>
            <Text style={styles.createNowText}>Create Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
